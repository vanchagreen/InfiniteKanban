/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');

var TypeStore = require('../stores/TypeStore');
var StateStore = require('../stores/StateStore');
var RecordStore = require('../stores/RecordStore');

var WsapiActionCreators = require('../actions/WsapiActionCreators');

var authenticationMixin = require('../utils/authenticationMixin');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var wsapi = require('../utils/WsapiUtils');

var KanbanView = React.createClass({
  mixins: [authenticationMixin, Router.State],

  componentWillReceiveProps: function () {
    if (!_.isEqual(this._prevParams, this.getParams())) {
      this._prevParams = _.clone(this.getParams())
      this.setState({
        currentTypePath: TypeStore.getCurrentTypePath(this.getParams().type)
      });
    }
    WsapiActionCreators.loadRecords(this.state.currentTypePath);
  },

  getInitialState: function() {
    return {
      types: TypeStore.getTypes(),
      states: StateStore.getStates()
    };
  },

  _onTypeChange: function() {
    this.setState({
      currentTypePath: TypeStore.getCurrentTypePath(this.getParams().type),
      types: TypeStore.getTypes(),
    });

    WsapiActionCreators.loadRecords(this.state.currentTypePath, this.getParams().oid);
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
    var type = this.getParams()
    return (
      <div>
        <h1> URL: {type} </h1>
        <p>types: {this.state.types}</p>
        <p>states: {this.state.states}</p>
        <p>currentTypePath: {this.state.currentTypePath}</p>
        <p>records: {this.state.records}</p>
      </div>
    );
  }
});

module.exports = KanbanView;