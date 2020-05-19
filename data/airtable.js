const base = require('airtable').base(process.env.AIRTABLE_BASE_ID);
const table = 'Gatsby Speakers 2020';
const tableID = 'tblQWzFVnnzzHiOaM';
const viewID = 'viwFea37sBQKZ6nJN';
const publishSlackEvent = require('./../bot-response/publish-slack-event');
const publishSlackReport = require('./../bot-response/publish-slack-report');
const dmConfirmNew = require('./../bot-response/dm/dm-confirm-new');
const dmConfirmReport = require('./../bot-response/dm/dm-confirm-report');

/*------------------
      AIRTABLE
------------------*/

module.exports = {
  linkBase: `https://airtable.com/${tableID}/${viewID}`,
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
      const saved = records[0].getId();
      const savedObj = {
        id: saved,
        link: `${this.linkBase}/${saved}`
      };
      console.log('Saved new event:', savedObj);
      // Share event output in designated Slack channel
      publishSlackEvent(app, bc.botToken, data, savedObj);
      // DM user who submitted event
      dmConfirmNew(app, bc, data, body, errHandler);
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
          id: updated.getId(),
          link: `${this.linkBase}/${updated}`
        };
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
          link: `${this.linkBase}/${newReport}`
        };
        // Share event output in designated Slack channel
        publishSlackReport(app, bc.botToken, data, newObj);
        // DM user who submitted report
        dmConfirmReport(app, bc, data, body, errHandler);
        return newObj;
      });
    }
  }
};