/*------------------
FORM: CONTENT LINKS
------------------*/

module.exports = (aid) => {
  return {
    "type": "input",
    "block_id": "content_links",
    "element": {
      "type": "plain_text_input",
      "action_id": aid,
      "multiline": true,
      "placeholder": {
        "type": "plain_text",
        "text": "https://...\nhttps://..."
      }
    },
    "label": {
      "type": "plain_text",
      "text": "Link(s) to Published Content:"
    },
    "hint": {
      "type": "plain_text",
      "text": "Links to slides, video recordings, podcast broadcasts, promotional tweets, etc."
    },
    "optional": true
  }
};