/** @jsx React.DOM */

var InfiniteKanbanApp = require('./InfiniteKanbanApp');
var Login = require('./Login');
var React = require('react');
var Router = require('react-router');
var authenticationMixin = require('../utils/authenticationMixin');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var highestLevel = React.createClass({
  mixins: [authenticationMixin],
  render: function() {
    return (
      <h1> foo </h1>
    );
  }
});

var routes = (

  <Route path="/" handler={InfiniteKanbanApp}>
      <Route name="login" path="/login" handler={Login} />
      <DefaultRoute handler={highestLevel} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});