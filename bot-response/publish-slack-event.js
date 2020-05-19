const store = require('./../data/db');

/*------------------
PUBLISH SLACK EVENT
------------------*/

// @TODO: add airtable link
const publishSlackEvent = async (app, token, data, at) => {
  // Post event to designated channel
  const settings = await store.getSettings();
  const channel = settings.channel;
  try {
    const publishSlackEvent = await app.client.chat.postMessage({
      token: token,
      channel: channel,
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
            "text": `*From:* <@${data.submitterID}>\n*Event Name:* ${data.event_name}\n*Event URL:* <${data.url}>\n*Event Location:* ${data.location}\n*Event Date:* ${data.event_date}\n*Type of Event:* ${data.event_type}\n*Speaker(s):* ${data.speakers}\n*Talk Topic:* ${data.topic}\n*Notes:* ${data.notes}`
          }
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "mrkdwn",
              "text": `:link: <${at.link}|Go to Speakers Airtable>`
            }
          ]
        }
      ]
    });
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = publishSlackEvent;