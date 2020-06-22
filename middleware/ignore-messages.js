/*------------------
   IGNORE MESSAGES
  Middleware to
  ignore messages of
  specific subtypes
------------------*/

const ignoreMsg = async function ({ message, next }) {
  // @TODO: channel_topic is not being returned; instead, undefined is returned for changing channel topic
  console.log(message);
  const disallowedSubtypes = ['channel_topic', 'message_changed'];
  if (message && disallowedSubtypes.indexOf(message.subtype) > -1) {
    await next();
  }
}

module.exports = ignoreMsg;