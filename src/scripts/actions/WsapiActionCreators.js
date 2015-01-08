var ActionSources = require('../constants/AppConstants').ActionSources;
var AppDispatcher = require('../dispatchers/AppDispatcher');
var WsapiUtils = require('../utils/WsapiUtils');
var TypeStore = require('../stores/TypeStore');

module.exports = {
  loadTypes: function() {
    var opts = {
      typeName: 'TypeDefinition',
      pageSize: 200,
      order: 'Ordinal Desc,ObjectID',
      query: '((Parent.Name = "Portfolio Item") AND (Creatable = "true"))',
      fetch: true
    };
    
    WsapiUtils.getRecords(opts).done(function(types){
      AppDispatcher.handleServerAction({
        type: ActionSources.TYPES_RECEIVED,
        typeDefinitions: types
      });
    });
  },

  loadStates: function() {
    var opts = {
      typeName: 'State',
      fetch: true,
      order: 'OrderIndex ASC'
    }

    WsapiUtils.getRecords(opts).done(function(result) {
      var groupedStates = _.groupBy(result.records, function(record) {
        return record.TypeDef ? record.TypeDef._refObjectName.toLowerCase() : null;
      });
      delete groupedStates["null"];

      var transformedStates = _.transform(groupedStates, function(result, states, key) {
        result[key] = _.transform(states, function(result, state) {
          result.push(state.Name);
        })
      });

      AppDispatcher.handleServerAction({
        type: ActionSources.STATES_RECEIVED,
        states: transformedStates
      });
    });

  },

  loadRecords: function(urlParams) {
    var wsapiTypePath = TypeStore.convertTypePathForWsapi(urlParams.type);
    var typeName = urlParams.oid === undefined ? wsapiTypePath : wsapiTypePath + '/' + urlParams.oid + '/Children'; 
    var opts = {
      typeName: typeName,
      fetch: true
    };
    WsapiUtils.getRecords(opts).done(function(result) {
      var groupedRecords = _.groupBy(result.records, function(record) {
        return record.State ? record.State._refObjectName.toLowerCase() : 'NoEntry';
      });
      AppDispatcher.handleServerAction({
        type: ActionSources.RECORDS_RECEIVED,
        records: groupedRecords
      });
    });

  }

}  
