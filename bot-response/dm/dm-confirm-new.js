/*------------------
   DM CONFIRM NEW
------------------*/

module.exports = async (app, bc, data, body, errHandler) => {
  // Confirm form submission by sending DM to user
  try {
    const confirmDM = await app.client.chat.postMessage({
      token: bc.botToken,
      channel: bc.userID,
      text: `:tada: *Thank you for telling me about your event!*\nInformation on *${data.event_name}* has been saved.\nSomeone on the DevRel team will follow up soon to provide you with any support you might need (rehearsal, resources, professional speaker coaching, assistance getting swag or equipment, etc.).`
    });
  }
  catch (err) {
    errHandler(app, bc.botID, body, err);
  }
}