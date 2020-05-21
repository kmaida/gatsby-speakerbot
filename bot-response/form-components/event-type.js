/*------------------
  FORM: EVENT TYPE
------------------*/

module.exports = (aid, initial) => {
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
      "initial_option": initial,
      "options": [
        {
          "text": {
            "type": "plain_text",
            "text": "Conference"
          },
          "value": "Conference"
        },
        {
          "text": {
            "type": "plain_text",
            "text": "Workshop"
          },
          "value": "Workshop"
        },
        {
          "text": {
            "type": "plain_text",
            "text": "Meetup"
          },
          "value": "Meetup"
        },
        {
          "text": {
            "type": "plain_text",
            "text": "Podcast"
          },
          "value": "Podcast"
        },
        {
          "text": {
            "type": "plain_text",
            "text": "Livestream"
          },
          "value": "Livestream"
        },
        {
          "text": {
            "type": "plain_text",
            "text": "Webinar"
          },
          "value": "Webinar"
        },
        {
          "text": {
            "type": "plain_text",
            "text": "Work event"
          },
          "value": "Work event"
        },
        {
          "text": {
            "type": "plain_text",
            "text": "Other"
          },
          "value": "Other"
        }
      ]
    },
    "label": {
      "type": "plain_text",
      "text": "Type of Event:"
    }
  };
};
