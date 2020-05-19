const base = require('airtable').base(process.env.AIRTABLE_BASE_ID);
const table = 'Gatsby Speakers 2020';
const tableID = 'tblQWzFVnnzzHiOaM';
const viewID = 'viwFea37sBQKZ6nJN';
const publishSlackEvent = require('./../bot-response/publish-slack-event');
const publishSlackReport = require('./../bot-response/publish-slack-report');

/*------------------
      AIRTABLE
------------------*/

const dbAt = {
  link: `https://airtable.com/${tableID}/${viewID}`,
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
  async listNewEvent(app, token, data) {
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
      // @TODO: link is fine here, but cannot be accessed outside this
      // A race condition results when trying to use these results
      const savedObj = {
        id: saved,
        link: `https://airtable.com/${tableID}/${viewID}/${saved}`
      };
      console.log('Saved new event:', savedObj);
      // Share event output in designated Slack channel
      publishSlackEvent(app, token, data, savedObj);
      return savedObj;
    });
  },
  /*----
    Add post-event report
    Check if event exists already, if so, update
    If event does not exist, create new record
  ----*/
  async submitEventReport(data) {
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
        const updated = records[0];
        console.log('Updated existing event to add report:', updated.getId(), updated.fields);
        return updated.getId();
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
        const newReport = records[0];
        console.log('Saved new event with post-event report:', newReport.getId());
        return newReport.getId();
      });
    }
  }
};

module.exports = dbAt;