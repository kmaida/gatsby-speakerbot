const at = require('./../data/airtable');
const store = require('./../data/settings-db');
const userHomeStore = require('./../data/userhome-db');
const schedule = require('./../schedule/schedule-followup');
const triggerHomeViewUpdate = require('./../triggers/trigger-home-view-update');

/*------------------
 ACTION: AIRTABLE UPDATE
 Manual changes in Airtable
 Reschedule all events
 Update all home views
------------------*/

module.exports = (app) => {
  app.action('btn_airtable_update', async ({ ack, context, body }) => {
    await ack();
    // Get app settings
    const settings = await store.getSettings();
    const isAdmin = settings.admins.indexOf(body.user.id) > -1;
    if (isAdmin) {
      // Clear all scheduled events
      schedule.clearAll();
      // Re-schedule all event followups
      at.getFollowupEvents(app);
      // Update app home view for all users
      try {
        const allUserHomes = await userHomeStore.getUserHomes();
        allUserHomes.forEach(async (userHome) => {
          const userHomeParams = {
            userID: userHome.userID,
            viewID: userHome.viewID,
            botID: context.botUserId,
            channel: settings.channel,
            admins: settings.admins
          };
          await triggerHomeViewUpdate(app, userHomeParams, at);
        });
      }
      catch (err) {
        errSlack(app, body.user.id, err);
      }
    } else {
      console.error('ERROR: An unauthorized (non-admin) user clicked the Airtable update button.');
    }
  });
};
