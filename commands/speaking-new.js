/*------------------
   /speaking-new
------------------*/

const cmdSpeakingNew = (app, at, errHandler) => {
  app.command('/speaking-new', async ({ command, ack, say }) => {
    // Acknowledge command request
    await ack();

    try {
      await say(`Open new speaking event`);
      console.log(command);
    }
    catch (err) {
      errHandler(app, command, err);
    }
  });
};

module.exports = cmdSpeakingNew;