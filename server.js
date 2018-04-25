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
  res.json({'buzzWords': buzzWords});
});

app.post('/buzzword', (req, res)=>{
  console.log(req.body.points)
  let pointNum = parseFloat(req.body.points);
  if (typeof(pointNum) !== 'number'){
    res.send({'success': false})
  };
  req.body.points = pointNum;
  buzzWords.push(req.body);
  res.send({'success': true})
})

app.listen(PORT, (err) => {
  process.stdout.write(`Server listening on port: ${PORT}\r\n`);
});