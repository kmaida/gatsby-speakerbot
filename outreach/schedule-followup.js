const dmFollowup = require('./../bot-response/dm/dm-event-followup');
const channelFollowup = require('./../bot-response/publish/publish-channel-followup');

/*------------------
 SCHEDULE FOLLOWUP
------------------*/

const schedule = {
  followup(app, recordObj) {
    const now = new Date().getTime();
    const timeout = recordObj.followup_at - now;
    // Uncomment to test followup scheduling: 
    // const timeout = 5000;
    timeoutCb = () => {
      dmFollowup(app, recordObj);
      channelFollowup(app, recordObj);
    }
    const followupID = setTimeout(timeoutCb, timeout);
    // Logging
    const logDays = Math.round(((timeout / (1000 * 60 * 60) / 24) + 0.00001) * 100) / 100;
    console.log(`Scheduled followup for ${recordObj.event_name} in ${logDays} days: ${new Date(recordObj.followup_at)}`);
  }
};

module.exports = schedule;
