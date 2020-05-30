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
    Is the date today + future, or today + past?
    @Params: date string (YYYY-MM-DD)
    @Params: boolean (testing future = true)
    @Returns: boolean
  ----*/
  dateCompare(dateInput, testFuture) {
    // Get today's date in ISO at 11:59:59
    const now = new Date().toISOString().split('T')[0];
    const todayISO = now + 'T23:59:59Z';
    const today = new Date(todayISO);
    // Get event date in ISO at 11:59:59
    const eventDate = new Date(dateInput + 'T23:59:59Z');
    // Compare timestamps for UTC event date and UTC today to determine past/future
    // (Today is valid for both past and future)
    const isFuture = eventDate.getTime() >= today.getTime();
    const isPast = eventDate.getTime() <= today.getTime();
    // Are we checking for a future date or a past date?
    if (testFuture) {
      return isFuture;
    } else {
      return isPast;
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
  },
  /*----
    Takes event date and returns ISO string of next day
    @Params: ISO date string (YYYY-MM-DD)
    @Returns: ISO date string (full)
  ----*/
  getFollowupISO(dateStr) {
    const jsDate = new Date(dateStr);
    const jsDatetime = jsDate.getTime();
    const dayms = (1000 * 60 * 60) * 24;
    const nextDayDatetime = jsDatetime + dayms;
    const jsNextDay = new Date(nextDayDatetime);
    return jsNextDay.toISOString();
  },
  /*----
    Takes a JS date string and returns simple ISO string
    @Param: anything that can be converted to a JS date (e.g., 'Mon Jun 01 2020 12:00:00 GMT-0400', timestamp, ISO, etc.)
    @Param: number - offset from passed date in days (optional)
    @Returns: Simple ISO date string (YYYY-MM-DD)
  ----*/
  dateToISO(dateInput, dayOffset) {
    const msOffset = dayOffset ? dayOffset * (1000 * 60 * 60 * 24) : 0;
    const baseDate = typeof dateInput.getMonth === 'function' ? dateInput : new Date(dateInput);
    const dateObj = new Date(baseDate.getTime() + msOffset);
    const iso = dateObj.toISOString().split('T')[0];
    return iso;
  }
};

module.exports = utils;
