const dmFollowup = require('./../bot-response/dm/dm-event-followup');

/*------------------
 SCHEDULE FOLLOWUP
------------------*/

const schedule = {
  followup(app, recordObj) {
    const timeout = recordObj.followup_at - new Date().getTime();
    // Uncomment for testing: const timeout = 10000;
    timeoutCb = () =>  dmFollowup(app, recordObj);
    const followupID = setTimeout(timeoutCb, timeout);
    console.log(`Scheduled followup for ${recordObj.name} in ${timeout / (1000 * 60 * 60) / 24} days`);
  }
};

module.exports = schedule;
