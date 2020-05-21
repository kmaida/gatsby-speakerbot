const base = require('airtable').base(process.env.AIRTABLE_BASE_ID);
const table = process.env.AIRTABLE_TABLE;
const tableID = process.env.AIRTABLE_TABLE_ID;
const viewID = process.env.AIRTABLE_VIEW_ID;
const publishSlackEvent = require('./../bot-response/publish/publish-slack-event');
const publishSlackReport = require('./../bot-response/publish/publish-slack-report');
const dmConfirmNew = require('./../bot-response/dm/dm-confirm-new');
const dmConfirmReport = require('./../bot-response/dm/dm-confirm-report');
const schedule = require('./../outreach/schedule-followup');
const blocksHomeNeedsReport = require('./../bot-response/blocks-home/blocks-home-needsreport');

/*------------------
      AIRTABLE
------------------*/

module.exports = {
  /*----
    Get record by ID
  ----*/
  findEvent(id) {
    base(table).find(id, function(err, record) {
      if (err) {
        console.error(err);
        return new Error(err);
      }
      return record.getId();
    });
  },

  /*----
    Add a new event to Airtable
  ----*/
  async listNewEvent(app, bc, data, body, errHandler) {
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
          "Submitter Slack ID": data.submitterID
        }
      }
    ], (err, records) => {
      if (err) {
        console.error(err);
        return new Error(err);
      }
      const saved = records[0];
      const savedObj = {
        id: saved.getId(),
        link: `https://airtable.com/${tableID}/${viewID}/${saved.getId()}`
      };
      console.log('Saved new event:', savedObj);
      // Share event output in designated Slack channel
      publishSlackEvent(app, bc.botToken, data, savedObj);
      // DM user who submitted event
      dmConfirmNew(app, bc, data, body, errHandler);
      // Set up followup
      this.setupFollowup(app, saved);
      return savedObj;
    });
  },

  /*----
    Add post-event report
    Check if event exists already, if so, update
    If event does not exist, create new record
  ----*/
  async submitEventReport(app, bc, data, body, errHandler) {
    // Check to see if report exists
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
          console.error(err);
          return new Error(err);
        }
        const updated = records[0].getId();
        console.log('Updated existing event to add report:', updated);
        const updatedObj = {
          id: updated,
          link: `https://airtable.com/${tableID}/${viewID}/${updated}`
        };
        console.log('airtable:', updatedObj);
        // Share event output in designated Slack channel
        publishSlackReport(app, bc.botToken, data, updatedObj);
        // DM user who submitted event
        dmConfirmReport(app, bc, data, body, errHandler);
        return updatedObj;
      });
    }
    // If event does not exist, create new
    else {
      base(table).create([
        {
          "fields": {
            "Name": data.event_name,
            "Submitter Slack ID": data.submitterID,
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
          console.error(err);
          return new Error(err);
        }
        const newReport = records[0].getId();
        console.log('Saved new event with post-event report:', newReport);
        const newObj = {
          id: newReport,
          link: `https://airtable.com/${tableID}/${viewID}/${newReport}`
        };
        // Share event output in designated Slack channel
        publishSlackReport(app, bc.botToken, data, newObj);
        // DM user who submitted report
        dmConfirmReport(app, bc, data, body, errHandler);
        return newObj;
      });
    }
  },

  /*----
    Get data on upcoming events to schedule user
    followups to fill out a post-event report
    (This should be called on init of the app)
  ----*/
  async getUpcomingEvents(app) {
    try {
      const results = [];
      const atData = await base(table).select({
        filterByFormula: `IS_AFTER({Date}, TODAY())`,
        view: viewID,
        fields: ["Name", "Date", "Event Type", "Topic", "Event URL", "Who's speaking?", "Submitter Slack ID"]
      }).all();
      atData.forEach((record) => {
        const resObj = this.setupFollowup(app, record);
        results.push(resObj);
      });
      return results;
    }
    catch (err) {
      console.error(err);
    }
  },

  /*----
    Set up followup by forming a followup object
    Passing object to schedule.followup() service
  ----*/
  setupFollowup(app, record) {
    // Build followup object with necessary data to schedule followup
    const eventtime = new Date(record.fields['Date']).getTime();
    const hourDelay = (1000 * 60 * 60) * 40;  // Next day at 11/12 Eastern, depending on DST
    const followupAt = eventtime + hourDelay;
    const recordObj = {
      id: record.getId(),
      event_name: record.fields['Name'],
      event_date: record.fields['Date'],
      datetime: new Date(record.fields['Date']).getTime(),
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
  },

  /*----
    Get data on recently past events for a
    specific user that don't have a report yet
    (Display in a user's app home)
    @Returns: blocks for user's app home
  ----*/
  async getPastEventsNeedReport(userID) {
    try {
      const results = [];
      const atData = await base(table).select({
        filterByFormula: `AND({Event Rating} = BLANK(), {Submitter Slack ID} = "${userID}", IS_BEFORE({Date}, TODAY()))`,
        view: viewID,
        fields: ["Name", "Date", "Event Type", "Topic", "Event URL", "Who's speaking?", "Submitter Slack ID"]
      }).all();
      atData.forEach((record) => {
        const resObj = this.setupNeedsReportByUser(record);
        results.push(resObj);
      });
      console.log(`${userID}'s past events that need a report:`, results);
      return blocksHomeNeedsReport(results);
    }
    catch (err) {
      console.error(err);
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
  }
};
