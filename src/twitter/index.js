var Twitter = require('twitter');
var auth = require('./auth');
var config = require('./../config');

function getCompanyTwitter() {
  var twitter = '';
  switch(config.userInfo.company.toLowerCase()) {
    case 'net':
    case 'net virtua':
    case 'nete':
    case 'nets':
      twitter = '@NEToficial';
      break;
    case 'gvt':
    case 'gevete':
    case 'g v t':
      twitter = '@gvtoficial'
      break;
    case 'claro':
    case 'clarotv':
      twitter = '@ClaroBrasil'
      break;
    case 'oi':
    case 'oiwifi':
    case 'oivelox':
    case 'velox':
      twitter = '@digaoi'
      break;
    case 'vivo':
    case 'vivu':
    case 'vivointernet':
    case 'vivobox':
      twitter = '@Vivoemrede'
      break;    
    case 'sky':
    case 'isky':
    case 'esky':
    case 'skytv':
      twitter = '@skybrasil'
      break;
  }
  return twitter;
}

module.exports = {
  tweet: function(plan, speed) {
    var userTwitter = auth.loginTwitter(function(userTwitter) {
      var companyTwitter = '@icaroharry'; //getCompanyTwitter();
      var msg = companyTwitter + ' porque a minha velocidade de download está ' + speed + 'mBits/s se eu pago por ' + plan + ' mBits/s?';
      userTwitter.post('statuses/update', {status: msg},  function(error, tweet, response) {
        if(error) throw error;
      });
    });
  }
}