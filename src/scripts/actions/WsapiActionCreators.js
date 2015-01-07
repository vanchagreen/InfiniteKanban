var ActionSources = require('../constants/AppConstants').ActionSources;
var AppDispatcher = require('../dispatchers/AppDispatcher');
var WsapiUtils = require('../utils/WsapiUtils');

module.exports = {
  loadTypes: function() {
    var opts = {
      fields: [],
      typeName: 'TypeDefinition',
      pageSize: 200,
      order: 'Ordinal Desc,ObjectID',
      query: '((Parent.Name = "Portfolio Item") AND (Creatable = "true"))',
    };
    
    WsapiUtils.getRecords(opts).done(function(types){
      AppDispatcher.handleServerAction({
        type: ActionSources.TYPES_RECEIVED,
        typeDefinitions: types
      });
    });

  }
}  
