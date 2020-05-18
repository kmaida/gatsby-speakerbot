/*------------------
       UTILS
------------------*/

const utils = {
  regex: {
    // @speakerbot help
    // Post help messaging
    help: /^<@(U[A-Z0-9]+?)> (help)$/g,
    // URL regex - https://regexr.com/4va24
    url: /((?:[A-Za-z]{3,9})(?::\/\/|@)(?:(?:[A-Za-z0-9\-.]+[.:])|(?:www\.|[-;:&=+$,\w]+@))(?:[A-Za-z0-9.-]+)(?:[/\-+=&;%@.\w_~()]*)(?:[.!/\\\w-?%#~&=+()]*))/g,
    // Reach (number)
    number: /^[0-9]*$/g
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
  },
  /*----
    Is the date in the past?
    @Params: date string (MM-DD-YYYY)
    @Returns: boolean
  ----*/
  datePast(dateStr) {
    const now = new Date().getTime();
    const date = new Date(dateStr).getTime();
    return now >= date;
  },
  /*----
    Is the date in the future?
    @Params: date string (MM-DD-YYYY)
    @Returns: boolean
  ----*/
  dateFuture(dateStr) {
    const now = new Date().getTime();
    const date = new Date(dateStr).getTime();
    return date >= now;
  },
  /*----
    Is the string a URL?
    @Params: URL string
    @Returns: boolean
  ----*/
  validUrl(str) {
    console.log(typeof str);
    const regex = new RegExp(this.regex.url);
    const cleanStr = str.trim();
    return cleanStr.match(regex);
  },
  /*----
    Is the string in a number-friendly format?
    E.g., 1,000, 100.5
    @Params: URL string
    @Returns: boolean
  ----*/
  isNumberFormat(str) {
    console.log(typeof str);
    const regex = new RegExp(this.regex.number);
    const cleanStr = str.trim();
    return cleanStr.match(regex);
  },
  /*----
    Does the object have properties?
    @Params: object
    @Returns: boolean
  ----*/
  objNotEmpty(obj) {
    return Object.keys(obj).length && obj.constructor === Object;
  },
  /*----
    Capitalize the first letter of a string
    @Params: string
    @Returns: string
  ----*/
  capFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
};

module.exports = utils;