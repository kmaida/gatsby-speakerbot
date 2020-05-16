const eventName = require('./form-components/event-name');
const eventDate = require('./form-components/event-date');
const eventType = require('./form-components/event-type');
const eventUrl = require('./form-components/event-url');

/*------------------
 BLOCKS: LIST EVENT
------------------*/

const blocksListEvent = [
  eventName,
  eventDate('a_event_date'),
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
  eventUrl,
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
  eventType('a_event_type'),
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