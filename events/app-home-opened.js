const store = require('../data/settings-db');
const userHomeStore = require('./../data/userHome-db');
const homeBlocks = require('../bot-response/blocks-home/blocks-home');
const errSlack = require('./../utils/error-slack');
const triggerHomeViewUpdate = require('./../triggers/trigger-home-view-update');
const blocksEventReport = require('./../bot-response/blocks-event-report');
const blocksListEvent = require('./../bot-response/blocks-list-event');

/*------------------
  APP HOME OPENED
------------------*/

const appHomeOpened = async (app, at) => {
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

  // Reporting channel selected
  app.action('a_select_channel', async ({ action, ack, context, body }) => {
    await ack();
    // Set the new channel
    const newChannel = action.selected_channel;
    const settings = await store.setChannel(newChannel);
    // Get user's local home params
    const userHome = await userHomeStore.getUserHome(body.user.id);
    const localHomeParams = {
      userID: body.user.id,
      viewID: userHome.viewID,
      botID: context.botUserId,
      channel: newChannel,
      admins: settings.admins
    };
    // Update the reporting channel in the home view for current user
    try {
      // @TODO: update all user's home views?
      const updateHome = await triggerHomeViewUpdate(app, localHomeParams, at);
    }
    catch (err) {
      errSlack(app, localHomeParams.userID, err);
    }
  });

  // Admin users selected
  app.action('a_select_admins', async ({ action, ack }) => {
    await ack();
    // Set the new admins
    const newAdmins = action.selected_users;
    store.setAdmins(newAdmins);
    // @TODO: update all user's home views?
  });

  // Open an event report form
  app.action('btn_event_report_home', async ({ ack, body, context }) => {
    await ack();
    // If prefill info is available, set it
    const prefill = body.actions ? JSON.parse(body.actions[0].value) : {};
    console.log('context', context, 'body', body);
    homeParams.submitReportID = prefill ? prefill.id : undefined;
    // userHomeStore.setSubmitReport()
    // Open post event report form
    try {
      const result = await app.client.views.open({
        token: context.botToken,
        trigger_id: body.trigger_id,
        view: {
          type: 'modal',
          callback_id: 'event_report',
          title: {
            type: 'plain_text',
            text: 'Post Event Report'
          },
          blocks: blocksEventReport(prefill),
          private_metadata: JSON.stringify(homeParams),
          submit: {
            type: 'plain_text',
            text: 'Submit Report'
          }
        }
      });
      delete homeParams.submitReportID;
    }
    catch (err) {
      errSlack(app, homeParams.userID, err);
    }
  });

  // Open an edit event report form
  app.action('btn_edit_report', async ({ ack, body, context }) => {
    await ack();
    // If prefill info is available, set it
    const prefill = body.actions ? JSON.parse(body.actions[0].value) : {};
    homeParams.editReportID = prefill ? prefill.id : undefined;
    homeParams.editReport = true;
    // Open post event report form
    try {
      const result = await app.client.views.open({
        token: context.botToken,
        trigger_id: body.trigger_id,
        view: {
          type: 'modal',
          callback_id: 'event_report',
          title: {
            type: 'plain_text',
            text: 'Edit Post Event Report'
          },
          blocks: blocksEventReport(prefill),
          private_metadata: JSON.stringify(homeParams),
          submit: {
            type: 'plain_text',
            text: 'Update Report'
          }
        }
      });
      delete homeParams.editReportID;
      delete homeParams.editReport;
    }
    catch (err) {
      errSlack(app, homeParams.userID, err);
    }
  });

  // Open an event form with prefilled data to edit
  app.action('btn_edit_event', async ({ ack, body, context }) => {
    await ack();
    // If prefill info is available, set it
    const prefill = body.actions ? JSON.parse(body.actions[0].value) : {};
    homeParams.editEventID = prefill ? prefill.id : undefined;
    // Open post event report form
    try {
      const result = await app.client.views.open({
        token: context.botToken,
        trigger_id: body.trigger_id,
        view: {
          type: 'modal',
          callback_id: 'list_event',
          title: {
            type: 'plain_text',
            text: 'Edit Event Listing'
          },
          blocks: blocksListEvent(prefill),
          private_metadata: JSON.stringify(homeParams),
          submit: {
            type: 'plain_text',
            text: 'Update Event'
          }
        }
      });
      delete homeParams.editEventID;
    }
    catch (err) {
      errSlack(app, homeParams.userID, err);
    }
  });
}

module.exports = appHomeOpened;
