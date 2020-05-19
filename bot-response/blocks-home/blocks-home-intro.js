/*------------------
BLOCKS: APP HOME INTRO
------------------*/

const blocksHomeIntro = (homeParams) => {
  return [
    {
      "type": "section",
      "accessory": {
        "type": "image",
        "image_url": "https://avatars.slack-edge.com/2020-05-15/1127091402914_367a18732ae0e6103825_512.png",
        "alt_text": "speakerbot"
      },
      "text": {
        "type": "mrkdwn",
        "text": `:wave: *Hello, <@${homeParams.userID}>!* I'm <@${homeParams.botID}>, your friendly *Speaking Events Manager Bot* :microphone::robot_face:\n\nIt's my job to help folks at Gatsby communicate about their speaking events so the DevRel team can fully support their activities and follow up to gather insights and important takeaways.\n\nWhenever someone *lists a new event* or *submits an event report*, I share that in <#${homeParams.channel}>. Anyone can check out the feed there!`
      },
    },
    {
      "type": "divider"
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `:sparkles: *List New Speaking Events:*\n\nI ask that you tell me about your upcoming speaking events. Why?`
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `_Support for Gatsby team speakers._\n• DevRel can offer you content and slide reviews, as well as rehearsal opportunities\n• Get speaking tips from DevRel and/or <https://app.getguru.com/card/iLp66e4T/-Request-Public-Speaker-Training|professional speaker coaching>\n• Get swag to give away at the event\n• Align on messaging / topic suggestions if you're looking for something to speak about\n• Get equipment or other physical resources (microphones, webcams, slide advancers, lights, adapters, etc.)`
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `_Larger promotion of your event presence._\n• Brand can share your upcoming event on various social media channels\n• Teams such as Product Marketing and Growth can highlight your upcoming event in newsletters, promotional materials, mention it at other (earlier) events, etc.\n• DevRel can share your event with the developer community and developer programs`
      }
    },
    {
      "type": "divider"
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `:newspaper: *Submit Post-Event Reports:*\n\nI ask that you fill out an Event Report after your speaking engagement has concluded. Why?`
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `_Greater promotion of your event presence._\n• Brand can share your event recording on various social media channels\n• Teams like Product Marketing and Growth can highlight your event presence / recordings / broadcasts in newsletters, promotional materials, mention it at other (earlier) events, etc.\n• DevRel can share your event with the developer community and developer programs`
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `_Measuring and learning from outcomes and results._\n• Was the event totally awesome / beyond expectations? Was it decent? Was it meh? Was it a waste of time?\n• Should we make sure that we try to participate every year?\n• Should we consider getting more deeply involved / offer sponsorship in the future?\n• How many people did you reach at the event?\n• Were there any really interesting outcomes? (New people you met, new companies you developed relationships with, new community contributors who we should invite to ambassador programs or advisory boards? People you converted to Gatsby Cloud? People who had critical feedback on the product?)`
      }
    },
    {
      "type": "divider"
    }
  ];
};

module.exports = blocksHomeIntro;
