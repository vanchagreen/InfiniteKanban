var keyMirror = require('react/lib/keyMirror');

module.exports = {

  CHANGE_EVENT: 'change',

  ActionTypes: keyMirror({
    ADD_LIST_ITEM: 'ADD_LIST_ITEM'
  }),

  ActionSources: keyMirror({
    TYPES_RECEIVED: 'TYPES_RECEIVED'
  })

};