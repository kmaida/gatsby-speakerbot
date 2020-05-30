const cron = require('cron');
const utils = require('./../utils/utils');

/*------------------
     CRON JOBS
------------------*/

const jobs = {
  eventsThisWeek(app, at) {
    const weeklyRoundup = () => {
      const endOfWeekISO = null;
      at.getEventsThisWeek(endofWeekISO);
    };
    const job = new cron.CronJob({
      cronTime: '00 12 * * MON',
      onTick: weeklyRoundup,
      timeZone: 'America/Detroit'
    });
    // Log next 5 scheduled dates
    console.log('Weekly roundups scheduled for:', job.nextDates(5).map(date => date.toString()));
    job.start();
  }
};

module.exports = jobs;
