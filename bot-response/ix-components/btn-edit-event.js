/*------------------
BUTTON: EDIT EVENT
with initial values
------------------*/

const btnEditEvent = (eventObj) => {
  return {
    "type": "button",
    "text": {
      "type": "plain_text",
      "text": "Edit Event Listing"
    },
    "action_id": "btn_edit_event",
    "style": "primary",
    "value": JSON.stringify(eventObj)
  };
}

module.exports = btnEditEvent;
