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
	request('http://www.ign.com/articles', function (error, response, html) {
			if (error) throw error;
			//cheerio load html
			var $ = cheerio.load(html);
			
			$('.listElmnt-storyHeadline').each(function(i, element){
				var entry = [];
				//pushing title and link 
					$(this).find('.listElmnt-storyHeadline').each(function(i, element){
						entry.push($(this).children('a').text()); //title
						entry.push($(this).children('a').attr('href')); //link
					});
					//article objects
					var articleObj = {
						title : title,
						link : link,
						comments: []
					};
