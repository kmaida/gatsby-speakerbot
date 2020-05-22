const blocksEventReport = require('../bot-response/blocks-event-report');

/*------------------
 Event Report from Home
 Command & Shortcut
------------------*/

const triggerHomeReport = (app, homeParams, errHandler) => {
  const openReportModal = async ({ ack, body, context }) => {
    // console.log('btn_event_report_home');
    await ack();
    // If prefill info is available, set it
    const prefill = body.actions ? JSON.parse(body.actions[0].value) : {};
    // Open post event report form
    try {
      const result = await app.client.views.open({
        token: context.botToken,
        trigger_id: body.trigger_id,
        view: {
          type: 'modal',
          callback_id: 'event_report',
          title: {
            type: 'plain_text',
            text: 'Post Event Report'
          },
          blocks: blocksEventReport(prefill),
          private_metadata: JSON.stringify(homeParams),
          submit: {
            type: 'plain_text',
            text: 'Submit Report'
          }
        }
      });
    }
    catch (err) {
      errHandler(app, body, err);
    }
  };
  // Button click
  app.action('btn_event_report_home', openReportModal);
};

module.exports = triggerHomeReport;
