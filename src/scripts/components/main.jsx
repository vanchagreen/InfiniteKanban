/** @jsx React.DOM */

var InfiniteKanbanApp = require('./InfiniteKanbanApp');
var React = require('react');
var {DefaultRoute, Route, Routes} = require('react-router');

React.renderComponent((
  <Routes location="history">
    <Route path="/" handler={InfiniteKanbanApp}>
    </Route>
  </Routes>
), document.getElementById('content'));
