/** @jsx React.DOM */

var InfiniteKanbanApp = require('./InfiniteKanbanApp');
var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var routes = (
  <Route handler={InfiniteKanbanApp}>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});