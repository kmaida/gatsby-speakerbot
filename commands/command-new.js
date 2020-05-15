const blocksListEvent = require('./../bot-response/blocks-list-event');

/*------------------
   /speaking-new
------------------*/

const cmdSpeakingNew = (app, at, errHandler) => {
  app.command('/speaking-new', async ({ ack, body, context, say }) => {
    // Acknowledge command request
    await ack();

    try {
      // await say(`Open new speaking event`);
      console.log(body, context);
      const result = await app.client.views.open({
        token: context.botToken,
        trigger_id: body.trigger_id,
        view: {
          type: 'modal',
          callback_id: 'list_event',
          title: {
            type: 'plain_text',
            text: 'List Your Speaking Event'
          },
          blocks: blocksListEvent,
          submit: {
            type: 'plain_text',
            text: 'Save Event'
          }
        }
      });
    }
    catch (err) {
      errHandler(app, body, err);
    }
  });
};

module.exports = cmdSpeakingNew;