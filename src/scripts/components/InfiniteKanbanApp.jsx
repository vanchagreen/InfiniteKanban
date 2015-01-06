/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var Jumbotron = require('react-bootstrap/Jumbotron');
var Button = require('react-bootstrap/Button');
var Grid = require('react-bootstrap/Grid');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');



var List = require('./List');


// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;

var imageURL = require('../../images/yeoman.png');

var InfiniteKanbanApp = React.createClass({
  handleListAdd: function(e){
    debugger;
  },

  render: function() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col lg={6}>
            <List onListAdd={this.handleListAdd}></List>
          </Col>
        </Row>
      </Grid>
    );
  }
});

module.exports = InfiniteKanbanApp;
