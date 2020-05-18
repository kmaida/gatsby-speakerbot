/*------------------
   FORM: SPEAKERS
------------------*/

module.exports = (aid, placeholder) => {
  return {
    "type": "input",
    "block_id": "speakers",
    "element": {
      "type": "plain_text_input",
      "action_id": aid,
      "placeholder": {
        "type": "plain_text",
        "text": placeholder
      }
    },
    "label": {
      "type": "plain_text",
      "text": "Speaker(s):"
    },
    "hint": {
      "type": "plain_text",
      "text": "If more than one speaker, please list all names."
    }
  };
}