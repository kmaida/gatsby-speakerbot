/*------------------
BUTTON: EVENT REPORT
with initial values
------------------*/

const btnEventReport = (recordObj, homeParams) => {
  const aid = !!homeParams ? "btn_event_report_home" : "btn_event_report";
  if (homeParams) {
    recordObj.homeParams = homeParams;
  }
  return {
    "type": "button",
    "text": {
      "type": "plain_text",
      "text": "Submit Event Report"
    },
    "action_id": aid,
    "style": "primary",
    "value": JSON.stringify(recordObj)
  };
}

module.exports = btnEventReport;
