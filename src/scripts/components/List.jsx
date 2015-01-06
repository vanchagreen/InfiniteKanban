/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var ListGroup = require('react-bootstrap/ListGroup');
var ListGroupItem = require('react-bootstrap/ListGroupItem');
var DropdownButton = require('react-bootstrap/DropdownButton');
var MenuItem = require('react-bootstrap/MenuItem');
var Input = require('react-bootstrap/Input');

var InfiniteKanbanApp = React.createClass({
  propTypes: {
    onListAdd: React.PropTypes.func.isRequired
  },

  render: function() {
    var buttonAfter = (
      <DropdownButton title="Action">
        <MenuItem key="1">Item</MenuItem>
      </DropdownButton>
    );
    return (
      <ListGroup>
        <ListGroupItem>Item 1</ListGroupItem>
        <ListGroupItem>Item 2</ListGroupItem>
        <ListGroupItem>
          <form onSubmit={this.props.onListAdd}>
            <Input type="text" buttonAfter={buttonAfter} />
          </form>
        </ListGroupItem>
      </ListGroup>
  );
  }
});

module.exports = InfiniteKanbanApp;
