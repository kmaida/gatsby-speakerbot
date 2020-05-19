const blocksEventReport = require('../bot-response/blocks-event-report');

/*------------------
  /speaking-report
------------------*/

const cmdSpeakingReport = (app, at, errHandler) => {
  app.command('/speaking-report', async ({ ack, body, context }) => {
    // Acknowledge command request
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
          blocks: blocksEventReport,
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
  });
};

module.exports = cmdSpeakingReport;