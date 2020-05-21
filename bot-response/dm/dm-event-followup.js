const errHandler = require('./../../utils/error');

/*------------------
 DM EVENT FOLLOWUP
------------------*/

module.exports = async (app, recordObj) => {
  // Notify user they should fill out the post-event form
  // @TODO: show a button that lets the user trigger the command
  try {
    const confirmDM = await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: recordObj.submitterID,
      text: `:card_file_box: Hello! *According to my records, you recently completed the following speaking engagement: ${recordObj.event_name} (${recordObj.event_type}) on ${recordObj.event_date}*. :tada: Congratulations!\n:postbox: Please *submit a post-event report* telling us how it went by typing \`/speaking-report\` and filling out the form.\nThis information is incredibly valuable to Gatsby — thank you for your contributions!`
    });
  }
  catch (err) {
    errHandler(app, recordObj, err);
  }
}
