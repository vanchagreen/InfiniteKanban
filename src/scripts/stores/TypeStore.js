var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var merge = require('react/lib/merge');

var _types = [];

var TypeStore = merge(EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(Constants.CHANGE_EVENT, callback);
  },

  emitChange: function() {
    this.emit(Constants.CHANGE_EVENT);
  },
  
  getTypes: function() {
    return _types;
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {
      case Constants.ActionSources.TYPES_RECEIVED:
        _types = action.typeDefinitions.records;
        TypeStore.emitChange();
        break;
    }
  })

});

module.exports = TypeStore;