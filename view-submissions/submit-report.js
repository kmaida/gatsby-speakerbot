/*------------------
   SUBMIT REPORT
------------------*/

const submitReport = (app, at, errHandler) => {
  // Capture data from modal interactions
  const data = {};

  /*----
    Modal view submitted
  ----*/
  app.view('event_report', async ({ ack, body, view, context }) => {
    await ack();

    // console.log('body:', body, 'context:', context);
    const bc = {
      userID: body.user.id,
      userMention: `<@${body.user.id}>`,
      botToken: context.botToken
    };
    const payload = view.state.values;
    data.submitterID = bc.userID;
    data.event_name = payload.event_name.r_event_name.value;
    data.event_date = payload.event_date.r_event_date.selected_date;
    data.event_type = payload.event_type.r_event_type.selected_option.value;
    data.url = payload.url.r_url.value;
    data.topic = payload.topic.r_topic.value;
    data.reach = payload.reach.r_reach.value;
    data.content_links = payload.content_links.r_content_links.value || '';
    data.rating = payload.rating.r_rating.selected_option.value;
    data.report = payload.event_report.r_report.value;
    
    // @TODO: save data to Airtable
    console.log(data);

    try {
      // Confirm form submission by sending DM to user
      const confirmDM = await app.client.chat.postMessage({
        token: bc.botToken,
        channel: bc.userID,
        text: `Thank you for sharing your post-event report! Your *${data.event_name}* report has been saved. Someone on the DevRel team may follow up if we should get more deeply involved in this event, avoid it in the future, create resources or product feedback, etc.`
      });

      // @TODO: post event report details with Airtable link in a Slack channel for DevRel team
    }
    catch (err) {
      errHandler(app, body, err);
    }
  });
};

module.exports = submitReport;