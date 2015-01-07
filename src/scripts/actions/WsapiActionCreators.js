var ActionSources = require('../constants/AppConstants').ActionSources;
var AppDispatcher = require('../dispatchers/AppDispatcher');
var WsapiUtils = require('../utils/WsapiUtils');

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
        return record.TypeDef ? record.TypeDef._refObjectName : null;
      });
      delete groupedStates["null"];
      AppDispatcher.handleServerAction({
        type: ActionSources.STATES_RECEIVED,
        states: groupedStates
      });
    });

  }

}  
