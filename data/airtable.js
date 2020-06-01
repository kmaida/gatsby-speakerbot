const base = require('airtable').base(process.env.AIRTABLE_BASE_ID);
const table = process.env.AIRTABLE_TABLE;
const tableID = process.env.AIRTABLE_TABLE_ID;
const viewID = process.env.AIRTABLE_VIEW_ID;
const utils = require('./../utils/utils');
const publishSlackEvent = require('./../bot-response/publish/publish-slack-event');
const publishSlackReport = require('./../bot-response/publish/publish-slack-report');
const publishWeekly = require('./../bot-response/publish/publish-weekly-upcoming');
const dmConfirmNew = require('./../bot-response/dm/dm-confirm-new');
const dmConfirmReport = require('./../bot-response/dm/dm-confirm-report');
const schedule = require('../schedule/schedule-followup');
const blocksHomeNeedsReport = require('./../bot-response/blocks-home/blocks-home-needsreport');
const blocksUserEvents = require('../bot-response/blocks-home/blocks-home-user-events');

/*------------------
      AIRTABLE
------------------*/

const sendErr = (err) => {
  console.error(err);
  return new Error(err);
};

const at = {
  /*----
    Get record by ID
  ----*/
  findEvent(id) {
    base(table).find(id, function(err, record) {
      if (err) {
        sendErr(err);
      }
      return record.getId();
    });
  },

  /*----
    Add or update a new event record in Airtable
  ----*/
  async listNewEvent(app, bc, data) {
    // Check to see if event exists
    const results = await base(table).select({
      filterByFormula: `AND({Name} = "${data.event_name}", {Event Type} = "${data.event_type}", {Submitter Slack ID} = "${data.submitterID}")`,
      maxRecords: 1
    }).all();
    const recordID = results.length ? results[0].getId() : null;
    // If event exists, update
    if (!!recordID) {
      base(table).update([
        {
          "id": recordID,
          "fields": {
            "Name": data.event_name,
            "Date": data.event_date,
            "Location": data.location,
            "Event URL": data.url,
            "Who's speaking?": data.speakers,
            "Event Type": data.event_type,
            "Topic": data.topic,
            "Notes": data.notes,
            "Followup": utils.getFollowupISO(data.event_date),
            "Submitter Slack ID": data.submitterID
          }
        }
      ], function (err, records) {
        if (err) {
          sendErr(err);
        }
        const updated = records[0].getId();
        console.log('Edited existing upcoming event:', updated);
        const updatedObj = {
          id: updated,
          link: `https://airtable.com/${tableID}/${viewID}/${updated}`
        };
        // If the date has been changed for an event, re-schedule followups
        if (results[0].fields['Date'] != data.event_date) {
          at.getFollowupEvents(app);
        }
        // Share event output in designated Slack channel
        publishSlackEvent(app, data, updatedObj, true);
        // DM user who submitted event
        dmConfirmNew(app, bc, data, true);
        return updatedObj;
      });
    } else {
      base(table).create([
        {
          "fields": {
            "Name": data.event_name,
            "Date": data.event_date,
            "Location": data.location,
            "Event URL": data.url,
            "Who's speaking?": data.speakers,
            "Event Type": data.event_type,
            "Topic": data.topic,
            "Notes": data.notes,
            "Followup": utils.getFollowupISO(data.event_date),
            "Submitter Slack ID": data.submitterID
          }
        }
      ], (err, records) => {
        if (err) {
          sendErr(err);
        }
        const saved = records[0];
        const savedObj = {
          id: saved.getId(),
          link: `https://airtable.com/${tableID}/${viewID}/${saved.getId()}`
        };
        console.log('Saved new event:', savedObj);
        // Share event output in designated Slack channel
        publishSlackEvent(app, data, savedObj);
        // DM user who submitted event
        dmConfirmNew(app, bc, data);
        // Set up followup
        this.setupFollowup(app, saved);
        return savedObj;
      });
    }
  },

  /*----
    Add post-event report
    Check if event exists already, if so, update
    If event does not exist, create new record
  ----*/
  async submitEventReport(app, bc, data) {
    // Check to see if report exists
    const results = await base(table).select({
      filterByFormula: `AND({Name} = "${data.event_name}", {Event Type} = "${data.event_type}", {Submitter Slack ID} = "${data.submitterID}")`,
      maxRecords: 1
    }).all();
    const edit = results.length ? !!results[0].fields['Event Rating'] : false;
    const recordID = results.length ? results[0].getId() : null;

    // If event exists, update
    if (!!recordID) {
      base(table).update([
        {
          "id": recordID,
          "fields": {
            "Date": data.event_date,
            "Event URL": data.url,
            "Topic": data.topic,
            "Est. Reach": data.reach,
            "Content Links": data.content_links,
            "Event Rating": data.rating,
            "Post Event Report": data.report,
            "Submitter Slack ID": data.submitterID
          }
        }
      ], function (err, records) {
        if (err) {
          sendErr(err);
        }
        const updated = records[0].getId();
        console.log(!edit ? 'Updated existing event to add report:' : 'Updated existing report', updated);
        const updatedObj = {
          id: updated,
          link: `https://airtable.com/${tableID}/${viewID}/${updated}`
        };
        // Share event output in designated Slack channel
        publishSlackReport(app, data, updatedObj, edit);
        // DM user who submitted event
        dmConfirmReport(app, bc, data, edit);
        return updatedObj;
      });
    }
    // If event does not exist, create new
    else {
      base(table).create([
        {
          "fields": {
            "Name": data.event_name,
            "Date": data.event_date,
            "Event Type": data.event_type,
            "Event URL": data.url,
            "Who's speaking?": data.speakers,
            "Topic": data.topic,
            "Est. Reach": data.reach,
            "Content Links": data.content_links,
            "Event Rating": data.rating,
            "Post Event Report": data.report,
            "Submitter Slack ID": data.submitterID
          }
        }
      ], (err, records) => {
        if (err) {
          sendErr(err);
        }
        const newReport = records[0].getId();
        console.log('Saved new event with post-event report:', newReport);
        const newObj = {
          id: newReport,
          link: `https://airtable.com/${tableID}/${viewID}/${newReport}`
        };
        // Share event output in designated Slack channel
        publishSlackReport(app, data, newObj);
        // DM user who submitted report
        dmConfirmReport(app, bc, data);
        return newObj;
      });
    }
  },

  /*----
    Get data on events to schedule user followups
    to fill out a post-event report
    Do this for events with a followup of today or after today
    Do for events that do NOT have a rating
    (This should be called on init of the app)
  ----*/
  async getFollowupEvents(app) {
    try {
      const results = [];
      const atData = await base(table).select({
        filterByFormula: `AND({Event Rating} = BLANK(), OR(IS_AFTER({Followup}, TODAY()), {Followup} = TODAY()))`,
        view: viewID,
        fields: ["Name", "Date", "Event Type", "Topic", "Event URL", "Who's speaking?", "Followup", "Submitter Slack ID"]
      }).all();
      atData.forEach((record) => {
        const resObj = this.setupFollowup(app, record);
        results.push(resObj);
      });
      return results;
    }
    catch (err) {
      sendErr(err);
    }
  },

  /*----
    Set up followup by forming a followup object
    Passing object to schedule.followup() service
  ----*/
  setupFollowup(app, record) {
    // Build followup object with necessary data to schedule followup
    const followuptime = new Date(record.fields['Followup'] + 'T00:00:00Z').getTime();
    const hourDelay = (1000 * 60 * 60) * 17.5;  // 12:30/1:30 Eastern (depending on DST)
    const followupAt = followuptime + hourDelay;
    const now = new Date().getTime();
    // If followup time has not passed
    if (now < followupAt) {
      const recordObj = {
        id: record.getId(),
        event_name: record.fields['Name'],
        event_date: record.fields['Date'],
        datetime: new Date(record.fields['Date'] + 'T00:00:00Z').getTime(),
        followup_at: followupAt,
        event_type: record.fields['Event Type'],
        topic: record.fields['Topic'],
        speakers: record.fields["Who's speaking?"],
        url: record.fields['Event URL'],
        submitterID: record.fields['Submitter Slack ID']
      };
      // Schedule the followup
      schedule.followup(app, recordObj);
      return recordObj;
    }
  },

/*----
  Get all events from a specific user
  @Returns: blocks for displaying all events
----*/
  async getUserEvents(homeParams) {
    try {
      const results = [];
      const atData = await base(table).select({
        filterByFormula: `{Submitter Slack ID} = "${homeParams.userID}"`,
        view: viewID
      }).all();
      atData.forEach((record) => {
        const resObj = this.setupUserEvents(record);
        results.push(resObj);
      });
      const sortedEvents = utils.sortUserEvents(results);
      return blocksUserEvents(sortedEvents, homeParams);
    }
    catch (err) {
      sendErr(err);
    }
  },

  /*----
    Return a record object for a specific user
    for events in the past that don't yet have
    a report submitted
    (This object should be used to populate
    initial fields in event report form from
    user's app home)
  ----*/
  setupUserEvents(record) {
    const recordObj = {
      id: record.getId(),
      event_name: record.fields['Name'],
      event_date: record.fields['Date'],
      event_type: record.fields['Event Type'],
      topic: record.fields['Topic'],
      speakers: record.fields["Who's speaking?"],
      url: record.fields['Event URL'],
      location: record.fields['Location'],
      notes: utils.clearNewline(record.fields['Notes']),
      reach: record.fields['Est. Reach'],
      content_links: utils.clearNewline(record.fields['Content Links']),
      rating: record.fields['Event Rating'],
      report: utils.clearNewline(record.fields['Post Event Report']),
      submitterID: record.fields['Submitter Slack ID']
    };
    // Return known record data to prefill form
    return recordObj;
  },

  /*----
    Get data on recently past events for a
    specific user that don't have a report yet.
    Events can be today or in the past.
    (Display in a user's app home)
    @Returns: blocks for user's app home
  ----*/
  async getPastEventsNeedReport(homeParams) {
    try {
      const results = [];
      const atData = await base(table).select({
        filterByFormula: `AND({Event Rating} = BLANK(), {Submitter Slack ID} = "${homeParams.userID}", OR(IS_BEFORE({Date}, TODAY()), {Date} = TODAY()))`,
        view: viewID,
        fields: ["Name", "Date", "Event Type", "Topic", "Event URL", "Who's speaking?", "Submitter Slack ID"]
      }).all();
      atData.forEach((record) => {
        const resObj = this.setupNeedsReportByUser(record);
        results.push(resObj);
      });
      return blocksHomeNeedsReport(results, homeParams);
    }
    catch (err) {
      sendErr(err);
    }
  },

  /*----
    Return a record object for a specific user
    for events in the past that don't yet have
    a report submitted
    (This object should be used to populate
    initial fields in event report form from
    user's app home)
  ----*/
  setupNeedsReportByUser(record) {
    const recordObj = {
      id: record.getId(),
      event_name: record.fields['Name'],
      event_date: record.fields['Date'],
      event_type: record.fields['Event Type'],
      topic: record.fields['Topic'],
      speakers: record.fields["Who's speaking?"],
      url: record.fields['Event URL'],
      submitterID: record.fields['Submitter Slack ID']
    };
    // Return known record data to prefill event report form with
    return recordObj;
  },

  /*----
    Get events upcoming this week
    @Param: ISO before (YYYY-MM-DD) (7 days out)
    @Returns: array of events
  ----*/
  async getEventsThisWeek(beforeDate, app) {
    try {
      const results = [];
      const atData = await base(table).select({
        filterByFormula: `AND(IS_BEFORE({Date}, "${beforeDate}"), OR(IS_AFTER({Date}, TODAY()), {Date} = TODAY()))`,
        view: viewID,
        fields: ["Name", "Date", "Event URL", "Who's speaking?", "Submitter Slack ID"]
      }).all();
      atData.forEach((record) => {
        const resObj = this.setupUpcomingWeekEvent(record);
        results.push(resObj);
      });
      return publishWeekly(app, results);
    }
    catch (err) {
      sendErr(err);
    }
  },
  /*----
    Return a string formatted into display for a single record
    for events upcoming this week
    @Param: Airtable record
    @Returns: string (to be displayed in iterable list)
  ----*/
  setupUpcomingWeekEvent(record) {
    const r = {
      link: `https://airtable.com/${tableID}/${viewID}/${record.getId()}`,
      name: record.fields['Name'],
      date: record.fields['Date'],
      speakers: record.fields["Who's speaking?"],
      url: record.fields['Event URL'],
      submitterID: record.fields['Submitter Slack ID']
    };
    const recordString = `• <${r.url}|${r.name}> (${r.date}) | ${r.speakers} | submitted by \`<@${r.submitterID}>\` | <${r.link}|Details>`;
    return recordString;
  }
};

module.exports = at;
