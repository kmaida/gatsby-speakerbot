/*------------------
  /speaking-report
------------------*/

const cmdSpeakingReport = (app, at, errHandler) => {
  app.command('/speaking-report', async ({ command, ack, say }) => {
    // Acknowledge command request
    await ack();

    try {
      await say(`Open speaking report`);
      console.log(command);
    }
    catch (err) {
      errHandler(app, command, err);
    }
  });
};

module.exports = cmdSpeakingReport;