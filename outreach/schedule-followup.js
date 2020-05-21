const dmFollowup = require('./../bot-response/dm/dm-event-followup');

/*------------------
 SCHEDULE FOLLOWUP
------------------*/

const schedule = {
  followup(app, recordObj) {
    const now = new Date().getTime();
    const timeout = recordObj.followup_at - now;
    // Uncomment for testing: const timeout = 10000;
    timeoutCb = () =>  dmFollowup(app, recordObj);
    const followupID = setTimeout(timeoutCb, timeout);
    console.log(`Scheduled followup for ${recordObj.name} in ${timeout / (1000 * 60 * 60)} hours: ${new Date(recordObj.followup_at)}`);
  }
};

module.exports = schedule;
