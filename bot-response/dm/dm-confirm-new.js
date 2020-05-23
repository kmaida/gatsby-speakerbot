/*------------------
   DM CONFIRM NEW
------------------*/

module.exports = async (app, bc, data, body, errHandler) => {
  // Confirm form submission by sending DM to user
  try {
    const confirmDM = await app.client.chat.postMessage({
      token: bc.botToken,
      channel: bc.userID,
      text: `:tada: *Thank you for telling me about your upcoming event: "${data.event_name}."*\nFolks may be following up soon to provide you with any support you might need (rehearsal, <https://app.getguru.com/board-groups/5cXK4zgc/-Events|resources>, <https://app.getguru.com/card/iLp66e4T/-Request-Public-Speaker-Training|professional speaker coaching>, <https://app.getguru.com/card/ia4kGgLT/-Community-Messaging-2020|messaging>, assistance getting swag or equipment, promotion of your event, etc.).`
    });
  }
  catch (err) {
    errHandler(body, err);
  }
}
