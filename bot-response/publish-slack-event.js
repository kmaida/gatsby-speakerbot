/*------------------
PUBLISH SLACK EVENT
------------------*/

// @TODO: add airtable link
const publishSlackEvent = async (app, token, utils, data) => {
  // Post event to designated channel
  try {
    const publishSlackEvent = await app.client.chat.postMessage({
      token: token,
      channel: process.env.SLACK_CHANNEL_ID,
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `:microphone: *New Event Added* :sparkles:`
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `*From:* <@${data.submitterID}>\n*Event Name:* ${data.event_name}\n*Event URL:* <${data.url}>\n*Event Location:* ${data.location}\n*Event Date:* ${data.event_date}\n*Type of Event:* ${utils.capFirstLetter(data.event_type)}\n*Speakers:* ${data.speakers}\n*Talk Topic:* ${data.topic}\n*Notes:* ${data.notes}`
          }
        }
      ]
    });
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = publishSlackEvent;