const btnEditEvent = require('./../bot-response/ix-components/btn-edit-event');
const btnEditReport = require('./../bot-response/ix-components/btn-edit-report');

/*------------------
 BLOCKS: USER EVENTS
------------------*/

const blocksUserEvents = (userID, sortedEvents) => {
  console.log('blocksUserEvents', userID, sortedEvents);
  let upcomingEvents = [];
  const upcomingEventsListBlocks = [];
  let reports = [];
  const reportsListBlocks = [];
  // If there are upcoming events, compose them into blocks
  if (sortedEvents.upcoming.length) {
    upcomingEvents = [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": ":spiral_calendar_pad: *Your Upcoming Events:*"
        }
      }
    ];
    sortedEvents.upcoming.forEach((eventObj) => {
      const thisEventBlock = {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `:microphone: *${eventObj.event_name}*: ${eventObj.event_type} (${eventObj.event_date})`
        },
        "accessory": btnEditEvent(eventObj)
      };
      upcomingEventsListBlocks.push(thisEventBlock);
    });
  }
  // If there are completed event reports, compose them into blocks
  if (sortedEvents.reports.length) {
    reports = [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": ":newspaper: *Your Post-Event Reports:*"
        }
      }
    ];
    sortedEvents.reports.forEach((eventObj) => {
      const thisEventBlock = {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `:microphone: *${eventObj.event_name}*: ${eventObj.event_type} (${eventObj.event_date})`
        },
        "accessory": btnEditReport(eventObj)
      };
      reportsListBlocks.push(thisEventBlock);
    });
  }
  // Return compiled blocks
  return upcomingEvents.concat(upcomingEventsListBlocks).concat(reports).concat(reportsListBlocks);
};

module.exports = blocksUserEvents;
