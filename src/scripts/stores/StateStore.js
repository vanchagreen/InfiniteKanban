var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var merge = require('react/lib/merge');

var _states = {};

var StateStore = merge(EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(Constants.CHANGE_EVENT, callback);
  },

  emitChange: function() {
    this.emit(Constants.CHANGE_EVENT);
  },
  
  getStates: function() {
    return _states;
  },

  getStatesForType: function(type) {
    return _states[type.toLowerCase()];
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {
      case Constants.ActionSources.STATES_RECEIVED:
        _states = action.states;
        StateStore.emitChange();
        break;
      case Constants.ActionSources.SCHEDULE_STATES_RECEIVED:
        _states["schedulableartifact"] = action.scheduleStates;
        StateStore.emitChange();
    }
  })

});

module.exports = StateStore;