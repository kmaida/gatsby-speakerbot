/*------------------
FORM: EVENT LOCATION
------------------*/

module.exports = (aid) => {
  return {
    "type": "input",
    "block_id": "location",
    "element": {
      "type": "plain_text_input",
      "action_id": aid,
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
  };
};