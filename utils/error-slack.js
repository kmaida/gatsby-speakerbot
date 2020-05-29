/*------------------
OUTPUT ERROR IN SLACK
------------------*/

module.exports = async (app, channel, err) => {
  console.error('An error occurred:', err);
  try {
    const sendErr = await app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      channel: channel,
      text: ":disappointed: I'm sorry, I couldn't do that because an error occurred: ```" + JSON.stringify(err) + "```"
    });
  }
  catch (err) {
    console.error(err);
  }
};
