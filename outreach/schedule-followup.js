const dmFollowup = require('./../bot-response/dm/dm-event-followup');

/*------------------
 SCHEDULE FOLLOWUP
------------------*/

const schedule = {
  followup(app, recordObj) {
    console.log('Schedule followup for:', recordObj.name);
    const timeout = new Date().getTime() - recordObj.followup_at;
    // Uncomment for testing: const timeout = 10000;
    timeoutCb = () =>  dmFollowup(app, recordObj);
    const followupID = setTimeout(timeoutCb, timeout);
  }
};

module.exports = schedule;
