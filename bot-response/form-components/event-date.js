const moment = require('moment');

module.exports = (aid) => {
  return {
    "type": "section",
    "block_id": "event_date",
    "text": {
      "type": "mrkdwn",
      "text": "*Event Date:*"
    },
    "accessory": {
      "type": "datepicker",
      "action_id": aid,
      "initial_date": moment().format('YYYY-MM-DD'),
    }
  }
};
