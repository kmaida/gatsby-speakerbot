const publishSlackReport = require('./../bot-response/publish-slack-report');

/*------------------
   SUBMIT REPORT
------------------*/

const submitReport = (app, at, utils, errHandler) => {
  // Modal view submitted
  app.view('event_report', async ({ ack, body, view, context }) => {
    const bc = {
      userID: body.user.id,
      userMention: `<@${body.user.id}>`,
      botToken: context.botToken
    };
    const payload = view.state.values;
    console.log(payload);
    const data = {
      submitterID: bc.userID,
      event_name: payload.event_name.r_event_name.value,
      speakers: payload.speakers.r_speakers.value,
      event_date: payload.event_date.r_event_date.selected_date,
      event_type: payload.event_type.r_event_type.selected_option.value,
      url: payload.url.r_url.value,
      topic: payload.topic.r_topic.value,
      reach: payload.reach.r_reach.value * 1,
      content_links: payload.content_links.r_content_links.value || '',
      rating: payload.rating.r_rating.selected_option.value,
      report: payload.event_report.r_report.value
    };
    // Validate form fields and handle errors
    // https://api.slack.com/surfaces/modals/using#displaying_errors#displaying_errors
    let ackParams = { 
      response_action: 'errors',
      errors: {}
    };
    if (!utils.datePast(data.event_date)) {
      ackParams.errors.event_date = 'This event is in the future. Please use /speaking-new to list an upcoming event.';
    }
    if (!utils.validUrl(data.url.toString())) {
      ackParams.errors.url = 'Please provide a valid URL.';
    }
    if (!utils.isNumberFormat(payload.reach.r_reach.value)) {
      ackParams.errors.reach = 'Must be a number for metrics reasons. If you need to add more context, please use the "Report" field below.'
    }
    if (utils.objNotEmpty(ackParams.errors)) {
      await ack(ackParams);
      return;
    }
    await ack();

    // Save data to Airtable and output results in Slack channel
    try {
      at.submitEventReport(app, bc.botToken, data);
    }
    catch (err) {
      errHandler(app, bc.botID, data, err);
    }

    // Confirm form submission by sending DM to user
    try {
      const confirmDM = await app.client.chat.postMessage({
        token: bc.botToken,
        channel: bc.userID,
        text: `Thank you for sharing your post-event report! Your *${data.event_name}* report has been saved. Someone on the DevRel team may follow up if we should get more deeply involved in this event, avoid it in the future, create resources or product feedback, etc.`
      });
    }
    catch (err) {
      errHandler(app, body, err);
    }

    // Post event report with Airtable link in a Slack channel for DevRel team
    publishSlackReport(app, bc.botToken, data);
  });
};

module.exports = submitReport;