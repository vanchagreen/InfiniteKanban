/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var _ = require('lodash');

var TypeStore = require('../stores/TypeStore');
var StateStore = require('../stores/StateStore');
var RecordStore = require('../stores/RecordStore');

var WsapiActionCreators = require('../actions/WsapiActionCreators');

var authenticationMixin = require('../utils/authenticationMixin');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var ParentChildMapper = require('../utils/ParentChildMapper');

var CardBoard = require('./CardBoard');


var KanbanView = React.createClass({
  mixins: [authenticationMixin, Router.State],

  componentWillReceiveProps: function () {
    if (!_.isEqual(this._prevParams, this.getParams())) {
      this._prevParams = _.clone(this.getParams());
    }
    var currentType = this._getCurrentType(TypeStore.getTypes());
    this.setState({
      currentType: currentType
    });
    WsapiActionCreators.loadRecords(this.getParams());
  },

  getInitialState: function() {
    return {
      types: TypeStore.getTypes(),
      states: StateStore.getStates(),
      records: RecordStore.getRecords()
    };
  },

  _getCurrentType: function(typeDefs) {
    if (!typeDefs.length) return null;

    if(this.getParams().type === undefined){
      return typeDefs[0].Name.toLowerCase();
    }

    var type = this.getParams().type.toLowerCase();
    var oid = this.getParams().oid;

    if (oid === undefined) return type;

    var ret = typeDefs[1 + _.findIndex(typeDefs, function(typeDef) {
      return typeDef.Name.toLowerCase() === type.toLowerCase();
    })];

    return ret && ret.Name.toLowerCase();
  },

  _onTypeChange: function() {
    this.setState({
      types: TypeStore.getTypes(),
      currentType: this._getCurrentType(TypeStore.getTypes())
    });

    WsapiActionCreators.loadRecords(this.getParams());
  },

  _onStateChange: function() {
    this.setState({
      states: StateStore.getStates()
    });
  },

  _onRecordChange: function() {
    this.setState({
      records: RecordStore.getRecords()
    })
  },

  componentWillMount: function(){
    TypeStore.addChangeListener(this._onTypeChange);
    WsapiActionCreators.loadTypes();

    StateStore.addChangeListener(this._onStateChange);
    WsapiActionCreators.loadStates();

    RecordStore.addChangeListener(this._onRecordChange);
  },

  render: function() {
    if (this.state.currentType && this.state.states[this.state.currentType]) {
        return (
          <CardBoard states={this.state.states[this.state.currentType]} records={this.state.records}>
          </CardBoard>
        );
    }
    return <p>Nothing to see here folks</p>;
  }
});

module.exports = KanbanView;