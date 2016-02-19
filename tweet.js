var config = require('./config');
var prompt = require('prompt');
var webkitOpener = require('webkit-opener');
var TwitterPinAuth = require('twitter-pin-auth');

var twitterPinAuth = new TwitterPinAuth(config.consumerKey, config.consumerSecret);

twitterPinAuth.requestAuthUrl()
  .then(function(url) {
    webkitOpener(url);
  }).catch(function(err) {
    console.error(err);
  });

prompt.start();

prompt.get(['pin'], function(err, result) {
  console.log('Insira o PIN recebido no site do Twitter');
  twitterPinAuth.authorize(result.pin)
    .then(function(data) {
      console.log(data.accessTokenKey);
      console.log(data.accessTokenSecret);
    }).catch(function(err) {
      console.error(err);
    });
});