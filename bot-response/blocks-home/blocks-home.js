/*------------------
 BLOCKS: APP HOME
------------------*/

const blocksHome = (homeParams) => {
  const isUserAdmin = homeParams.admins.indexOf(homeParams.userID) > -1;
  // Blocks Composition
  const introBlocks = require('./blocks-home-intro')(homeParams);
  const helpBlocks = [];
  const commandBlocks = [];
  const adminBlocks = isUserAdmin ? require('./blocks-home-admin')(homeParams) : [];
  // Concat arrays and return appropriate configuration
  return introBlocks.concat(helpBlocks).concat(commandBlocks).concat(adminBlocks);
};

module.exports = blocksHome;
