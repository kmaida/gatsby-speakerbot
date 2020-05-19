const store = require('../data/settings-db');

/*------------------
PUBLISH SLACK REPORT
------------------*/

const publishSlackReport = async (app, token, data, savedObj) => {
  // Post event to designated channel
  const settings = await store.getSettings();
  const channel = settings.channel;
  try {
    const publishSlackReport = await app.client.chat.postMessage({
      token: token,
      channel: channel,
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `:microphone: *Post-Event Report Added* :newspaper:`
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `*From:* <@${data.submitterID}>\n*Event Name:* ${data.event_name}\n*Event URL:* <${data.url}>\n*Event Date:* ${data.event_date}\n*Speaker(s):* ${data.speakers}\n*Type of Event:* ${data.event_type}\n*Talk Topic:* ${data.topic}\n*Estimated Reach:* ${data.reach}\n*Content Links:* ${data.content_links}\n*Event Rating:* ${data.rating}/4\n*Report:* ${data.report}`
          }
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "mrkdwn",
              "text": `:link: <${savedObj.link}|View in Airtable>`
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

module.exports = publishSlackReport;
