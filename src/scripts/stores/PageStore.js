var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var merge = require('react/lib/merge');

var PageStore = merge(EventEmitter.prototype, {

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;
  
    switch(action.type) {
      case Constants.ActionTypes.ADD_LIST_ITEM:
        console.log('hello');
        break;
    }
  })

});

module.exports = PageStore;