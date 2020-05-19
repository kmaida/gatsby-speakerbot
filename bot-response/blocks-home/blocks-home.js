/*------------------
 BLOCKS: APP HOME
------------------*/

const blocksHome = (homeParams) => {
  const isUserAdmin = homeParams.admins.indexOf(homeParams.userID) > -1;
  // Blocks Composition
  const introBlocks = require('./blocks-home-intro')(homeParams);
  const adminBlocks = isUserAdmin ? require('./blocks-home-admin')(homeParams) : [];
  const useBlocks = require('./blocks-home-use')(homeParams);
  const helpBlocks = [];
  const footerBlocks = require('./blocks-home-footer');
  // Concat arrays and return appropriate configuration
  return introBlocks.concat(adminBlocks).concat(useBlocks).concat(helpBlocks).concat(footerBlocks);
};

module.exports = blocksHome;
