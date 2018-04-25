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
      if (!req.body.points) {//checks for points value in request
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

app.put('/buzzword', (req, res) => {

});

app.delete('/buzzword', (req,res)=>{
  let wordArr = buzzWords.map(function(object){
    return object.buzzword;
  })
  let wordIndex = wordArr.indexOf(req.body.buzzword);
if(wordIndex !== -1){
  buzzWords.splice(wordIndex, 1);
  res.json({'success': true});
}else{
  res.json({'success': false})
}
})

app.listen(PORT, (err) => {
  process.stdout.write(`Server listening on port: ${PORT}\r\n`);
});