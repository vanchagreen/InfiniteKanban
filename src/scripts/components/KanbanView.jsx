/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');

var TypeStore = require('../stores/TypeStore');
var StateStore = require('../stores/StateStore');
var WsapiActionCreators = require('../actions/WsapiActionCreators');

var authenticationMixin = require('../utils/authenticationMixin');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var wsapi = require('../utils/WsapiUtils');

var KanbanView = React.createClass({
  mixins: [authenticationMixin, Router.State],

  getInitialState: function() {
    return {
      types: TypeStore.getTypes(),
      states: StateStore.getStates()
    };
  },

  _onChange: function() {
    this.setState({
      types: TypeStore.getTypes(),
      states: StateStore.getStates(),
    });
  },

  componentWillMount: function(){
    TypeStore.addChangeListener(this._onChange);
    WsapiActionCreators.loadTypes();

    StateStore.addChangeListener(this._onChange);
    WsapiActionCreators.loadStates();
  },

  render: function() {
    var type = this.getParams().splat;
    var featureStates = _.pluck(this.state.states[type], 'Name').join(" | ");

    return (
      <code> state: {featureStates} </code>
    );
  }
});

module.exports = KanbanView;