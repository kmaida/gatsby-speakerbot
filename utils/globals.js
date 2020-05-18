/*------------------
      GLOBALS
------------------*/

const globals = {
  selectedChannel: process.env.SLACK_CHANNEL_ID,
  setChannel(channelID) {
    this.selectedChannel = channelID;
  }
};

module.exports = globals;