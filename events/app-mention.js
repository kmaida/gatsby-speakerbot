/*------------------
    APP MENTION
------------------*/

const appMention = (app, utils, errHandler) => {
  app.event('app_mention', async ({ event, context }) => {
    // Event and context data
    const ec = {
      text: event.text,                           // raw text from the mention
      sentByUserID: event.user,                   // ID of user who sent the message
      channelID: event.channel,                   // channel ID
      botToken: context.botToken,                 // bot access token
      botUserID: context.botUserID                // bot user ID for mentions
    }
    console.log(event, context);

    try {
      if (utils.isMentionCmd('help', ec.text)) {
        const result = await app.client.chat.postMessage({
          token: ec.botToken,
          channel: ec.channelID,
          text: 'You asked me for help!'
        });
      } else {
        const result = await app.client.chat.postMessage({
          token: ec.botToken,
          channel: ec.channelID,
          text: ":disappointed: I'm sorry, I don't understand. Try `@speakerbot help` to see what I can do for you!"
        });
      }
    }
    catch (err) {
      errHandler(app, null, err);
    }
  });
};

module.exports = appMention;