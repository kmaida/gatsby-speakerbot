/*------------------
   ERROR HANDLER
------------------*/

module.exports = (data, err) => {
  console.error('An error occurred:', err);
  console.error('The above error was related to the following data:', data);
};
