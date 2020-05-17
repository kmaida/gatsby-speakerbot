/*------------------
  FORM: EVENT TYPE
------------------*/

module.exports = (aid) => {
  return {
    "type": "input",
    "block_id": "event_type",
    "element": {
      "action_id": aid,
      "type": "static_select",
      "placeholder": {
        "type": "plain_text",
        "text": "Choose event type"
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
    },
    "label": {
      "type": "plain_text",
      "text": "Type of Event:"
    }
  };
};
