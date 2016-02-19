var config = require('./../config');
var prompt = require('prompt');
var webkitOpener = require('webkit-opener');
var TwitterPinAuth = require('twitter-pin-auth');
var Twitter = require('twitter');
var fs = require('fs');

var twitterPinAuth = new TwitterPinAuth(config.consumerKey, config.consumerSecret);

exports.getAuth = function(callback) {
  twitterPinAuth.requestAuthUrl()
    .then(function(url) {
      webkitOpener(url);
    }).catch(function(err) {
      console.error(err);
    });

  prompt.start();

  console.log('Insira o PIN recebido no site do Twitter');
  prompt.get(['pin'], function(err, result) {
    twitterPinAuth.authorize(result.pin)
      .then(function(authData) {
        config.accessTokenKey = authData.accessTokenKey;
        config.accessTokenSecret = authData.accessTokenSecret;
        fs.writeFileSync('config.json', JSON.stringify(config));
        callback(authData);
      }).catch(function(err) {
        console.error(err);
      });
  });
};