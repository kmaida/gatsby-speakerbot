const cron = require('cron');
const utils = require('./../utils/utils');

/*------------------
     CRON JOBS
------------------*/

const jobs = {
  eventsThisWeek(app, at) {
    const weeklyRoundup = async () => {
      const today = new Date();
      // We'll get dates BEFORE this date in Airtable filter formula, so it should be the following Monday
      const endOfWeekISO = utils.dateToISO(today, 7);
      const roundup = await at.getEventsThisWeek(endOfWeekISO, app);
    };
    const job = new cron.CronJob({
      cronTime: '15 12 * * MON',
      onTick: weeklyRoundup,
      timeZone: 'America/Detroit'
    });
    // Log next 5 scheduled dates
    console.log('Next 3 weekly roundups scheduled for:', job.nextDates(3).map(date => date.toString()));
    job.start();
  }
};

module.exports = jobs;
