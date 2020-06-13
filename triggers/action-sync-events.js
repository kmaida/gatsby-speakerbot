const at = require('../data/airtable');
const store = require('../data/settings-db');
const userHomeStore = require('../data/userhome-db');
const schedule = require('../schedule/schedule-followup');
const triggerHomeViewUpdate = require('./trigger-home-view-update');
const errSlack = require('../utils/error-slack');

/*------------------
 ACTION: SYNC EVENTS
 Manual changes in Airtable
 Reschedule all events
 Update all home views
------------------*/

module.exports = (app) => {
  app.action('btn_sync_events', async ({ ack, context, body }) => {
    await ack();
    const userID = body.user.id;
    // Get app settings
    const settings = await store.getSettings();
    const isAdmin = settings.admins.indexOf(userID) > -1;
    // Final verification that user is an admin
    if (isAdmin) {
      // Clear all scheduled events
      schedule.clearAll();
      // Re-schedule all event followups
      at.getFollowupEvents(app);
      // Update app home view for all users who have opened app home
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
        errSlack(app, userID, err);
      }
      // Confirm events synced with admin user
      try {
        const confirmUpdateDM = await app.client.chat.postMessage({
          token: context.botToken,
          channel: userID,
          text: `:arrows_counterclockwise: I've successfully synced with the <https://airtable.com/${process.env.AIRTABLE_TABLE_ID}/${process.env.AIRTABLE_VIEW_ID}|events in Airtable>!`
        });
      }
      catch (err) {
        errSlack(app, userID, err);
      }
    } else {
      console.error('ERROR: An unauthorized (non-admin) user clicked the Airtable update button.');
    }
  });
};
