const store = require('../data/settings-db');
const homeBlocks = require('../bot-response/blocks-home/blocks-home');

/*------------------
  APP HOME OPENED
------------------*/

const appHomeOpened = async (app, at) => {
  const homeParams = {};
  
  app.event('app_home_opened', async ({ event, context }) => {
    homeParams.userID = event.user;
    homeParams.botID = context.botUserId;
    homeParams.botToken = context.botToken;
    const settings = await store.getSettings();
    homeParams.channel = settings.channel;
    homeParams.admins = settings.admins;

    try {
      const showHomeView = await app.client.views.publish({
        token: homeParams.botToken,
        user_id: homeParams.userID,
        view: {
          "type": "home",
          "blocks": await homeBlocks(homeParams, at)
        }
      });
      homeParams.viewID = showHomeView.view.id;
    }
    catch (err) {
      console.error(err);
    }
  });

  // Update the app home view (when data in it has changed)
  const triggerHomeViewUpdate = async () => {
    try {
      const updateHomeView = await app.client.views.update({
        token: homeParams.botToken,
        user_id: homeParams.userID,
        view_id: homeParams.viewID,
        view: {
          "type": "home",
          "blocks": await homeBlocks(homeParams, at)
        }
      });
    }
    catch (err) {
      console.error(err);
    }
  }

  // Reporting channel selected
  app.action('a_select_channel', async ({ action, ack }) => {
    await ack();
    // Set the new channel
    const newChannel = action.selected_channel;
    store.setChannel(newChannel);
    homeParams.channel = newChannel;
    // Update the reporting channel in the home view for current user
    triggerHomeViewUpdate();
  });

  // Admin users selected
  app.action('a_select_admins', async ({ action, ack }) => {
    await ack();
    // Set the new admins
    const newAdmins = action.selected_users;
    store.setAdmins(newAdmins);
    homeParams.admins = newAdmins;
  });
}

module.exports = appHomeOpened;
