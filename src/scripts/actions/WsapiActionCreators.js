// var ActionTypes = require('../constants/AppConstants').ActionTypes;
// var AppDispatcher = require('../dispatchers/AppDispatcher');
// var WsapiUtils = require('../utils/WsapiUtils');
// var PreferenceStore = require('../stores/PreferenceStore');
// var ParentChildMapper = require('../utils/ParentChildMapper');
// var ScopeStore = require('../stores/ScopeStore');
// var RecordStore = require('../stores/RecordStore');
// var SchemaStore = require('../stores/SchemaStore');
// var _ = require('lodash');

// module.exports = {
//   loadSchema: function() {
//     var opts = { project: ScopeStore.getProject() };
//     WsapiUtils.getSchema(opts).done(function(typeDefs){
//       AppDispatcher.dispatch({
//         type: ActionTypes.SCHEMA_LOADED,
//         typeDefs: typeDefs
//       }); 
//     });
//   },

//   loadRecords: function(options) {
//     var opts = _.merge({
//           fields: _.union(PreferenceStore.getFields(), ParentChildMapper.getChildFields(RecordStore.getTypeName()), ['State', 'DisplayColor']),
//           workspace: ScopeStore.getWorkspace(),
//           project: ScopeStore.getProject(),
//           pageSize: PreferenceStore.isGrid() ? RecordStore.getPageSize() : 200,
//           typeName: RecordStore.getTypeName()
//       }, options);

//     WsapiUtils.getRecords(opts).done(function(recordResults){
//       AppDispatcher.dispatch(_.merge({
//         type: ActionTypes.RECORDS_LOADED
//       }, recordResults));
//     });
//   },

//   loadPreferences: function(options) {  
//     WsapiUtils.getPreferences(options).done(function(preferences) {
//       AppDispatcher.dispatch({
//         type: ActionTypes.PREFERENCES_LOADED,
//         preferences: preferences
//       });
//     });
//   },

//   pageSizeChange: function (pageSize) {
//         this.loadRecords({pageSize: pageSize});
//     },

//     loadBoardColumns: function(options) {
//         var opts = {
//             fields: ['Name', 'WIPLimit', 'Description'],
//             workspace: ScopeStore.getWorkspace(),
//             project: ScopeStore.getProject(),
//             typeName: 'State',
//             query: '((TypeDef = ' + SchemaStore.getTypeRef(options.typeName) + ') AND (Enabled = true))'
//         };

//         WsapiUtils.getRecords(opts).then(function(recordResults) {
//             AppDispatcher.dispatch({
//                 type: ActionTypes.BOARD_COLUMNS_LOADED,
//                 columns: recordResults.records
//             });
//         });
//     }
// };


//   handleListAdd: function(e){
//     e.preventDefault();
//     var opts = {
//       fields: [],
//       typeName: 'TypeDefinition',
//       pageSize: 200,
//       order: 'Ordinal Desc,ObjectID',
//       query: '((Parent.Name = "Portfolio Item") AND (Creatable = "true"))',
//     }
//     WsapiUtils.getRecords(opts).done(function(recordResults){
//       debugger;
//     });