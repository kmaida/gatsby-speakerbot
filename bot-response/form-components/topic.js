/*------------------
    FORM: TOPIC
------------------*/

module.exports = (aid) => {
  return  {
    "type": "input",
    "block_id": "topic",
    "element": {
      "type": "plain_text_input",
      "action_id": aid,
      "placeholder": {
        "type": "plain_text",
        "text": "What are you speaking about?"
      }
    },
    "label": {
      "type": "plain_text",
      "text": "Topic:"
    }
  };
}