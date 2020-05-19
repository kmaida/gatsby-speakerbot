const blocksListEvent = require('../bot-response/blocks-list-event');

/*------------------
 List Event
 Command & Shortcut
------------------*/

const triggerSpeakingNew = (app, errHandler) => {
  const openModal = async ({ ack, body, context }) => {
    await ack();
    try {
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
  };
  // Command /speaking-new
  app.command('/speaking-new', openModal);
  // Global shortcut List a speaking event
  app.shortcut('list_event', openModal);
};

module.exports = triggerSpeakingNew;
