/*------------------
 DM CONFIRM REPORT
------------------*/

module.exports = async (app, bc, data, body, errHandler) => {
  // Confirm form submission by sending DM to user
  try {
    const confirmDM = await app.client.chat.postMessage({
      token: bc.botToken,
      channel: bc.userID,
      text: `:confetti_ball: *Thank you for sharing your "${data.event_name}" post-event report!*\nFolks may follow up with you if we should get more deeply involved in this event, reach out to community members you networked with, promote your involvement and content from the event, process product feedback, etc.`
    });
  }
  catch (err) {
    errHandler(body, err);
  }
}
