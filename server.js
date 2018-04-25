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
  let pointNum = parseFloat(req.body.points); //turns points value into a number

  //creates new buzzword if validation returns true
  if (validate()) {
    req.body.points = pointNum;
    buzzWords.push(req.body);
    res.json({
      'success': true
    })
  //fails if validation returns false
  } else {
    res.json({
      'success': false
    })
  }

  //validation function
  function validate() {
    if (!req.body.buzzword || !req.body.points) { //checks for buzzwords and points value in request
      return false
    } else {
      if (Number.isNaN(pointNum)) { //checks if points has a number value
        return false;
      }
    }
    return true;
  }

});


app.listen(PORT, (err) => {
  process.stdout.write(`Server listening on port: ${PORT}\r\n`);
});