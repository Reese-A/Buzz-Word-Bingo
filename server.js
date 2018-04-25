const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
let buzzWords = [];

app.use(express.static('./public'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/buzzwords', (req, res) => {
  res.json({
    'buzzWords': buzzWords
  });
});

app.post('/buzzword', (req, res) => {
  let pointNum = parseFloat(req.body.points);
  if (validate()) {
    req.body.points = pointNum;
    buzzWords.push(req.body);
    res.json({
      'success': true
    })
  } else {
    res.json({
      'success': false
    })
  }

  function validate() {
    if (!req.body.buzzword || !req.body.points) {
      return false
    } else {
      if (Number.isNaN(pointNum)) {
        return false;
      }
    }
    return true;
  }

});


app.listen(PORT, (err) => {
  process.stdout.write(`Server listening on port: ${PORT}\r\n`);
});