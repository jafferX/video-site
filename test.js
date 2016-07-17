var nedb = require('nedb'),
  db = new nedb({filename: './nedb.json', autoload: true});
  
function load()
{
   db.find({}, function (err, docs){
    
    console.log(docs);
	});
}	
	
  
function storing(video)
{  
	db.insert (video, function  (err, newDoc)
	{
	if (err)
	{
		console.log(err);
	}
    console.log (newDoc);
	}
	);
}   
 
 function init()
 {
  storing({title:'hi'});
  storing({title:'hey'});
 }
  
  
init();
load();
