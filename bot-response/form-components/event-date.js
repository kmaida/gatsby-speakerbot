const moment = require('moment');

module.exports = () => {
  return {
    "type": "input",
    "block_id": "event_date",
    "element": {
      "type": "datepicker",
      "action_id": "a_event_date",
      // "initial_date": moment().format('YYYY-MM-DD'),
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
