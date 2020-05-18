/*------------------
 FORM: EVENT RATING
------------------*/

module.exports = (aid) => {
  return {
    "type": "input",
    "block_id": "rating",
    "element": {
      "action_id": aid,
      "type": "static_select",
      "placeholder": {
        "type": "plain_text",
        "text": "How was this event?"
      },
      "options": [
        {
          "text": {
            "type": "plain_text",
            "text": ":star-struck: Great!"
          },
          "value": "4"
        },
        {
          "text": {
            "type": "plain_text",
            "text": ":simple_smile: Good"
          },
          "value": "3"
        },
        {
          "text": {
            "type": "plain_text",
            "text": ":neutral_face: Okay"
          },
          "value": "2"
        },
        {
          "text": {
            "type": "plain_text",
            "text": ":disappointed: Poor"
          },
          "value": "1"
        }
      ]
    },
    "label": {
      "type": "plain_text",
      "text": "Your Rating:"
    },
    "hint": {
      "type": "plain_text",
      "text": "What did you think of the event's overall quality? This helps us determine which events to watch out for and potentially invest in in the future."
    }
  };
};