/*------------------
BUTTON: SYNC EVENTS
Sync scheduling and
home views with Airtable
------------------*/

const btnSyncEvents = () => {
  return {
    "type": "button",
    "text": {
      "type": "plain_text",
      "text": "Sync All Events"
    },
    "action_id": "btn_sync_events"
  };
}

module.exports = btnSyncEvents;
