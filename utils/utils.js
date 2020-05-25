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
    Is the date today or in the future/past?
    @Params: date string (YYYY-MM-DD)
    @Params: boolean (testing future = true)
    @Returns: boolean
  ----*/
  dateCompare(dateInput, testFuture) {
    const now = new Date();
    const eventDate = new Date(dateInput + 'T00:00:00');
    const isFuture = eventDate.getTime() >= now.getTime();
    const isPast = eventDate.getTime() <= now.getTime();
    const todayStr = now.toDateString();
    const dateStr = eventDate.toDateString();
    const isToday = todayStr === dateStr;
    if (testFuture) {
      return !!(isFuture || isToday);
    } else {
      return !!(isPast || isToday);
    }
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