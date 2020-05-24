/*------------------
    FORM: REACH
------------------*/

module.exports = (aid) => {
  return {
    "type": "input",
    "block_id": "reach",
    "element": {
      "type": "plain_text_input",
      "action_id": aid,
      "placeholder": {
        "type": "plain_text",
        "text": "# of people"
      }
    },
    "label": {
      "type": "plain_text",
      "text": "Estimated Reach:"
    },
    "hint": {
      "type": "plain_text",
      "text": "Roughly how many people have you reached so far by participating? (We understand this number may change over time.)"
    }
  }
};