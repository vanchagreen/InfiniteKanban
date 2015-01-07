/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

(window !== window.top ? window.top : window).React = React;

var Login = React.createClass({

  statics: {
    attemptedTransition: null
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var apiKey = this.refs.apiKey.getDOMNode().value;
    localStorage.apiKey = apiKey;

    if (Login.attemptedTransition) {
        var transition = Login.attemptedTransition;
        Login.attemptedTransition = null;
        transition.retry();
      } else {
        this.replaceWith('kanban');
    }

  },

  render: function () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label><input ref="apiKey" placeholder="apiKey" defaultValue="_12345"/></label>
        <button type="submit">login</button>
      </form>
    );
  }

});

module.exports = Login;
