/** @jsx React.DOM */

var InfiniteKanbanApp = require('./InfiniteKanbanApp');
var Login = require('./Login');
var React = require('react');
var Router = require('react-router');

var wsapi = require('../utils/WsapiUtils');

var authenticationMixin = require('../utils/authenticationMixin');
var { Route, DefaultRoute, RouteHandler, Link } = Router;
var KanbanView = require('./KanbanView')


var routes = (

  <Route path="/" handler={InfiniteKanbanApp}>
      <Route name="login" path="/login" handler={Login} />
      <Route name="kanban" path="/:type/*?" handler={KanbanView} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});