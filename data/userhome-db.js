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
    return UserHome.findOne({ userID }, (err, userHome) => {
      if (err) return dbErrHandler(err);
      if (!userHome) return new Error('No user home saved for this user');
      if (!userHome.viewID) return new Error('No user home view saved for this user');
      return userHome;
    });
  },
  /*----
    Set user home view if it doesn't already exist
    @Param: userID
    @Param: viewID
  ----*/
  async setUserHomeView(userID, viewID) {
    return UserHome.findOne({ userID }, (err, userHome) => {
      if (err) return dbErrHandler(err);
      if (!viewID) return new Error('No view ID provided');
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
      // If userHome exists but the viewID doesn't match, update it
      else if (userHome.viewID !== viewID) {
        userHome.viewID = viewID;
        userHome.save((err) => {
          if (err) return dbErrHandler(err);
          console.log('Succesfully updated user\'s viewID', userHome.viewID);
          return userHome;
        })
      }
      // If userHome exists and viewID matches, return userHome
      else {
        return userHome;
      }
    });
  }
};

module.exports = userHome;
