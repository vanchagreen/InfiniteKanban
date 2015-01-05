/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;

// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;

var imageURL = require('../../images/yeoman.png');

var InfiniteKanbanApp = React.createClass({
  render: function() {
    return (
      <div className='main'>
        Hello World!
      </div>
    );
  }
});

module.exports = InfiniteKanbanApp;
