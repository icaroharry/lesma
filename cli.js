var Twitter = require('twitter');
var config = require('./config');

if(config.accessTokenKey && config.accessTokenSecret) {
  var client = new Twitter({
    consumer_key: config.consumerKey,
    consumer_secret: config.consumerSecret,
    access_token_key: config.accessTokenKey,
    access_token_secret: config.accessTokenSecret
  });
} else {
  auth.getAuth(function(authData) {
    var client = new Twitter({
      consumer_key: config.consumerKey,
      consumer_secret: config.consumerSecret,
      access_token_key: authData.accessTokenKey,
      access_token_secret: authData.accessTokenSecret
    });
  });
}