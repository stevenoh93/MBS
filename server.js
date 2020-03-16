var express = require("express");
var bodyParser = require('body-parser');
var fs = require('fs');

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

const DATA_PATH = __dirname + '/data/';
const INCOME_DATA_PATH = DATA_PATH + 'income.json';
const EXPENSE_DATA_PATH = DATA_PATH + 'expense.json';

app.get('/getIncome', (req, res) => {
  fs.readFile(INCOME_DATA_PATH, "utf8", (err, data) => {
    res.send(data);
  });
});

app.post('/newIncome', (req, res) => {
  appendJSON(INCOME_DATA_PATH, req.body);
  res.send("Cool");
});

app.post('/deleteIncome', (req, res) => {
  deleteElement(INCOME_DATA_PATH, req.body);
  res.send("Done");
});

var server = app.listen(8000, function() {
  var port = server.address().port;
  console.log("Server started at http://localhost:%s", port);
});

function appendJSON(path, entry) {
  fs.readFile(path, "utf8", function (err, data) {
    var incomeJSON = JSON.parse(data);
    incomeJSON.income.push(entry);
    fs.writeFile(path, JSON.stringify(incomeJSON), (err) => {});
  });
}

function deleteElement(path, entry) {
  fs.readFile(path, "utf8", function (err, data) {
    var incomeJSON = JSON.parse(data);
    incomeJSON.income.splice(entry.startIndex, entry.lastIndex-entry.startIndex + 1);
    fs.writeFile(path, JSON.stringify(incomeJSON), (err) => {});
  });
}
