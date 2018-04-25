const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
let buzzWords = [];
let score = 0;

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
  } else { //fails if validation returns false
    res.json({
      'success': false
    })
  }

  //validation function
  function validate() {
    if (!req.body.buzzword) { //checks for buzzword value in request
      return false
    } else {
      if (!req.body.points) { //checks for points value in request
        return false
      } else {
        if (Number.isNaN(pointNum)) { //checks if points has a number value
          return false;
        }
      }
    }
    return true;
  }
});

app.post('/reset', (req, res) => {
  //removes all buzzwords and resets points
  buzzWords = [];
  points = 0;
  res.send({
    'success': true
  });
})

app.post('/heard', (req, res) => {
  //checks for a buzzword in buzzwords array and adds its points value to total points
  if (checkBuzzwords(req, res) !== -1){
    points += buzzWords[checkBuzzwords(req, res)].points;
    res.send({'totalScore': points});
  }else{
    return false;
  }
});

app.put('/buzzword', (req, res) => {
  //checks for a buzzword in buzzwords array and updates buzzwords points value if found
  let newPoints = parseFloat(req.body.points)
  if (checkBuzzwords(req, res) !== -1) {
    buzzWords[checkBuzzwords(req, res)].points = newPoints;
    res.send({
      'success': true
    });
  } else {
    res.send({
      'success': false
    });
  }
});

app.delete('/buzzword', (req, res) => {
  //checks for a buzzword in buzzwords array and removes it if found
  if (checkBuzzwords(req, res) !== -1) {
    buzzWords.splice(wordIndex, 1);
    res.json({
      'success': true
    });
  } else {
    res.json({
      'success': false
    })
  }
})

//checks for a buzzword that matches request and returns its index position in the buzzwords array
function checkBuzzwords(req, res) {
  let wordArr = buzzWords.map(function (object) {
    return object.buzzword;
  })
  return wordIndex = wordArr.indexOf(req.body.buzzword);
}

app.listen(PORT, (err) => {
  process.stdout.write(`Server listening on port: ${PORT}\r\n`);
});