/*------------------
 BLOCKS: APP HOME
------------------*/

const blocksHome = (userID, botID, globals) => {
  return [
    {
      "type": "section",
      "block_id": "select_channel",
      "text": {
        "type": "mrkdwn",
        "text": `*Select the channel* <@${botID}> should post to when event listings and event reports are submitted:`
      },
      "accessory": {
        "action_id": "a_select_channel",
        "type": "channels_select",
        "initial_channel": globals.selectedChannel,
        "placeholder": {
          "type": "plain_text",
          "text": "Select a channel"
        },
        "confirm": {
          "title": {
            "type": "plain_text",
            "text": "Confirm Channel Selection"
          },
          "text": {
            "type": "mrkdwn",
            "text": `Are you sure you want to update the channel that <@${botID}> reports in?`
          },
          "confirm": {
            "type": "plain_text",
            "text": "Yes"
          },
          "deny": {
            "type": "plain_text",
            "text": "Nevermind"
          }
        }
      }
    }
  ];
};

module.exports = blocksHome;