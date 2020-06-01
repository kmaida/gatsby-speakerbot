/*------------------
 BLOCKS: APP HOME
------------------*/

const blocksHome = async (homeParams, at) => {
  if (homeParams) {
    const isUserAdmin = homeParams.admins ? homeParams.admins.indexOf(homeParams.userID) > -1 : false;
    // Blocks Composition
    const introBlocks = require('./blocks-home-intro')(homeParams);
    const adminBlocks = isUserAdmin ? require('./blocks-home-admin')(homeParams) : [];
    const reportBlocks = await at.getPastEventsNeedReport(homeParams);
    const eventBlocks = await at.getUserEvents(homeParams);
    const useBlocks = require('./blocks-home-use')(homeParams);
    const footerBlocks = require('./blocks-home-footer');

    // Concat arrays and return appropriate configuration
    const allBlocks = introBlocks
      .concat(adminBlocks)
      .concat(reportBlocks)
      .concat(eventBlocks)
      .concat(useBlocks)
      .concat(footerBlocks);
    // Return all composed blocks
    return allBlocks;
  }
};

module.exports = blocksHome;
