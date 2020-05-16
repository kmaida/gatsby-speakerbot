module.exports = (aid) => {
  return {
    "type": "input",
    "block_id": "url",
    "element": {
      "type": "plain_text_input",
      "action_id": aid,
      "placeholder": {
        "type": "plain_text",
        "text": "https://..."
      }
    },
    "label": {
      "type": "plain_text",
      "text": "Event URL:"
    }
  }
};
