const base = require('airtable').base(process.env.AIRTABLE_BASE_ID);
const table = 'Gatsby Speakers 2020';

/*------------------
      AIRTABLE
------------------*/

const dbAt = {
  /*----
    Get ID for an existing event by comparing event name, type, submitter ID
    (if the event exists)
    @Returns string
  ----*/
  findEventID(data) {
    base(table).select({
      filterByFormula: `AND({Name} = "${data.event_name}", {Event Type} = "${data.event_type}", {Submitter Slack ID} = "${data.submitterID}")`,
      maxRecords: 1
    }).eachPage(function page(records, fetchNextPage) {
      if (records.length === 1) {
        const record = records[0];
        console.log('Found a matching record:', record.getId());
        return record.getId();
      } else if (records.length > 1) {
        const recordsArr = [];
        records.forEach(record => {
          console.log(record.getId());
          recordsArr.push(record.getId());
        });
        console.log('Multiple records matched', recordsArr);
        return recordsArr;
      } else {
        console.log('No record found');
        return null;
      }
    }, function done(error) {
      if (error) console.error(error);
    });
  },
  /*----
    Add a new event to Airtable
  ----*/
  listNewEvent(data) {
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
      console.log('Saved new event:', saved.getId(), saved.fields);
      return saved.getId();
    });
  },
  /*----
    Submit event report
    If a correlated event exists, update it
    If the event doesn't already exist, create new report
  ----*/
  addEventReport(data) {
    const existingRecordId = this.findEventID(data);
    if (existingRecordId) {
      base(table).update([
        {
          "id": existingRecordId,
          "Date": data.event_date,
          "Event URL": data.url,
          "Topic": data.topic,
          "Est. Reach": data.reach,
          "Content Links": data.content_links,
          "Event Rating": data.rating,
          "Post Event Report": data.report,
          "Submitter Slack ID": data.submitterID
        }
      ], function(err, records) {
        if (err) {
          console.error(err);
          return new Error(err);
        }
        const updated = records[0];
        console.log('Updated existing event to add report:', updated.getId(), updated.fields);
        return updated.getId();
      });
    } else {
      base(table).create([
        {
          "fields": {
            "Name": data.event_name,
            "Submitter Slack ID": data.submitterID,
            "Date": data.event_date,
            "Event Type": data.event_type,
            "Event URL": data.url,
            "Who's speaking?": `Slack ID ${data.submitterID} (post-event report)`,
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
        const saved = records[0];
        console.log('Saved new event with post-event report:', saved.getId(), saved.fields);
        return saved.getId();
      });
    }
  }
};

module.exports = dbAt;