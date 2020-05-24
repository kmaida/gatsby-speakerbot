const errSlack = require('./../utils/error-slack');

/*------------------
    APP MENTION
------------------*/

const appMention = (app) => {
  app.event('app_mention', async ({ event, context }) => {
    try {
     const result = await app.client.chat.postMessage({
        token: context.botToken,
        channel: event.channel,
        text: `:thinking_face: I'm sorry, I don't understand. Go to my *<slack://app?team=${process.env.SLACK_TEAM_ID}&id=${process.env.SLACK_APP_ID}&tab=home|App Home tab>* to find out how I work!`
      });
    }
    catch (err) {
      errSlack(app, event.channel, err);
    }
  });
};

module.exports = appMention;
