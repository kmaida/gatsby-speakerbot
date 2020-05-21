/*------------------
BUTTON: EVENT REPORT
with initial values
------------------*/

const btnEventReport = (recordObj) => {
  return {
    "type": "button",
    "text": {
      "type": "plain_text",
      "text": "Submit Event Report"
    },
    "action_id": "btn_event_report",
    "style": "primary",
    "value": JSON.stringify(recordObj)
  };
}

module.exports = btnEventReport;
