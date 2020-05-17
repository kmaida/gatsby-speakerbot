/*------------------
  FORM: EVENT DATE
------------------*/

module.exports = (aid) => {
  return {
    "type": "input",
    "block_id": "event_date",
    "element": {
      "type": "datepicker",
      "action_id": aid,
      "placeholder": {
        "type": "plain_text",
        "text": "Select a date",
        "emoji": true
      }
    },
    "label": {
      "type": "plain_text",
      "text": "Event Date:"
    }
  }
};
