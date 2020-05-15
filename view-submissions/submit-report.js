/*------------------
   SUBMIT REPORT
------------------*/

const submitReport = (app, at, errHandler) => {
  app.view('event_report', async ({ ack, body, view, context }) => {
    await ack();

    console.log('body:', body, 'context:', context);
    const bc = {
      userID: body.user.id,
      userMention: `<@${body.user.id}>`,
      botToken: context.botToken
    };
    const payload = view.state.values;
    const data = {
      event_name: payload.event_name.a_event_name.value,
      notes: payload.notes.a_notes.value
    };
    console.log(data);
    // @TODO: save data to Airtable

    // Confirm submission by sending DM to user
    try {
      const confirmDM = await app.client.chat.postMessage({
        token: bc.botToken,
        channel: bc.userID,
        text: `Thanks for sharing your event report on *${data.event_name}*.`
      });
    }
    catch (err) {
      errHandler(app, body, err);
    }
  });
};

module.exports = submitReport;