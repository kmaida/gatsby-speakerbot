/*------------------
  FORM: EVENT DATE
------------------*/

module.exports = (aid, placeholder) => {
  return {
    "type": "input",
    "block_id": "event_date",
    "element": {
      "type": "datepicker",
      "action_id": aid,
      "placeholder": {
        "type": "plain_text",
        "text": placeholder
      }
    },
    "label": {
      "type": "plain_text",
      "text": "Event Date:"
    }
  }
};
