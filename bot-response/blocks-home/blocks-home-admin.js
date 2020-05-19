/*------------------
BLOCKS: APP HOME ADMIN
------------------*/

const blocksHomeAdmin = (homeParams) => {
  return [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": ":female-construction-worker: *Admin:*"
      }
    },
    {
      "type": "section",
      "block_id": "select_channel",
      "text": {
        "type": "mrkdwn",
        "text": `*Select the channel* <@${homeParams.botID}> should post to when event listings and event reports are submitted:`
      },
      "accessory": {
        "action_id": "a_select_channel",
        "type": "channels_select",
        "initial_channel": homeParams.channel,
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
            "text": `Are you sure you want to update the channel that <@${homeParams.botID}> reports in? (Make sure you have added <@${homeParams.botID}> to the new channel!)`
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
          "text": `*Important:* <@${homeParams.botID}> must be added to the channel you select.`
        }
      ]
    },
    {
      "type": "section",
      "block_id": "select_admins",
      "text": {
        "type": "mrkdwn",
        "text": `*Select users with admin privileges* to control <@${homeParams.botID}>:`
      },
      "accessory": {
        "action_id": "a_select_admins",
        "type": "multi_users_select",
        "placeholder": {
          "type": "plain_text",
          "text": "Select Admin Users"
        },
        "initial_users": homeParams.admins
      }
    },
    {
      "type": "context",
      "elements": [
        {
          "type": "mrkdwn",
          "text": `Admins can change the channel that <@${homeParams.botID}> reports in and add other admins.`
        }
      ]
    },
    {
      "type": "divider"
    }
  ];
};

module.exports = blocksHomeAdmin;
