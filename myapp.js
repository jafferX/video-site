'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-Parser');
var url = require('url');
var nedb = require('nedb');
var PORT = 3000;

//configuration for app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

//-----------	
//configure database	
//-----------
app.dbs = {};

var db = new nedb({filename: './nedb.json', autoload: true});

db.loadDatabase(function (err) {

	console.log('load err:', err);
	});
	
db.ensureIndex( {fieldName: 'v', unique: true});

app.dbs.videos = db;

//-----------	
//routes
//-----------	  
app.get('/', function (req, res) {
  //res.send('Hello World!')
  
  var obj ={}
  obj.time = "hi";
  obj.idol = 3;
  
  var queryData = url.parse(req.url, true).query;
  
  obj.queryData = queryData;
  //var html = "<html> <body> <h1> Hello ";
  //html += queryData.user; 
  //html += "</h1> </body> </html>";
  
  res.json(JSON.stringify(obj));
  //res.send(obj);
  
  
})
require('./api/video/route.js')(app);

//-----------	
//server
//-----------
var server = app.listen(PORT, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
