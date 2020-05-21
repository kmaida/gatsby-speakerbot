/*------------------
 BLOCKS: APP HOME
------------------*/

const blocksHome = async (homeParams, at) => {
  const isUserAdmin = homeParams.admins.indexOf(homeParams.userID) > -1;
  // Blocks Composition
  const introBlocks = require('./blocks-home-intro')(homeParams);
  const adminBlocks = isUserAdmin ? require('./blocks-home-admin')(homeParams) : [];
  const reportBlocks = await at.getPastEventsNeedReport(homeParams.userID);
  const useBlocks = require('./blocks-home-use')(homeParams);
  const helpBlocks = [];
  const footerBlocks = require('./blocks-home-footer');

  // Concat arrays and return appropriate configuration
  const allBlocks = introBlocks
                      .concat(adminBlocks)
                      .concat(reportBlocks)
                      .concat(useBlocks)
                      .concat(helpBlocks)
                      .concat(footerBlocks);
  // Return all composed blocks
  return allBlocks;
};

module.exports = blocksHome;
