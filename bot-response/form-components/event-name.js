module.exports = (aid) => {
  return {
    "type": "input",
    "block_id": "event_name",
    "element": {
      "type": "plain_text_input",
      "action_id": aid,
      "placeholder": {
        "type": "plain_text",
        "text": "CoolConf 2020"
      }
    },
    "label": {
      "type": "plain_text",
      "text": "Event Name:"
    }
  }
};
