const homeBlocks = require('./../bot-response/blocks-home/blocks-home');

// Update the app home view (when data in it has changed)
const triggerHomeViewUpdate = async (app, homeParams, at, errHandler) => {
  try {
    const updateHomeView = await app.client.views.update({
      token: process.env.SLACK_BOT_TOKEN,
      user_id: homeParams.userID,
      view_id: homeParams.viewID,
      view: {
        "type": "home",
        "blocks": await homeBlocks(homeParams, at)
      }
    });
  }
  catch (err) {
    errHandler(app, {}, err);
  }
}

module.exports = triggerHomeViewUpdate;
