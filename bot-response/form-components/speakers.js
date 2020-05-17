/*------------------
   FORM: SPEAKERS
------------------*/

module.exports = (aid) => {
  return {
    "type": "input",
    "block_id": "speakers",
    "element": {
      "type": "plain_text_input",
      "action_id": aid,
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
  };
}