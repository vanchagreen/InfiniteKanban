/** @jsx React.DOM */


var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var Card = React.createClass({
  render: function () {
    var record = this.props.record;

    return (
      <div className="panel panel-info card" draggable="true" id="draggable sortable widget">
        <div className="panel-heading"></div>
        <div className="panel-body">
          <div className="row">
            <ul className="col-md-12 list-inline work-item-id-container">
              <li className="work-item-id">
                <Link to={'/' + (record.PortfolioItemTypeName || 'schedulableartifact') + '/' + record.ObjectID}>{record.FormattedID}</Link>:
                {" " + record.Name}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );

  }
});

module.exports = Card;