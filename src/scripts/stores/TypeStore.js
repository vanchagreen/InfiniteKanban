var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/AppConstants');
var merge = require('react/lib/merge');
var _ = require('lodash');
var WsapiActionCreators = require('../actions/WsapiActionCreators');

var _types = {};

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

  _setTypes: function(types){
    _types = types;
    //_types = _.zipObject(_.pluck(types, 'Name').map(function(str){return str.toLowerCase()}), types);
  },

  getTypes: function(route) {
    return _types;
  },

  getCurrentTypePath: function(urlPath){
    if (!urlPath && _types[0]){
      return _types[0].TypePath;
    }
    var correctType = _.find(_types, function(type){
      return type.Name.toLowerCase() === urlPath.toLowerCase();
    });
    return correctType.TypePath;
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.type) {
      case Constants.ActionSources.TYPES_RECEIVED:
        TypeStore._setTypes(action.typeDefinitions.records);
        TypeStore.emitChange();
        break;
    }
  })

});

module.exports = TypeStore;