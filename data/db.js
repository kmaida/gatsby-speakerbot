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
    Initialize and set channel from ENV if there are no settings
  ----*/
  async initChannel() {
    return Settings.findOne({}, (err, settings) => {
      if (err) return errHandler(err);
      if (!settings || !settings.channel) {
        const newSettings = new Settings({
          channel: process.env.SLACK_CHANNEL_ID
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
          channel: channel
        });
        newSettings.save((err) => {
          if (err) return errHandler(err);
          return newSettings;
        });
      } else {
        // Update existing settings object
        settings.channel = channel;
        settings.save((err) => {
          if (err) return errHandler(err);
          console.log('Successfully set channel to', settings.channel);
          return settings;
        });
      }
    });
  }
};

module.exports = settings;