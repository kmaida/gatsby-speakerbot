/*------------------
  APP HOME OPENED
------------------*/

const appHomeOpened = (app, at) => {
  app.event('app_home_opened', async ({ event, context }) => {
    const userID = event.user;

    try {
      // const showHomeView = await app.client.views.publish({
      //   token: context.botToken,
      //   user_id: userID,
      //   view: {
      //     "type": "home",
      //     "blocks": homeBlocks(userID, storeList)
      //   }
      // });
    }
    catch (err) {
      console.error(err);
    }
  });
}

module.exports = appHomeOpened;