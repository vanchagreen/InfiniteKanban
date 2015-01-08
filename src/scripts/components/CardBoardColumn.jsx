/** @jsx React.DOM */

var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;
var Card = require('./Card');


var CardBoardColumn = React.createClass({
  render: function () {
    var records = this.props.records;
    if (!Object.keys(records).length) { return null; }

    var state = this.props.state;
    return (
      <div>
        <p>{state}</p>
        {
          records[state.toLowerCase()] ? 
            records[state.toLowerCase()].map(function(record) {
              return (
                <Card record={record}>
                </Card>
              )
            })
          :
            null
        }
      </div>
    );
  }
});
module.exports = CardBoardColumn;
