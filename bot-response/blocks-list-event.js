const moment = require('moment');

/*------------------
 BLOCKS: LIST EVENT
------------------*/

const blocksListEvent = [
  {
    "type": "input",
    "block_id": "event_name",
    "element": {
      "type": "plain_text_input",
      "action_id": "a_event_name",
      "placeholder": {
        "type": "plain_text",
        "text": "What is the event called?"
      }
    },
    "label": {
      "type": "plain_text",
      "text": "Event Name:"
    }
  },
  {
    "type": "section",
    "block_id": "event_date",
    "text": {
      "type": "mrkdwn",
      "text": "*Event Date:*"
    },
    "accessory": {
      "type": "datepicker",
      "action_id": "a_event_date",
      "initial_date": moment().format('YYYY-MM-DD'),
    }
  },
  {
    "type": "input",
    "block_id": "location",
    "element": {
      "type": "plain_text_input",
      "action_id": "a_location",
      "placeholder": {
        "type": "plain_text",
        "text": "Where is the event taking place?"
      }
    },
    "label": {
      "type": "plain_text",
      "text": "Event Location:"
    },
    "hint": {
      "type": "plain_text",
      "text": "You may leave location blank if the event is online / remote."
    },
    "optional": true
  },
  {
    "type": "input",
    "block_id": "url",
    "element": {
      "type": "plain_text_input",
      "action_id": "a_url",
      "placeholder": {
        "type": "plain_text",
        "text": "https://..."
      }
    },
    "label": {
      "type": "plain_text",
      "text": "Event URL:"
    }
  },
  {
    "type": "input",
    "block_id": "speakers",
    "element": {
      "type": "plain_text_input",
      "action_id": "a_speakers",
      "placeholder": {
        "type": "plain_text",
        "text": "Who is speaking at this event?"
      }
    },
    "label": {
      "type": "plain_text",
      "text": "Speaker(s):"
    },
    "hint": {
      "type": "plain_text",
      "text": "If more than one person is speaking, please list all speakers."
    }
  },
  {
    "type": "section",
    "block_id": "event_type",
    "text": {
      "type": "mrkdwn",
      "text": "*Event Type:*"
    },
    "accessory": {
      "action_id": "a_event_type",
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
  },
  {
    "type": "input",
    "block_id": "topic",
    "element": {
      "type": "plain_text_input",
      "action_id": "a_topic",
      "placeholder": {
        "type": "plain_text",
        "text": "What are you speaking about?"
      }
    },
    "label": {
      "type": "plain_text",
      "text": "Topic:"
    }
  },
  {
    "type": "input",
    "block_id": "notes",
    "element": {
      "type": "plain_text_input",
      "action_id": "a_notes",
      "multiline": true,
      "placeholder": {
        "type": "plain_text",
        "text": "Any additional information you'd like to share about this event."
      }
    },
    "label": {
      "type": "plain_text",
      "text": "Notes:"
    },
    "optional": true
  }
];

module.exports = blocksListEvent;