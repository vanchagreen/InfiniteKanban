var keyMirror = require('react/lib/keyMirror');

module.exports = {

  CHANGE_EVENT: 'change',

  ActionTypes: keyMirror({
    ADD_LIST_ITEM: 'ADD_LIST_ITEM'
  }),

  ActionSources: keyMirror({
    TYPES_RECEIVED: 'TYPES_RECEIVED',
    STATES_RECEIVED: 'STATES_RECEIVED',
    RECORDS_RECEIVED: 'RECORDS_RECEIVED',
    SCHEDULE_STATES_RECEIVED: 'SCHEDULE_STATES_RECEIVED'
  })





};