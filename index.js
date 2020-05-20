require('dotenv').config();
const { App } = require('@slack/bolt');
// Airtable
const at = require('./data/airtable');
// Utils
const errHandler = require('./utils/error');
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
store.initSettings();
// @TODO: get upcoming events and schedule followups

/*------------------
     TRIGGERS
------------------*/
require('./triggers/trigger-new')(app, errHandler);
require('./triggers/trigger-report')(app, errHandler);

/*------------------
  VIEW SUBMISSIONS
------------------*/
require('./view-submissions/submit-new')(app, at, utils, errHandler);
require('./view-submissions/submit-report')(app, at, utils, errHandler);

/*------------------
 SCHEDULE FOLLOWUPS
------------------*/
at.getUpcomingEvents(app);

/*------------------
  APP HOME OPENED
------------------*/
require('./events/app-home-opened')(app);

/*------------------
    APP MENTION
------------------*/
require('./events/app-mention')(app, utils, errHandler);

/*------------------
     START APP
------------------*/
(async () => {
  await app.start(port);
  console.log(`⚡️ gatsby-speakers is running on ${port}!`);
})();
