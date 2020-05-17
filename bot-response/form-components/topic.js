/*------------------
    FORM: TOPIC
------------------*/

module.exports = (aid, placeholder) => {
  return  {
    "type": "input",
    "block_id": "topic",
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
      "text": "Topic:"
    }
  };
}