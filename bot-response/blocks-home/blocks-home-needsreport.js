const btnEventReport = require('./../../bot-response/ix-components/btn-event-report');

/*------------------
BLOCKS: APP HOME REPORT
------------------*/

const blocksHomeNeedsReport = (recordObjArr, homeParams) => {
  if (recordObjArr.length) {
    const aboutReportsBlocks = [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": ":spiral_calendar_pad: *Submit Your Event Reports:*"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "According to my records, you've _completed the following speaking engagements, but have not filled out event reports yet_.\n\nI can help with that. Just click the button next to any event listed here, and I'll help you fill out your report."
        }
      }
    ];
    const eventsListBlocks = [];
    recordObjArr.forEach((recordObj) => {
      const thisEventBlock = {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `:microphone: *${recordObj.event_name}*: ${recordObj.event_type} (${recordObj.event_date})`
        },
        "accessory": btnEventReport(recordObj, homeParams)
      };
      eventsListBlocks.push(thisEventBlock);
    });
    const footerBlocks = [
      {
        "type": "context",
        "elements": [
          {
            "type": "mrkdwn",
            "text": `:pencil: I've included everything I know in the reports so far. Please make sure the info in the form is correct, then fill in the remaining fields.`
          }
        ]
      },
      {
        "type": "divider"
      }
    ];
    // Return compiled blocks
    return aboutReportsBlocks.concat(eventsListBlocks).concat(footerBlocks);
  }
  return [];
};

module.exports = blocksHomeNeedsReport;
