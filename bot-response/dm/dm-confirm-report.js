const slackErr = require('./../../utils/error-slack');

/*------------------
 DM CONFIRM REPORT
------------------*/

module.exports = async (app, bc, data, edit) => {
  // Confirm form submission by sending DM to user
  try {
    const confirmDM = await app.client.chat.postMessage({
      token: bc.botToken,
      channel: bc.userID,
      text: `${edit ? ':writing_hand:' : ':confetti_ball:'} *Thank you for ${edit ? 'updating' : 'sharing'} your "${data.event_name}" post-event report!*\nTeammates may follow up with you if we should get more deeply involved in this event, reach out to community members you networked with, promote your involvement and content from the event, process product feedback, etc.`
    });
  }
  catch (err) {
    slackErr(app, bc.userID, err);
  }
}
