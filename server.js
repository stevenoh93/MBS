var express = require("express");
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('./'));

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/vendor', express.static(__dirname + '/vendor'));
app.use('/data', express.static(__dirname + '/data'));
app.use('/pages', express.static(__dirname + '/pages'));
app.use('/img', express.static(__dirname + '/img'));

app.post('/newIncome', (req, res) => {
  console.log("Got new income!");
  console.log(req.body);
  // console.log(req.body);
  res.send("Cool");
});

var server = app.listen(8000, function() {
  var port = server.address().port;
  console.log("Server started at http://localhost:%s", port);
});
