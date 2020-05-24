/*------------------
       UTILS
------------------*/

const utils = {
  regex: {
    // URL regex - https://regexr.com/4va24
    url: /((?:[A-Za-z]{3,9})(?::\/\/|@)(?:(?:[A-Za-z0-9\-.]+[.:])|(?:www\.|[-;:&=+$,\w]+@))(?:[A-Za-z0-9.-]+)(?:[/\-+=&;%@.\w_~()]*)(?:[.!/\\\w-?%#~&=+()]*))/g,
    // Reach (number)
    number: /^[0-9]*$/g
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
    Is the string a valid URL?
    @Params: string
    @Returns: boolean
  ----*/
  validUrl(input) {
    const regex = new RegExp(this.regex.url);
    const cleanStr = input.toString().trim();
    return cleanStr.match(regex);
  },
  /*----
    Is the text field input a string that only contains numbers?
    (We will coerce it later if it passes this validation)
    @Params: string
    @Returns: boolean
  ----*/
  isNumberFormat(input) {
    const regex = new RegExp(this.regex.number);
    const cleanStr = input.toString().trim();
    return cleanStr.match(regex);
  },
  /*----
    Does the object have properties?
    @Params: object
    @Returns: boolean
  ----*/
  objNotEmpty(obj) {
    return Object.keys(obj).length && obj.constructor === Object;
  }
};

module.exports = utils;