const dmSyncEvents = require('./../bot-response/dm/dm-sync-events');

/*------------------
 ACTION: SYNC EVENTS
 Manual changes in Airtable
 Reschedule all events
 Update all home views
------------------*/

module.exports = (app, store, userHomeStore, at, triggerHomeViewUpdate, errSlack) => {
  app.action('btn_sync_events', async ({ ack, context, body }) => {
    await ack();
    const userID = body.user.id;
    // Get app settings
    const settings = await store.getSettings();
    const isAdmin = settings.admins.indexOf(userID) > -1;
    // Final verification that user is an admin
    if (isAdmin) {
      // Re-schedule all event followups
      // (Scheduling followups clears any previous)
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
      dmSyncEvents(app, userID, errSlack);
    } else {
      console.error('ERROR: An unauthorized (non-admin) user clicked the Airtable update button.');
    }
  });
};
