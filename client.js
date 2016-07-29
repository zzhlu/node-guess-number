"use strict";

const request = require('request');

const option = {
  baseUrl: 'http://localhost:3000',
  url: '/',
  method: 'GET',
  json: true
};

request(option, (error, res, body) => {
  const answer = body;
  let chances = 6;
  console.log(answer);
  console.log('Welcome!\n');
  console.log(`Please input your number(${chances}):`);

  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (input) => {
    if (!validate(input)) {
      console.log(`Cannot input duplicate numbers!
Please input your number(${chances}):`);
    } else {

      const opt = {
        baseUrl: 'http://localhost:3000',
        url: '/',
        method: 'POST',
        json: true,
        body: {
          input: input,
          answer: answer
        }
      };

      request(opt, (error, res, body) => {
        const result = body;
        if (result === '4A0B') {
          console.log('Congratulations!');
          process.exit();

        } else {
          console.log(result);
          chances--;
          if (chances === 0) {
            console.log('Game Over\n');
            console.log(`Answer:${answer}`);
            process.exit();
          } else {
            console.log(`Please input your number(${chances}):`);
          }
        }
      });
    }
  });
});

function validate(input) {
  return input.split('').every((digit, index, array) => {
    return array.lastIndexOf(digit) === index;
  });
}