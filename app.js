require('colors');

var config = require('./src/config');
var twitter = require('./src/twitter');
var prompt = require('prompt');
var fs = require('fs');
var speedTest = require('./src/speedtest');

function getTestResult() {
  var test = speedTest(config.userInfo.speed, 2);
  test.on('done', function (result) {  
    speedTest = result.download;
    console.log('aaaah malandrão');
    if(parseFloat(speedTest) < parseFloat(config.userInfo.speed) * 0.4) {
      console.log(speedTest+"mBits/s".bgRed.white);
      console.log("Sua internet ta mais lenta do que uma lesma!");
      console.log("Melhor avisarmos os responsáveis...");
      twitter.tweet(config.userInfo.speed, speedTest);
    } else {
      console.log("Boas notícias!");
      console.log("Sua internet está acima do limite estabelecido.");
      console.log(speedTest+"mBits/s".bgGreen.white);
    }
  });
};

exports.run = function() {
  if(!config.userInfo) {
    config.userInfo = {};
    prompt.start();
    console.log('Qual é a sua operadora de internet?');
    prompt.get(['company'], function(err, result) {
      config.userInfo.company = result.company;
      console.log('Qual é a velocidade do seu plano de internet?');
      prompt.get(['speed'], function(err, result) {
        config.userInfo.speed = result.speed;
        fs.writeFileSync('config.json', JSON.stringify(config));
        getTestResult();
      });
    });
  } else {
    getTestResult();
  }
};

exports.about = function() {
  console.log("Olá!".bold);
  console.log("Esse programa foi feito para medir a velocidade de download da sua internet")
  console.log("e avisar para sua operadora, caso ela esteja abaixo do limite estabelecido");
  console.log("pela Anatel de 40% do plano contratado\n");
  console.log("É recomendável que você pause os downloads ou outros programas que podem consumir muita banda".bgRed.white);
};