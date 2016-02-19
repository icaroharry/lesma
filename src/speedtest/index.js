var EventEmitter = require("events").EventEmitter;
const util = require('util');
var speedTest = require('speedtest-net');

function testSpeed(plan) {
  var results = {};
  var ee = new EventEmitter();
  var test = speedTest({maxTime: 5000});
  var limit = plan * 0.4
  test.on('data', function(result) {
    results.download = result.speeds.download;
    if(results.download < limit) {
      var test = speedTest({maxTime: 5000});
      test.on('data', function(result) {
        results.download = result.speeds.download;
        if(results.download < limit) {
          ee.emit('done', results);
        }
      });
    } else {
      ee.emit('done', results);
    }
  });

  test.on('error', function(err) {
    console.error(err);
  });

  return ee;
};

module.exports = testSpeed;