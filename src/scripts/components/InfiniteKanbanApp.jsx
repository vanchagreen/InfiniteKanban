/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Authentication = require('./Authentication');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;


// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;

var InfiniteKanbanApp = React.createClass({
  render: function() {
    return (
      <RouteHandler/>
    )
  }
});

module.exports = InfiniteKanbanApp;
