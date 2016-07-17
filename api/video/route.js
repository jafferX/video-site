'use strict';

var url = require('url');

module.exports = function(app) {
app.get( '/api/video/all', function (req, res) {
	var db = app.dbs.videos;
	
	db.find ( {}, function(err, docs) {
	
		res.json(docs);//( JSON.stringify( docs ) );
		});
	
	});

app.get('/api/video/add', function (req, res) {
var queryData = url.parse(req.url, true).query;

if(typeof queryData.v !== 'undefined') {
var video = {
		v: queryData.v,
		title: queryData.title
			};
	var db = app.dbs.videos;
	
	db.insert(video, function(err, doc) {
	if (err) {
	console.log(err);
	return res.send(500, 'internal server problem', err);
	}
	
	console.log ('added: ', doc);
	res.status(200).send('ok');
	});
}
else {
	return res.send(400, 'missing v parameter')
		}
	});
	
};


