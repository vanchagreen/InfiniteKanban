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

  loadRecords: function(urlParams, currentType) {
    var wsapiTypePath = urlParams.type ? TypeStore.convertTypePathForWsapi(urlParams.type) : TypeStore.getTypes()[0].TypePath;
    var ordinalValue =  urlParams.type ? TypeStore.getOrdinalValue(urlParams.type) :  TypeStore.getTypes()[0].Ordinal;
    var artifactTypes, query;

    wsapiTypePath = wsapiTypePath || 'artifact;'
    if(urlParams.oid){
      if(ordinalValue > 0){
        wsapiTypePath = wsapiTypePath + '/' + urlParams.oid + '/Children'; 
      }
      else{
        artifactTypes = ['hierarchicalrequirement','defect', 'task','testcase'];
        wsapiTypePath = 'artifact';
        query = ordinalValue === 0 ? '((Feature.ObjectID = ' + urlParams.oid + ' ) OR ' : 
            '(Parent.ObjectID = ' + urlParams.oid + ' ) OR ' + 
            '(Requirement.ObjectID = ' + urlParams.oid + ' ) OR ' +
            '(WorkProduct.ObjectID = ' + urlParams.oid + ' ))'; 
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
        if (currentType === 'schedulableartifact')
          return record.ScheduleState ? record.ScheduleState.toLowerCase() : 'NoEntry';
        return record.State ? record.State._refObjectName.toLowerCase() : 'NoEntry';
      });
      AppDispatcher.handleServerAction({
        type: ActionSources.RECORDS_RECEIVED,
        records: groupedRecords
      });
    });
  },

  loadScheduleStates: function() {
    WsapiUtils.getRecords({typeName: 'TypeDefinition'}).done(function(result) {
      var ref = _.find(result.records, function(record) {return record._refObjectName === "Hierarchical Requirement"})._ref;
      WsapiUtils.getJson(WsapiUtils.getWsapiURL(ref), {pagesize: 200}).done(function(result) {
        WsapiUtils.getJson(result.TypeDefinition.Attributes._ref, {pagesize: 200}).done(function(result) {
          var url = _.find(result.QueryResult.Results, function(record) {return record.Name === "Schedule State"})._ref;
          WsapiUtils.getJson(url, {pagesize: 200}).done(function(result) {
            WsapiUtils.getJson(result.AttributeDefinition.AllowedValues._ref, {pagesize: 200}).done(function(result) {
              var scheduleStates = _.pluck(result.QueryResult.Results, 'StringValue');
              AppDispatcher.handleServerAction({
                type: ActionSources.SCHEDULE_STATES_RECEIVED,
                scheduleStates: scheduleStates
              });
            });
          });
        });
      });
    });
  }

}  
