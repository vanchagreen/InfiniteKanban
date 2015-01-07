/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');

var TypeStore = require('../stores/TypeStore');
var WsapiActionCreators = require('../actions/WsapiActionCreators');

var authenticationMixin = require('../utils/authenticationMixin');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var wsapi = require('../utils/WsapiUtils');

var KanbanView = React.createClass({
  mixins: [authenticationMixin, Router.State],

  getInitialState: function() {
    return {
      types: TypeStore.getTypes()
    };
  },

  _onChange: function() {
    this.setState({
      types: TypeStore.getTypes()
    });
  },

  componentWillMount: function(){
    TypeStore.addChangeListener(this._onChange);
    WsapiActionCreators.loadTypes();
  },

  render: function() {
    var type = this.getParams().splat;

    statePromise = wsapi.getRecords({
      typeName: 'State',
      order: 'OrderIndex ASC',
      fetch: true
    });
    statePromise.done(function(result) {
      debugger;
    });

    return (
      <h1> type: {type} </h1>
    );
  }
});

module.exports = KanbanView;