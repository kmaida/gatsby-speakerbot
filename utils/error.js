/*------------------
   ERROR HANDLER
------------------*/

module.exports = async (app, data, err) => {
  console.error(err);
  console.error('Error with:', data);
  // @TODO: if not in channel, DM the user to tell them to add speakerbot to the channel
  // if (err.data.error === 'not_in_channel') {
  //   const joinChannel = await app.client.conversations.join({
  //     token: command.token,
  //     channel: command.channel_id
  //   });
  //   const reportJoin = await app.client.chat.postMessage({
  //     token: command.token,
  //     channel: command.channel_id,
  //     text: "I couldn't complete that request because I wasn't in the channel yet, but here I am! Please try again."
  //   })
  // } else {
  //   const errResult = await app.client.chat.postMessage({
  //     token: command.token,
  //     channel: command.channel_id,
  //     text: ":cry: I'm sorry, I couldn't do that because an error occurred:\n```" + err + "```"
  //   });
  // }
};
