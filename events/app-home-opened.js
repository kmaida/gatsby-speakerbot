const store = require('../data/settings-db');
const userHomeStore = require('./../data/userHome-db');
const homeBlocks = require('../bot-response/blocks-home/blocks-home');
const errSlack = require('./../utils/error-slack');
// Imports shared between actions
const triggerHomeViewUpdate = require('./../triggers/trigger-home-view-update');
const blocksEventReport = require('./../bot-response/blocks-event-report');
// Actions
const actionSelectChannel = require('./../triggers/action-select-channel');
const actionSelectAdmins = require('./../triggers/action-select-admins');
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
    ACTIONS
  ----*/
  actionSelectChannel(app, store, userHomeStore, at, triggerHomeViewUpdate, errSlack);
  actionSelectAdmins(app, store, userHomeStore, at, triggerHomeViewUpdate, errSlack);
  actionAddReport(app, store, blocksEventReport, errSlack);
  actionEditReport(app, store, blocksEventReport, errSlack);
  actionEditEvent(app, store, errSlack);
}

module.exports = appHomeOpened;
