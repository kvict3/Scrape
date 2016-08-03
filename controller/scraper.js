// Require request and cheerio. 
var request = require('request');
var cheerio = require('cheerio');

// Database variables
var mongojs = require('mongojs');
var databaseUrl = "scraper";
var collections = ["scrapedData"];

// mongo config
var db = mongojs(databaseUrl, collections);
db.on('error', function(err) {
  console.log('Database Error:', err);
});

module.exports = function(app){
	//root page
	app.get('/', function(req, res) {
		//reddit load
	request('https://www.reddit.com/', function (error, response, html) {
			if (error) throw error;
			//cheerio load html
			var $ = cheerio.load(html);
			
			$('.title may-blank outbound ').each(function(i, element){
				var entry = [];
				//pushing title and link 
					$(this).find('.title may-blank outbound ').each(function(i, element){
						entry.push($(this).children('a').text()); //title
						entry.push($(this).children('a').attr('href')); //link
					});
					//article objects
					var articleObj = {
						title : entry[0],
						link : entry[1],
						comments: []
					};
						//function to see if article is there
							db.scrapedData.find(articleObj, function(err,data)
						{
						//if it doesnt insert new article into DB
						if (Object.keys(data).length == 0)
						{
						db.scrapedData.insert(articleObj, function(err, data){
							if (err) throw err;
						});
						console.log("Yay it's there!");
						}
						//check if article already exists after load
						else
						console.log("Too late it's already here...");
						});


					});
				});
			//reloads page with database info
			db.scrapedData.find({}, function(err,data)
			{
			res.render('index', {data});

			})
		});

			app.post('/delete', function(req, res){
		
				var id = req.body.commID;
				var comment = req.body.comment;

	

			db.scrapedData.update({_id: mongojs.ObjectId(id)}, { $pull: { comments: { $in: [ comment ] }}});

			db.scrapedData.find({}, function(err,data)
			{
				res.render('index', {data});

				});

		});

			app.post('/update/:id', function(req, res) {

			var id = req.params.id;
			db.scrapedData.update({_id: mongojs.ObjectId(id)}, {$push: {'comments': req.body.comment}}, function(err)
			{
			if(err) throw err;
		});
			db.scrapedData.find({}, function(err,data)
		{
			res.render('index', {data});

		});
	});



}