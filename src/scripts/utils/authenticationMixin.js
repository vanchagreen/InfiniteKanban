var auth = require('./authLib');
var Login = require('../components/Login');


var Authentication = {
  statics: {
    willTransitionTo: function (transition) {
    	var loggedIn = auth.loggedIn();
      if (!loggedIn) {
        Login.attemptedTransition = transition;
        transition.redirect('login');
      }
    }
  }
};

module.exports = Authentication;