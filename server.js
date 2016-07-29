const express = require('express');
const bodyParser = require('body-parser');
const AnswerGenerator = require('./answer-generator');
const CompareNumber = require('./compare-number');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(AnswerGenerator.generate());
});

app.post('/', (req, res) => {
  res.send(CompareNumber.compare(req.body.input, req.body.answer));
});

app.listen('3000', () => {
  console.log('Server start on 3000 port...');
});

