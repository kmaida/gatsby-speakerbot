/*------------------
     FORM: NOTES
------------------*/

module.exports = (aid) => {
  return {
    "type": "input",
    "block_id": "notes",
    "element": {
      "type": "plain_text_input",
      "action_id": aid,
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
  };
};