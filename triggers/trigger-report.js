const blocksEventReport = require('../bot-response/blocks-event-report');

/*------------------
 Event Report
 Command & Shortcut
------------------*/

const triggerSpeakingReport = (app, errHandler) => {
  const openReportModal = async ({ ack, body, context }) => {
    console.log('open report modal');
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
  // Command /speaking-report
  app.command('/speaking-report', openReportModal);
  // Global shortcut Submit event report
  app.shortcut('event_report', openReportModal);
  // Button click
  app.action('btn_event_report', openReportModal);
};

module.exports = triggerSpeakingReport;
