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
const schedule = require('./../schedule/schedule-followup');
const blocksHomeNeedsReport = require('./../bot-response/blocks-home/blocks-home-needsreport');
const blocksUserEvents = require('./../bot-response/blocks-home/blocks-home-user-events');
const triggerHomeViewUpdate = require('./../triggers/trigger-home-view-update');

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
  async listNewEvent(app, bc, data, homeParams = {}) {
    const editID = homeParams.eventID;
    // Check to see if updating an existing event
    if (editID) {
      // Retrieve existing record
      base(table).find(editID, function (err, origRecord) {
        if (err) {
          sendErr(err);
        }
        if (origRecord) {
          // Update existing record
          base(table).update([
            {
              "id": editID,
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
            const originalDate = origRecord.fields['Date'];
            const updatedRecord = records[0];
            const updatedID = updatedRecord.getId();  // Same as editID
            console.log('Edited existing upcoming event:', updatedID);
            const updatedObj = {
              id: updatedID,
              link: `https://airtable.com/${tableID}/${viewID}/${updatedID}`
            };
            // If the date has been changed for an event, re-schedule followup
            if (originalDate !== data.event_date) {
              console.log('Edited date for an existing upcoming event: followup needs to be updated');
              // Reschedule only the updated event
              schedule.setupFollowup(app, updatedRecord);
            }
            // Share event output in designated Slack channel
            publishSlackEvent(app, data, updatedObj, true);
            // DM user who submitted event
            dmConfirmNew(app, bc, data, true);
            // Update the home view (if applicable)
            if (homeParams.viewID) {
              try {
                triggerHomeViewUpdate(app, homeParams, at);
              }
              catch (err) {
                errSlack(app, homeParams.userID, err);
              }
            }
            // RETURN
            return updatedObj;
          });
        }
      });
    }
    // No edit ID passed, add a new upcoming event record
    else {
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
        const savedID = saved.getId();
        const savedObj = {
          id: savedID,
          link: `https://airtable.com/${tableID}/${viewID}/${savedID}`
        };
        console.log('Saved new event:', savedObj);
        // Share event output in designated Slack channel
        publishSlackEvent(app, data, savedObj);
        // DM user who submitted event
        dmConfirmNew(app, bc, data);
        // Set up followup
        schedule.setupFollowup(app, saved);
        return savedObj;
      });
    }
  },

  /*----
    Add post-event report
    Check if event exists already, if so, update
    If event does not exist, create new record
  ----*/
  async submitEventReport(app, bc, data, homeParams = {}) {
    let editID = homeParams.eventID;
    const editReport = homeParams.editReport;
    // Check to see if report exists
    if (!editID) {
      // If no editID was passed as a parameter, search for a matching event
      // that does not have a report already (any direct edited event will have an ID)
      // Search for events that match name OR date AND type AND Slack ID AND have no rating
      search = await base(table).select({
        filterByFormula: `AND(OR({Name} = "${data.event_name}", IS_SAME({Date}, "${data.event_date}")), {Event Type} = "${data.event_type}", {Submitter Slack ID} = "${data.submitterID}", {Event Rating} = BLANK())`,
        maxRecords: 1
      }).all();
      // If a matching event is found, store its ID to update this report
      editID = search.length ? search[0].getId() : undefined;
    }
    // If we're editing an existing event listing to either modify a report
    // or add a new report to an existing event listing:
    if (editID) {
      // Update existing event entry
      base(table).update([
        {
          "id": editID,
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
      ], function (err, records) {
        if (err) {
          sendErr(err);
        }
        const updatedID = records[0].getId();
        console.log(!editReport ? 'Updated existing event to add report:' : 'Updated existing report', updatedID);
        const updatedObj = {
          id: updatedID,
          link: `https://airtable.com/${tableID}/${viewID}/${updatedID}`
        };
        // Share event output in designated Slack channel
        publishSlackReport(app, data, updatedObj, editReport);
        // DM user who submitted event
        dmConfirmReport(app, bc, data, editReport);
        // Update the home view (if applicable)
        if (homeParams.viewID) {
          try {
            triggerHomeViewUpdate(app, homeParams, at);
          }
          catch (err) {
            errSlack(app, homeParams.userID, err);
          }
        }
        // RETURN
        return updatedObj;
      });
    }
    // If report does not exist, create new
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
        const resObj = schedule.setupFollowup(app, record);
        results.push(resObj);
      });
      return results;
    }
    catch (err) {
      sendErr(err);
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
