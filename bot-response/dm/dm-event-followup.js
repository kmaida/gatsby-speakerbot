const errHandler = require('./../../utils/error');
const btnEventReport = require('./../ix-components/btn-event-report');

/*------------------
 DM EVENT FOLLOWUP
------------------*/

module.exports = async (app, recordObj) => {
  // Notify user they should fill out the post-event form
  try {
    const confirmDM = await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: recordObj.submitterID,
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `:card_file_box: Hello! According to my records, you recently spoke at *${recordObj.event_name} (${recordObj.event_date})*.\n:postbox: Please *complete an Event Report*. This information is incredibly valuable to Gatsby — thank you for your contributions! :tada:`
          },
          "block_id": "dm_followup_report",
          "accessory": btnEventReport(recordObj)
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "mrkdwn",
              "text": ":information_desk_person: I've prefilled the form with information I already know. Please make sure it's correct and then fill in the remaining fields."
            }
          ]
        }
      ]
    });
  }
  catch (err) {
    errHandler(app, recordObj, err);
  }
}
