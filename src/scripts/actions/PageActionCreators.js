var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');
var DataStore = require('../stores/PairStore');

module.exports = {
  addListItem: function(list, listItem) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.ADD_LIST_ITEM,
      list: list,
      listItem: listItem
    });
  },
};