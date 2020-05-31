/*------------------
BUTTON: EDIT REPORT
with initial values
------------------*/

const btnEditReport = (eventObj) => {
  return {
    "type": "button",
    "text": {
      "type": "plain_text",
      "text": "Edit Event Report"
    },
    "action_id": "btn_edit_report",
    "style": "primary",
    "value": JSON.stringify(eventObj)
  };
}

module.exports = btnEditReport;
