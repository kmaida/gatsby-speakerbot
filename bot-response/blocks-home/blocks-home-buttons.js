const btnListEvent = require('./../ix-components/btn-list-event');
const btnNewReport = require('./../ix-components/btn-new-report');

/*------------------
  BLOCKS: BUTTONS
------------------*/

const blocksHomeButtons = (homeParams) => {
    const blocksButtons = [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": ":new: *Add Events and Reports:*"
        }
      },
      {
        "type": "actions",
        "elements": [
          btnListEvent(homeParams),
          btnNewReport(homeParams)
        ]
      },
      {
        "type": "divider"
      }
    ];
    return blocksButtons;
};

module.exports = blocksHomeButtons;
