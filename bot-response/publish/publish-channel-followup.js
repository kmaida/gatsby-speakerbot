const errHandler = require('./../../utils/error');
const store = require('./../../data/settings-db');

/*------------------
 NOTIFY OF FOLLOWUP
------------------*/

module.exports = async (app, recordObj) => {
  const settings = await store.getSettings();
  const channel = settings.channel;
  // Notify user they should fill out the post-event form
  try {
    const channelMsgFollowup = await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: channel,
      text: `:tada: \`<@${recordObj.submitterID}>\` recently spoke at *${recordObj.event_name}* on ${recordObj.event_date}. :speech_balloon: I've just sent them a reminder to fill out their post-event report.`
    });
  }
  catch (err) {
    errHandler(recordObj, err);
  }
}
