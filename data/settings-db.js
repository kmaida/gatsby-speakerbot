const Settings = require('./Settings');

/*------------------
   SETTINGS DB
------------------*/

const errHandler = (err) => {
  console.error(err.message);
  return new Error(err.message);
};

const settings = {
  /*----
    Initialize and set settings from ENV if there are no settings
  ----*/
  async initSettings() {
    return Settings.findOne({}, (err, settings) => {
      if (err) return errHandler(err);
      if (!settings) {
        const newSettings = new Settings({
          channel: process.env.SLACK_CHANNEL_ID,
          admins: process.env.SLACK_ADMINS.split(',')
        });
        newSettings.save((err) => {
          if (err) return errHandler(err);
          return newSettings;
        });
      }
    });
  },
  /*----
    Get settings object
  ----*/
  async getSettings() {
    return Settings.findOne({}, (err, settings) => {
      if (err) return errHandler(err);
      if (!settings) return new Error('No settings are saved');
      return settings;
    });
  },
  /*----
    Save channel to store
    @Params: channel
  ----*/
  async setChannel(channel) {
    return Settings.findOne({}, (err, settings) => {
      if (err) return errHandler(err);
      if (!channel) return new Error('No channel provided');
      // No settings exist yet; save new settings document
      if (!settings) {
        const newSettings = new Settings({
          channel: channel,
          admins: process.env.SLACK_ADMINS.split(',')
        });
        newSettings.save((err) => {
          if (err) return errHandler(err);
          return newSettings;
        });
      }
      // Update existing settings object
      else {
        settings.channel = channel;
        settings.save((err) => {
          if (err) return errHandler(err);
          console.log('Successfully set channel to', settings.channel);
          return settings;
        });
      }
    });
  },
  /*----
    Save admins to settings
    @TODO: figure out how to remove admins
    @Params: array of userID strings
  ----*/
  async addAdmins(admins) {
    return Settings.findOne({}, (err, settings) => {
      if (err) return errHandler(err);
      if (!admins || !admins.length) return new Error('No users provided');
      // No settings exist yet; save new settings document
      if (!settings) {
        const newSettings = new Settings({
          channel: process.env.SLACK_CHANNEL_ID,
          admins: admins
        });
        newSettings.save((err) => {
          if (err) return errHandler(err);
          return newSettings;
        });
      } 
      // Update existing settings object
      else {
        settings.admins = admins;
        settings.save((err) => {
          if (err) return errHandler(err);
          console.log('Successfully updated admin list to', settings.admins);
          return settings;
        });
      }
    });
  }
};

module.exports = settings;
