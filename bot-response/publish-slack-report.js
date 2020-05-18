const settings = require('./../data/db');

/*------------------
PUBLISH SLACK REPORT
------------------*/

// @TODO: add airtable link
const publishSlackReport = async (app, token, data) => {
  // Post event to designated channel
  const publishChannel = await settings.getChannel();
  console.log(publishChannel);
  try {
    const publishSlackReport = await app.client.chat.postMessage({
      token: token,
      channel: publishChannel,
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
        }
      ]
    });
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = publishSlackReport;