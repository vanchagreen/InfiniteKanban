/** @jsx React.DOM */
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;
var Grid = require('react-bootstrap/Grid');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');
var CardBoardColumn = require('./CardBoardColumn');


var CardBoard = React.createClass({
  render: function () {
    var states = this.props.states;
    var records = this.props.records;
    var columns = states.map(function(state) {
      return (
        <td>
          <CardBoardColumn records={records} state={state}>
          </CardBoardColumn>
        </td>
      );
    });

    var columnHeaders = states.map(function(state) {
      var tehClass = 'col-md-' + Math.floor(12 / states.length) + ' text-center';
      return (
        <th className={tehClass}> {state} </th>
        );
    });

    return (
      <div className="kanban-board">
        <table className="table table-responsive">
          <thead>
            <tr>
              {columnHeaders}
            </tr>
          </thead>
          <tbody>
            <tr>
              {columns}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
});

module.exports = CardBoard;
