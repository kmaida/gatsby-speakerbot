const Settings = require('./Settings');

/*------------------
   SETTINGS DB
------------------*/

const settings = {
  /*----
    Get settings object
  ----*/
  async getSettings() {
    return Settings.findOne({}, (err, settings) => {
      if (err) console.error(err.message);
      if (!settings) return new Error('No settings saved');
      return settings;
    });
  },
  /*----
    Save channel to store
    @Params: channel
  ----*/
  async setChannel(channel) {
    return Settings.findOne({}, (err, settings) => {
      if (err) console.error(err.message);
      if (!settings) {
        const newSettings = new Settings({
          channel: channel
        });
        newSettings.save((err) => {
          if (err) console.error(err.message);
          return newSettings;
        });
      } else {
        settings.channel = channel;
        settings.save((err) => {
          if (err) console.error(err.message);
          console.log('successfully set channel');
          return settings;
        });
      }
    });
  }
};

module.exports = settings;