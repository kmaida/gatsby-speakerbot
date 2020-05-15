require('dotenv').config();
const { App } = require('@slack/bolt');
// Airtable
const at = require('./data/airtable');
// Utils
const errHandler = require('./utils/error');
const msgText = require('./bot-response/message-text');

/*------------------
       ON INIT
------------------*/
// Create Bolt app
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});
const port = process.env.PORT || 3000;

/*------------------
  APP HOME OPENED
------------------*/
require('./app-home-opened')(app, at);

/*------------------
   SLASH COMMANDS
------------------*/
require('./commands/speaking-new')(app, at, errHandler);
require('./commands/speaking-report')(app, at, errHandler);

/*------------------
     START APP
------------------*/
(async () => {
  await app.start(port);
  console.log(`⚡️ gatsby-speakers is running on ${port}!`);
})();
