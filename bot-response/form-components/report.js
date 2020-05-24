/*------------------
    FORM: REPORT
------------------*/

module.exports = (aid) => {
  return {
    "type": "input",
    "block_id": "event_report",
    "element": {
      "type": "plain_text_input",
      "action_id": aid,
      "multiline": true,
      "placeholder": {
        "type": "plain_text",
        "text": "Let us know how the event went and any interesting takeaways."
      }
    },
    "label": {
      "type": "plain_text",
      "text": "Report:"
    },
    "hint": {
      "type": "plain_text",
      "text": "Did you make connections? Receive product feedback? Have interesting conversations? Learn anything new that should be shared with Gatsby teammates?"
    }
  }
};