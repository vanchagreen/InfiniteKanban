var Auth = {
  login: function(apiKey, cb) {
    localStorage.apiKey = apiKey;
  },
  getAPIKey: function() {
    return localStorage.apiKey;
  },
  loggedIn: function() {
    return !!localStorage.apiKey;
  }
}

module.exports = Auth;