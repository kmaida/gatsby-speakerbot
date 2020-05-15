/*------------------
 SUBMIT LIST EVENT
------------------*/

const submitNew = (app, at, errHandler) => {
  // Capture data from modal interactions
  const data = {};

  /*----
    Event date selected in modal
  ----*/
  app.action('a_event_date', async ({ action, context, ack, say }) => {
    await ack();
    data.event_date = action.selected_date;
  });

  /*----
    Event type selected in modal
  ----*/
  app.action('a_event_type', async ({ action, context, ack, say }) => {
    await ack();
    data.event_type = action.selected_option.value;
  });

  /*----
    Modal view submitted
  ----*/
  app.view('list_event', async ({ ack, body, view, context }) => {
    await ack();

    console.log('body:', body, 'context:', context);
    const bc = {
      userID: body.user.id,
      userMention: `<@${body.user.id}>`,
      botToken: context.botToken
    };
    const payload = view.state.values;
    data.event_name = payload.event_name.a_event_name.value;
    data.notes = payload.notes.a_notes.value;
    data.location = payload.location.a_location.value;
    data.url = payload.url.a_url.value;
    data.speakers = payload.speakers.a_speakers.value;
    data.topic = payload.topic.a_topic.value;

    // @TODO: save data to Airtable
    console.log(data);

    // Confirm form submission by sending DM to user
    try {
      const confirmDM = await app.client.chat.postMessage({
        token: bc.botToken,
        channel: bc.userID,
        text: `Thanks for submitting ${data.event_name}.`
      });
    }
    catch (err) {
      errHandler(app, body, err);
    }
  });
};

module.exports = submitNew;