const blocksEventReport = require('../bot-response/blocks-event-report');

/*------------------
  /speaking-report
------------------*/

const cmdSpeakingReport = (app, at, errHandler) => {
  app.command('/speaking-report', async ({ ack, body, context, say }) => {
    // Acknowledge command request
    await ack();

    try {
      await say(`Open speaking report`);
      console.log(body, context);
      const result = await app.client.views.open({
        token: context.botToken,
        trigger_id: body.trigger_id,
        view: {
          type: 'modal',
          callback_id: 'event_report',
          title: {
            type: 'plain_text',
            text: 'Event Report'
          },
          blocks: blocksEventReport,
          submit: {
            type: 'plain_text',
            text: 'Save Report'
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