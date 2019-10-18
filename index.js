const express = require('express');

const app = express();

app.get('/', (req, res) => {
  return res.send('GoStack Challenge 01!');
});

app.listen(3000);
