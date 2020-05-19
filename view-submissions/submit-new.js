const publishSlackEvent = require('./../bot-response/publish-slack-event');

/*------------------
 SUBMIT LIST EVENT
------------------*/

const submitNew = (app, at, utils, errHandler) => {
  // Modal view submitted
  app.view('list_event', async ({ ack, body, view, context }) => {
    const bc = {
      userID: body.user.id,
      userMention: `<@${body.user.id}>`,
      botToken: context.botToken,
      botID: context.botUserId
    };
    const payload = view.state.values;
    // Capture data from modal interactions
    const data = {
      submitterID: bc.userID,
      event_name: payload.event_name.a_event_name.value,
      event_date: payload.event_date.a_event_date.selected_date,
      event_type: payload.event_type.a_event_type.selected_option.value,
      notes: payload.notes.a_notes.value || '',
      location: payload.location.a_location.value || '(Remote)',
      url: payload.url.a_url.value,
      speakers: payload.speakers.a_speakers.value,
      topic: payload.topic.a_topic.value
    };

    // Validate form fields and handle errors
    // https://api.slack.com/surfaces/modals/using#displaying_errors#displaying_errors
    let ackParams = { 
      response_action: 'errors',
      errors: {}
    };
    if (!utils.dateFuture(data.event_date)) {
      ackParams.errors.event_date = 'This event is in the past. Please use /speaking-report to submit a post-event report instead.';
    }
    if (!utils.validUrl(data.url.toString())) {
      ackParams.errors.url = 'Please provide a valid URL.';
    }
    if (utils.objNotEmpty(ackParams.errors)) {
      await ack(ackParams);
      return;
    }
    await ack();

    // Save data to Airtable and output results in Slack channel
    try {
      at.listNewEvent(app, bc, data, body, errHandler);
    }
    catch (err) {
      errHandler(app, bc.botID, data, err);
    }
  });
};

module.exports = submitNew;