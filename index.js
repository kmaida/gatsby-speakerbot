require('dotenv').config();
const { App } = require('@slack/bolt');
// Airtable
const at = require('./data/airtable');
// Utils
const utils = require('./utils/utils');
// MongoDB
const mongoose = require('mongoose');
const store = require('./data/settings-db');

/*------------------
  CREATE BOLT APP
------------------*/
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});
const port = process.env.PORT || 3000;

/*------------------
      MONGODB
------------------*/
// Address server discovery deprecation warning
mongoose.set('useUnifiedTopology', true);
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
const mon = mongoose.connection;
// Capture connection errors
mon.on('error', console.error.bind(console, 'MongoDB Connection Error. Please make sure that', process.env.MONGO_URI, 'is running.'));
// Open connection
mon.once('open', function () {
  console.info('Connected to MongoDB:', process.env.MONGO_URI);
});

/*------------------
    ON APP INIT
------------------*/
// Get bot configuration settings from MongoDB
store.initSettings();
// Schedule event followups
at.getFollowupEvents(app);

/*------------------
     TRIGGERS
------------------*/
require('./triggers/trigger-new')(app);
require('./triggers/trigger-report')(app);

/*------------------
  VIEW SUBMISSIONS
------------------*/
require('./view-submissions/submit-new')(app, at, utils);
require('./view-submissions/submit-report')(app, at, utils);

/*------------------
  APP HOME OPENED
------------------*/
require('./events/app-home-opened')(app, at);

/*------------------
    APP MENTION
------------------*/
require('./events/app-mention')(app);

/*------------------
     START APP
------------------*/
(async () => {
  await app.start(port);
  console.log(`⚡️ gatsby-speakers is running on ${port}!`);
})();
