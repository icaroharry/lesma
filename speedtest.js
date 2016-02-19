var speedTest = require('speedtest-net');

var plan = 30;
var limit = plan * 0.4;

var results = {};

function testSpeed(limit, count) {
  var test = speedTest({maxTime: 5000});

  test.on('data', function(result) {
    results.download = result.speeds.download;
    if (count == 4) {
      sendTweet();
    }
    if(results.download < limit && count < 3) {
      count++
      testSpeed(limit, count);
    }
  });

  test.on('error', function(err) {
    console.error(err);
  });
};