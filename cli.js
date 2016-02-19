var colors = require('colors');
var cli = require('cli');
var app = require('./app');

cli.parse(null, ['run', 'about']);

switch(cli.command) {
  case 'run':
    app.run();
    break;
  case 'about':
    app.about();
    break;
}
