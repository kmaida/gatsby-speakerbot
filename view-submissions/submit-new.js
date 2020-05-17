/*------------------
 SUBMIT LIST EVENT
------------------*/

const submitNew = (app, at, errHandler) => {
  // Capture data from modal interactions
  const data = {};

  /*----
    Modal view submitted
  ----*/
  app.view('list_event', async ({ ack, body, view, context }) => {
    await ack();

    const bc = {
      userID: body.user.id,
      userMention: `<@${body.user.id}>`,
      botToken: context.botToken
    };
    const payload = view.state.values;
    data.submitterID = bc.userID;
    data.event_name = payload.event_name.a_event_name.value;
    data.event_date = payload.event_date.a_event_date.selected_date;
    data.event_type = payload.event_type.a_event_type.selected_option.value;
    data.notes = payload.notes.a_notes.value || '';
    data.location = payload.location.a_location.value || '';
    data.url = payload.url.a_url.value;
    data.speakers = payload.speakers.a_speakers.value;
    data.topic = payload.topic.a_topic.value;

    // @TODO: save data to Airtable
    console.log(data);

    try {
      // Confirm form submission by sending DM to user
      const confirmDM = await app.client.chat.postMessage({
        token: bc.botToken,
        channel: bc.userID,
        text: `Thank you for telling me about your event! Details for *${data.event_name}* have been saved. Someone on the DevRel team will follow up soon to provide you with any support you might need (rehearsal, resources, professional speaker coaching, help getting swag or equipment, etc.).`
      });

      // @TODO: post event details with Airtable link in a Slack channel for DevRel team
    }
    catch (err) {
      errHandler(app, body, err);
    }
  });
};

module.exports = submitNew;