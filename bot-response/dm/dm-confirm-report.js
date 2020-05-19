/*------------------
 DM CONFIRM REPORT
------------------*/

module.exports = async (app, bc, data, body, errHandler) => {
  // Confirm form submission by sending DM to user
  try {
    const confirmDM = await app.client.chat.postMessage({
      token: bc.botToken,
      channel: bc.userID,
      text: `:tada: *Thank you for sharing your post-event report!*\nYour data about *${data.event_name}* has been saved.\nSomeone on the DevRel team may follow up if we should get more deeply involved in this event, reach out to community members you networked with, create resources, process product feedback, etc.`
    });
  }
  catch (err) {
    errHandler(app, body, err);
  }
}