/*------------------
BLOCKS: APP HOME INTRO
------------------*/

const blocksHomeIntro = (homeParams) => {
  return [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `:wave: *Hello, <@${homeParams.userID}>!* Outcomes are reported in <#${homeParams.channel}>.`
      }
    },
    {
      "type": "divider"
    }
  ];
};

module.exports = blocksHomeIntro;
