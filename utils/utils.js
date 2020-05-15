/*------------------
       UTILS
------------------*/

const utils = {
  regex: {
    // @speakerbot help
    // Post help messaging
    help: /^<@(U[A-Z0-9]+?)> (help)$/g
  },
  /*----
    Clean up mention text so it can be tested / parsed
    @Params: mention event message
    @Returns: string
  ----*/
  cleanText(msg) {
    const cleanMsg = msg
      .replace('Reminder: ', '')
      .replace("_(sent with '/gator')_", '')
      .replace(/\|[a-z0-9._\-]+?>/g, '>')     // Remove username if present in mentions
      .replace(/“/g, '"').replace(/”/g, '"')  // Slack decided to use smart quotes (ugh)
      .trim();
    return cleanMsg;
  },
  /*----
    Test message to see if its format matches expectations for specific command
    Need to new RegExp to execute on runtime
    @Params: command, mention event message
    @Returns: boolean
  ----*/
  isMentionCmd(cmd, input) {
    const msg = this.cleanText(input);
    const regex = new RegExp(this.regex[cmd]);
    return regex.test(msg);
  }
};

module.exports = utils;