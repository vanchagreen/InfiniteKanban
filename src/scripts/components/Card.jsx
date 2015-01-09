/** @jsx React.DOM */


var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var Card = React.createClass({
	render: function () {
		var record = this.props.record;
		return (
			<div>
				<Link to={'/' + (record.PortfolioItemTypeName || 'schedulableartifact') + '/' + record.ObjectID}>{record.Name}</Link>
			</div>
		);
	}
});

module.exports = Card;
