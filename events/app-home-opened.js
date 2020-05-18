const store = require('./../data/db');
const homeBlocks = require('./../bot-response/blocks-home');

/*------------------
  APP HOME OPENED
------------------*/

const appHomeOpened = (app, at) => {
  app.event('app_home_opened', async ({ event, context }) => {
    const userID = event.user;
    const botID = context.botUserId;
    const settings = await store.getSettings();
    const channel = settings.channel;

    try {
      const showHomeView = await app.client.views.publish({
        token: context.botToken,
        user_id: userID,
        view: {
          "type": "home",
          "blocks": homeBlocks(userID, botID, channel)
        }
      });
    }
    catch (err) {
      console.error(err);
    }
  });

  // Channel selected
  app.action('a_select_channel', async ({ action, ack }) => {
    await ack();
    store.setChannel(action.selected_channel);
  });
}

module.exports = appHomeOpened;