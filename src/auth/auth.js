var Twitter = require('twitter');
var config = require('./../config');
var twitterPin = require('./twitter-pin');

var client = {};

if(config.accessTokenKey && config.accessTokenSecret) {
  client = new Twitter({
    consumer_key: config.consumerKey,
    consumer_secret: config.consumerSecret,
    access_token_key: config.accessTokenKey,
    access_token_secret: config.accessTokenSecret
  });
} else {
  twitterPin.getAuth(function(authData) {
    client = new Twitter({
      consumer_key: config.consumerKey,
      consumer_secret: config.consumerSecret,
      access_token_key: authData.accessTokenKey,
      access_token_secret: authData.accessTokenSecret
    });
  });
}

module.exports = client;