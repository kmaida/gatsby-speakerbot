/*------------------
 BLOCKS: APP HOME
------------------*/

const blocksHome = (userID, botID, channel) => {
  return [
    {
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "*Reporting Channel:*"
			}
		},
    {
      "type": "section",
      "block_id": "select_channel",
      "text": {
        "type": "mrkdwn",
        "text": `Select a channel <@${botID}> should post to when event listings and event reports are submitted:`
      },
      "accessory": {
        "action_id": "a_select_channel",
        "type": "channels_select",
        "initial_channel": channel,
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
            "text": `Are you sure you want to update the channel that <@${botID}> reports in? (Make sure you have added <@${botID}> to the new channel!)`
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
    },
    {
      "type": "context",
      "elements": [
        {
          "type": "mrkdwn",
          "text": `*Important:* <@${botID}> must be added to the channel you select.`
        }
      ]
    },
    {
			"type": "divider"
		}
  ];
};

module.exports = blocksHome;