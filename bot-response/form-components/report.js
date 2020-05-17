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
      "text": "Made connections? Received product feedback? Had interesting conversations? Learned anything new that should be shared with Gatsby teammates?"
    }
  }
};