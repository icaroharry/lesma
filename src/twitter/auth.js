var Twitter = require('twitter');
var config = require('./../config');
var twitterPin = require('./twitter-pin');

module.exports = {
  loginTwitter: function(callback){
    var client = {}; 
    if(config.accessTokenKey && config.accessTokenSecret) {
      client = new Twitter({
        consumer_key: config.consumerKey,
        consumer_secret: config.consumerSecret,
        access_token_key: config.accessTokenKey,
        access_token_secret: config.accessTokenSecret
      });
      callback(client);
    } else {
      twitterPin.getAuth(function(authData) {
        client = new Twitter({
          consumer_key: config.consumerKey,
          consumer_secret: config.consumerSecret,
          access_token_key: authData.accessTokenKey,
          access_token_secret: authData.accessTokenSecret
        });
        callback(client);
      });
    }
    return client;
  }
};