var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var merge = require('react/lib/merge');

var _records = {};

var RecordStore = merge(EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.on(Constants.CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(Constants.CHANGE_EVENT, callback);
  },

  emitChange: function() {
    this.emit(Constants.CHANGE_EVENT);
  },

  getRecordByProperty: function(property, value){
    debugger;
    return _.find(_records, function(records){
      return _.find(records, function(record){
        var a = record[property] + '';
        var b = value  + '';

        return a.toLowerCase() === b.toLowerCase();
      });
    });
  },

  getRecords: function() {
    return _records;
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {
      case Constants.ActionSources.RECORDS_RECEIVED:
        _records = action.records;
        RecordStore.emitChange();
        break;
    }
  })

});

module.exports = RecordStore;