const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*------------------
  USER HOME SCHEMA
------------------*/

const userHomeSchema = new Schema({
  userID: { type: String, required: true },
  viewID: { type: String, required: true },
  submitReportID: String,
  editReportID: String,
  editReport: Boolean
});

module.exports = mongoose.model('SpeakerbotUserHomes', userHomeSchema);
