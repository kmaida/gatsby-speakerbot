const blocksEventReport = require('../bot-response/blocks-event-report');

/*------------------
 Event Report
 Command & Shortcut
------------------*/

const triggerSpeakingReport = (app, errHandler, prefill = {}) => {
  const openReportModal = async ({ ack, body, context }) => {
    await ack();
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
};

module.exports = triggerSpeakingReport;
