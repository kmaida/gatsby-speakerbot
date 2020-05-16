const eventName = require('./form-components/event-name');
const eventDate = require('./form-components/event-date');
const eventType = require('./form-components/event-type');
const eventUrl = require('./form-components/event-url');

/*------------------
BLOCKS: EVENT REPORT
------------------*/

const blocksReport = [
  eventName('r_event_name'),
  eventDate('r_event_date'),
  eventUrl('r_url'),
  eventType('r_event_type'),
  {
    "type": "input",
    "block_id": "topic",
    "element": {
      "type": "plain_text_input",
      "action_id": "r_topic",
      "placeholder": {
        "type": "plain_text",
        "text": "What did you talk about?"
      }
    },
    "label": {
      "type": "plain_text",
      "text": "Topic:"
    }
  },
  {
    "type": "input",
    "block_id": "reach",
    "element": {
      "type": "plain_text_input",
      "action_id": "r_reach",
      "placeholder": {
        "type": "plain_text",
        "text": "# of people"
      }
    },
    "label": {
      "type": "plain_text",
      "text": "Estimated Reach:"
    },
    "hint": {
      "type": "plain_text",
      "text": "Roughly how many people have you reached so far by participating? We understand this number may change over time."
    }
  },
  {
    "type": "input",
    "block_id": "content_links",
    "element": {
      "type": "plain_text_input",
      "action_id": "r_content_links",
      "multiline": true,
      "placeholder": {
        "type": "plain_text",
        "text": "https://..., https://..."
      }
    },
    "label": {
      "type": "plain_text",
      "text": "Link(s) to Published Content:"
    },
    "hint": {
      "type": "plain_text",
      "text": "Links to video recordings, podcast broadcasts, promotional tweets, etc."
    },
    "optional": true
  },
  {
    "type": "section",
    "block_id": "rating",
    "text": {
      "type": "mrkdwn",
      "text": "*Event Rating:*"
    },
    "accessory": {
      "action_id": "r_rating",
      "type": "static_select",
      "placeholder": {
        "type": "plain_text",
        "text": "Rating..."
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
            "text": ":neutral_face: Meh"
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
    }
  },
  {
    "type": "input",
    "block_id": "event_report",
    "element": {
      "type": "plain_text_input",
      "action_id": "r_report",
      "multiline": true,
      "placeholder": {
        "type": "plain_text",
        "text": "Let us know anything interesting about this event and how it went."
      }
    },
    "label": {
      "type": "plain_text",
      "text": "Notes:"
    },
    "hint": {
      "type": "plain_text",
      "text": "Made connections? Received great product feedback? Had interesting conversations? Learned anything new that should be shared with Gatsby teammates?"
    }
  }
];

module.exports = blocksReport;