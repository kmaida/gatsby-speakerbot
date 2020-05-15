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
        "text": "Placeholder text for single-line input"
      }
    },
    "label": {
      "type": "plain_text",
      "text": "Event Name"
    },
    "hint": {
      "type": "plain_text",
      "text": "What is the event called?"
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
        "text": "Placeholder text for multi-line input"
      }
    },
    "label": {
      "type": "plain_text",
      "text": "Notes"
    },
    "hint": {
      "type": "plain_text",
      "text": "Any additional information about this event."
    }
  }
];

module.exports = blocksListEvent;