const dmFollowup = require('./../bot-response/dm/dm-event-followup');

/*------------------
 SCHEDULE FOLLOWUP
------------------*/

const schedule = {
  followup(app, recordObj) {
    const now = new Date().getTime();
    const timeout = recordObj.followup_at - now;
    // const timeout = 10000;
    timeoutCb = () =>  dmFollowup(app, recordObj);
    const followupID = setTimeout(timeoutCb, timeout);
    console.log(`Scheduled followup for ${recordObj.event_name} in ${timeout / (1000 * 60 * 60) / 24} days: ${new Date(recordObj.followup_at)}`);
  }
};

module.exports = schedule;
