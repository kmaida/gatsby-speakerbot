const triggerHomeViewUpdate = require('./../triggers/trigger-home-view-update');
const errSlack = require('./../utils/error-slack');

/*------------------
   SUBMIT REPORT
------------------*/

const submitReport = (app, at, utils) => {
  // Modal view submitted
  app.view('event_report', async ({ ack, body, view, context }) => {
    const bc = {
      userID: body.user.id,
      userMention: `<@${body.user.id}>`,
      botToken: context.botToken
    };
    const payload = view.state.values;
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
      ackParams.errors.event_date = 'This event is in the future. Please use "/speaking-new" to list an upcoming event.';
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
      const saveToAirtable = await at.submitEventReport(app, bc, data);
    }
    catch (err) {
      errSlack(app, bc.userID, err);
    }
    // Update the home view
    if (view.private_metadata) {
      const homeParams = JSON.parse(view.private_metadata);
      try {
        const updateHome = await triggerHomeViewUpdate(app, homeParams, at);
      }
      catch (err) {
        errSlack(app, bc.userID, err);
      }
    }
  });
};

module.exports = submitReport;
