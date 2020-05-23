const store = require('../data/settings-db');
const homeBlocks = require('../bot-response/blocks-home/blocks-home');
const errHandler = require('./../utils/error');
const triggerHomeViewUpdate = require('./../triggers/trigger-home-view-update');
const blocksEventReport = require('./../bot-response/blocks-event-report');

/*------------------
  APP HOME OPENED
------------------*/

const appHomeOpened = async (app, at) => {
  const homeParams = {};
  
  app.event('app_home_opened', async ({ event, context }) => {
    homeParams.userID = event.user;
    homeParams.botID = context.botUserId;
    const settings = await store.getSettings();
    homeParams.channel = settings.channel;
    homeParams.admins = settings.admins;

    try {
      const showHomeView = await app.client.views.publish({
        token: context.botToken,
        user_id: homeParams.userID,
        view: {
          "type": "home",
          "blocks": await homeBlocks(homeParams, at)
        }
      });
      homeParams.viewID = showHomeView.view.id;
    }
    catch (err) {
      errHandler(event, err);
    }
  });

  // Reporting channel selected
  app.action('a_select_channel', async ({ action, ack }) => {
    await ack();
    // Set the new channel
    const newChannel = action.selected_channel;
    store.setChannel(newChannel);
    homeParams.channel = newChannel;
    // Update the reporting channel in the home view for current user
    try {
      const updateHome = await triggerHomeViewUpdate(app, homeParams, at, errHandler);
    }
    catch (err) {
      errHandler(homeParams, err);
    }
  });

  // Admin users selected
  app.action('a_select_admins', async ({ action, ack }) => {
    await ack();
    // Set the new admins
    const newAdmins = action.selected_users;
    store.setAdmins(newAdmins);
    homeParams.admins = newAdmins;
  });

  // Open an event report form
  // @TODO: this could technically be abstracted trigger-report.js try/catch block
  app.action('btn_event_report_home', async ({ ack, body, context }) => {
    await ack();
    // If prefill info is available, set it
    const prefill = body.actions ? JSON.parse(body.actions[0].value) : {};
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
    }
    catch (err) {
      errHandler(body, err);
    }
  });
}

module.exports = appHomeOpened;
