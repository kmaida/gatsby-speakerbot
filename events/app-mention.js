/*------------------
    APP MENTION
------------------*/

const appMention = (app, errHandler) => {
  app.event('app_mention', async ({ event, context }) => {
    // Event and context data
    const ec = {
      text: event.text,                           // raw text from the mention
      sentByUserID: event.user,                   // ID of user who sent the message
      channelID: event.channel,                   // channel ID
      botToken: context.botToken,                 // bot access token
      botUserID: context.botUserID                // bot user ID for mentions
    }
    try {
     const result = await app.client.chat.postMessage({
        token: ec.botToken,
        channel: ec.channelID,
        text: `:thinking_face: I'm sorry, I don't understand. Go to my *<slack://app?team=${process.env.SLACK_TEAM_ID}&id=${process.env.SLACK_APP_ID}&tab=home|App Home tab>* to find out how I work!`
      });
    }
    catch (err) {
      errHandler(app, null, err);
    }
  });
};

module.exports = appMention;
