const btnEventReport = require('./../../bot-response/ix-components/btn-event-report');

/*------------------
BLOCKS: APP HOME REPORT
------------------*/

const blocksHomeNeedsReport = (recordObjArr) => {
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
          "text": "According to my records, you've completed the following speaking engagements, but have not filled out event reports yet! I can help with that. Just click the button next to any events listed here, and I'll help you fill out your report."
        }
      }
    ];
    const eventsListBlocks = [];
    recordObjArr.forEach((recordObj) => {
      const thisEventBlock = {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `*${recordObj.event_name}* (${recordObj.event_date})`
        },
        "accessory": btnEventReport(recordObj)
      };
      eventsListBlocks.push(thisEventBlock);
    });
    const footerBlocks = [
      {
        "type": "context",
        "elements": [
          {
            "type": "mrkdwn",
            "text": ":information_desk_person: I've prefilled your reports with everything I know about events. Please make sure it's correct and then fill in the remaining fields."
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
