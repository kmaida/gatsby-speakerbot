/*------------------
BLOCKS: APP HOME REPORT
------------------*/

const blocksHomeNeedsReport = (recordObjArr) => {
  return [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "This is a mrkdwn section block :ghost: *this is bold*, and ~this is crossed out~, and <https://google.com|this is a link>"
      }
    }
  ];
};

module.exports = blocksHomeNeedsReport;
