const globals = require('./../utils/globals');
const homeBlocks = require('./../bot-response/blocks-home');

/*------------------
  APP HOME OPENED
------------------*/

const appHomeOpened = (app, at) => {
  app.event('app_home_opened', async ({ event, context }) => {
    const userID = event.user;
    const botID = context.botUserId;
    console.log(event, context);

    try {
      const showHomeView = await app.client.views.publish({
        token: context.botToken,
        user_id: userID,
        view: {
          "type": "home",
          "blocks": homeBlocks(userID, botID, globals)
        }
      });
    }
    catch (err) {
      console.error(err);
    }
  });

  app.action('a_select_channel', async ({ action, ack }) => {
    await ack();
    globals.setChannel(action.selected_channel);
  });
}

module.exports = appHomeOpened;