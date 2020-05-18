const eventName = require('./form-components/event-name');
const eventDate = require('./form-components/event-date');
const eventType = require('./form-components/event-type');
const eventUrl = require('./form-components/event-url');
const speakers = require('./form-components/speakers');
const eventRating = require('./form-components/event-rating');
const topic = require('./form-components/topic');
const reach = require('./form-components/reach');
const contentLinks = require('./form-components/content-links');
const report = require('./form-components/report');

/*------------------
BLOCKS: EVENT REPORT
------------------*/

const blocksReport = [
  eventName('r_event_name'),
  eventDate('r_event_date', 'When did the event take place?'),
  eventUrl('r_url'),
  eventType('r_event_type'),
  speakers('r_speakers', 'Who spoke at this event?'),
  topic('r_topic', 'What did you speak about?'),
  reach('r_reach'),
  contentLinks('r_content_links'),
  eventRating('r_rating'),
  report('r_report')
];

module.exports = blocksReport;