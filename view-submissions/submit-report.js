/*------------------
   SUBMIT REPORT
------------------*/

const submitReport = (app, at, errHandler) => {
  // Capture data from modal interactions
  const data = {};

  /*----
    Event date selected in modal
  ----*/
  app.action('r_event_date', async ({ action, ack }) => {
    await ack();
    data.event_date = action.selected_date;
  });

  /*----
    Event type selected in modal
  ----*/
  app.action('r_event_type', async ({ action, ack }) => {
    await ack();
    data.event_type = action.selected_option.value;
  });

  /*----
    Rating selected in modal
  ----*/
  app.action('r_rating', async ({ action, ack }) => {
    await ack();
    data.rating = action.selected_option.value;
  });

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
    data.url = payload.url.r_url.value;
    data.topic = payload.topic.r_topic.value;
    data.reach = payload.reach.r_reach.value;
    data.content_links = payload.content_links.r_content_links.value;
    data.report = payload.event_report.r_report.value;

    if (!data.event_type) {
      data.event_type = '';
    }
    if (!data.event_date) {
      data.event_date = '';
    }
    if (!data.rating) {
      data.rating = '';
    }
    if (!data.content_links) {
      data.content_links = '';
    }
    
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