const eventName = require('./form-components/event-name');
const eventDate = require('./form-components/event-date');
const eventType = require('./form-components/event-type');
const eventUrl = require('./form-components/event-url');
const eventLocation = require('./form-components/event-location');
const speakers = require('./form-components/speakers');
const topic = require('./form-components/topic');
const notes = require('./form-components/notes');

/*------------------
 BLOCKS: LIST EVENT
------------------*/

const blocksListEvent = [
  eventName('a_event_name'),
  eventDate('a_event_date'),
  eventLocation('a_location'),
  eventUrl('a_url'),
  speakers('a_speakers'),
  eventType('a_event_type'),
  topic('a_topic'),
  notes('a_notes')
];

module.exports = blocksListEvent;