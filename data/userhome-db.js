const UserHome = require('./UserHome');

/*------------------
   USER HOME API
------------------*/

const dbErrHandler = (err) => {
  console.error(err.message);
  return new Error(err.message);
};

const userHome = {
  /*----
    Get a user home by user ID
    @Param: userID
  ----*/
  async getUserHome(userID) {
    return UserHome.findOne({userID = userID}, (err, userHome) => {
      if (err) return dbErrHandler(err);
      if (!userHome) return new Error('No user home saved for this user');
      return userHome;
    });
  },
  /*----
    Set user home view if it doesn't already exist
    @Param: userID
    @Param: viewID
  ----*/
  async setUserHomeView(userID, viewID) {
    return UserHome.findOne({ userID = userID }, (err, userHome) => {
      if (err) return dbErrHandler(err);
      if (!submitReportID) return new Error('No report ID provided');
      // If userHome doesn't exist, create it
      if (!userHome) {
        const newUserHome = new UserHome({
          userID: userID,
          viewID: viewID
        });
        newUserHome.save((err) => {
          if (err) return dbErrHandler(err);
          return newUserHome;
        });
      }
    });
  },
  /*----
    Save submit report ID
    @Param: userID
    @Param: submitReportID
  ----*/
  async setSubmitReport(userID, submitReportID) {
    return UserHome.findOne({ userID = userID }, (err, userHome) => {
      if (err) return dbErrHandler(err);
      if (!submitReportID) return new Error('No report ID provided');
      userHome.submitReportID = submitReportID;
      // Save to database
      userHome.save((err) => {
        if (err) return dbErrHandler(err);
        console.log('Successfully saved submit report ID', userHome.submitReportID);
        return userHome;
      });
    });
  },
  /*----
    Save edit report settings
    @Param: userID
    @Param: editReportID
  ----*/
  async setEditReport(userID, editReportID) {
    return UserHome.findOne({ userID = userID }, (err, userHome) => {
      if (err) return dbErrHandler(err);
      if (!editReportID) return new Error('No edit report ID provided');
      userHome.submitReportID = submitReportID;
      userHome.editReport = true;
      // Save to database
      userHome.save((err) => {
        if (err) return dbErrHandler(err);
        console.log('Successfully saved edit report ID', userHome.editReportID);
        return userHome;
      });
    });
  }
};

module.exports = userHome;
