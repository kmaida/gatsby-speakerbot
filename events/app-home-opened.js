const store = require('../data/settings-db');
const userHomeStore = require('./../data/userHome-db');
const homeBlocks = require('../bot-response/blocks-home/blocks-home');
const errSlack = require('./../utils/error-slack');
const triggerHomeViewUpdate = require('./../triggers/trigger-home-view-update');
const blocksEventReport = require('./../bot-response/blocks-event-report');

const actionAddReport = require('./../triggers/action-report-home');
const actionEditEvent = require('./../triggers/action-edit-event');
const actionEditReport = require('./../triggers/action-edit-report');

/*------------------
  APP HOME OPENED
------------------*/

const appHomeOpened = async (app, at) => {
  /*----
    EVENT: app-home-opened
  ----*/
  app.event('app_home_opened', async ({ event, context }) => {
    const settings = await store.getSettings();
    const localHomeParams = {
      userID: event.user,
      botID: context.botUserId,
      channel: settings.channel,
      admins: settings.admins
    };
    const composedView = await homeBlocks(localHomeParams, at);
    let userHome;

    // Publish this user's home view
    try {
      const showHomeView = await app.client.views.publish({
        token: context.botToken,
        user_id: localHomeParams.userID,
        view: {
          "type": "home",
          "blocks": composedView
        }
      });
      // Set this user's home view ID in database
      userHome = await userHomeStore.setUserHomeView(localHomeParams.userID, showHomeView.view.id);
    }
    catch (err) {
      errSlack(app, localHomeParams.userID, err);
    }
  });

  /*----
    ACTION: Reporting channel selected
  ----*/
  app.action('a_select_channel', async ({ action, ack, context, body }) => {
    await ack();
    // Set the new channel
    const newChannel = action.selected_channel;
    const settings = await store.setChannel(newChannel);
    const localHomeParams = {
      userID: body.user.id,
      viewID: body.view.id,
      botID: context.botUserId,
      channel: newChannel,
      admins: settings.admins
    };
    // Update the reporting channel in the home view for all users
    try {
      const allUserHomes = await userHomeStore.getUserHomes();
      allUserHomes.forEach(async (userHome) => {
        const userHomeParams = {
          userID: userHome.userID,
          viewID: userHome.viewID,
          botID: localHomeParams.botUserId,
          channel: newChannel,
          admins: settings.admins
        };
        await triggerHomeViewUpdate(app, userHomeParams, at);
      });
    }
    catch (err) {
      errSlack(app, localHomeParams.userID, err);
    }
  });

  /*----
    ACTION: Admin users selected
  ----*/
  app.action('a_select_admins', async ({ action, ack, context }) => {
    await ack();
    // Set the new admins
    const newAdmins = action.selected_users;
    const settings = await store.setAdmins(newAdmins);
    // Update the admins in the home view for all users
    try {
      const allUserHomes = await userHomeStore.getUserHomes();
      allUserHomes.forEach(async (userHome) => {
        const userHomeParams = {
          userID: userHome.userID,
          viewID: userHome.viewID,
          botID: context.botUserId,
          channel: settings.channel,
          admins: newAdmins
        };
        await triggerHomeViewUpdate(app, userHomeParams, at);
      });
    }
    catch (err) {
      errSlack(app, localHomeParams.userID, err);
    }
  });

  actionAddReport(app, store, blocksEventReport, errSlack);
  actionEditReport(app, store, blocksEventReport, errSlack);
  actionEditEvent(app, store, errSlack);
}

module.exports = appHomeOpened;
