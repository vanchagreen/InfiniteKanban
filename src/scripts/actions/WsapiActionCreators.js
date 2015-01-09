var ActionSources = require('../constants/AppConstants').ActionSources;
var AppDispatcher = require('../dispatchers/AppDispatcher');
var WsapiUtils = require('../utils/WsapiUtils');
var TypeStore = require('../stores/TypeStore');
var ParentChildMapper = require('../utils/ParentChildMapper');

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
    var wsapiTypePath = urlParams.type ? TypeStore.convertTypePathForWsapi(urlParams.type) : TypeStore.getTypes()[0].TypePath ;
    debugger;
    var ordinalValue =  urlParams.type ? TypeStore.getOrdinalValue(urlParams.type) :  TypeStore.getTypes()[0].Ordinal;
    var artifactTypes, query;

    if(urlParams.oid){
      if(ordinalValue > 0){
        wsapiTypePath = wsapiTypePath + '/' + urlParams.oid + '/Children'; 
      }
      else{
        artifactTypes = ParentChildMapper.getChildTypes(wsapiTypePath);
        wsapiTypePath = 'artifact';
        query = ordinalValue === 0 ? '(Feature.ObjectID = ' + urlParams.oid + ' )' : '(Parent.ObjectID = ' + urlParams.oid + ' )'
      }
    }

    var opts = {
      typeName: wsapiTypePath,
      fetch: true,
      types: artifactTypes,
      query: query
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
