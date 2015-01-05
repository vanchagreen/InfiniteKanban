/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var Jumbotron = require('react-bootstrap/Jumbotron');
var Button = require('react-bootstrap/Button');

debugger;

// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;

var imageURL = require('../../images/yeoman.png');

var InfiniteKanbanApp = React.createClass({
  render: function() {
    return (
      <Jumbotron>
        <h1>Hello, world!</h1>
        <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        <p><Button bsStyle="primary">Learn more</Button></p>
      </Jumbotron>
  );
  }
});

module.exports = InfiniteKanbanApp;
