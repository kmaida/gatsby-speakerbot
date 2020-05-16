module.exports = (aid) => {
  return {
    "type": "section",
    "block_id": "event_type",
    "text": {
      "type": "mrkdwn",
      "text": "*Event Type:*"
    },
    "accessory": {
      "action_id": aid,
      "type": "static_select",
      "placeholder": {
        "type": "plain_text",
        "text": "Select..."
      },
      "options": [
        {
          "text": {
            "type": "plain_text",
            "text": "Conference"
          },
          "value": "conference"
        },
        {
          "text": {
            "type": "plain_text",
            "text": "Workshop"
          },
          "value": "workshop"
        },
        {
          "text": {
            "type": "plain_text",
            "text": "Meetup"
          },
          "value": "meetup"
        },
        {
          "text": {
            "type": "plain_text",
            "text": "Podcast"
          },
          "value": "podcast"
        },
        {
          "text": {
            "type": "plain_text",
            "text": "Livestream / Webinar"
          },
          "value": "livestream-webinar"
        },
        {
          "text": {
            "type": "plain_text",
            "text": "Other"
          },
          "value": "other"
        }
      ]
    }
  }
};
