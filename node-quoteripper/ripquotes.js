//tt0093146 tt0092848 tt0368226 tt0105643 tt1316037 tt2724064 tt0130236 tt0070948 tt0111552 tt0102293 tt0088258
var jsdom = require('jsdom');
var Parse = require('parse').Parse;
var Movie = Parse.Object.extend('Movie');
var Quote = Parse.Object.extend('Quote');
var movie_items = process.argv.slice(2);

Parse.initialize("APP_ID","JS_KEY","MASTER_KEY");

Parse.Cloud.useMasterKey();

for(var i=0; i < movie_items.length; i++){

	var movie_id = movie_items[i];
	var req_url = 'http://www.imdb.com/title/' + movie_id + '/quotes';

	console.log('Processing Movie #' + movie_id);

	jsdom.env({
		url: req_url,
		scripts: ['http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js'],
		done: function (err, window) {
	            //Use jQuery just as in any regular HTML page
	            var $ = window.jQuery;
	            var movie = new Movie();
	            var quote;
	            var movie_id = $('.subpage_title_block h3 a').attr('href').split('/')[2];
				var $quotes = $('#quotes_content .list .quote');
				
				//clear share links
				$quotes.find('.linksoda,.sharesoda_pre').remove();

				//clear links
				$quotes.find('a span').unwrap();

				//Save to Parse
				movie.save({
					movie_id: movie_id,
					title: $('h3 a').text(),
					description: '',
					image: '/img/movies/' + movie_id + '.jpg',
					trailer: '',
					active: 1
				}, {
				  success: function(movie) {
				    // Execute any logic that should take place after the object is saved.
					$quotes.each(function(i,v){
						quote = new Quote();
						quote.save({
							text: v.innerHTML,
							parent: movie
						});
					});
				  },
				  error: function(movie, error) {
				    // Execute any logic that should take place if the save fails.
				    // error is a Parse.Error with an error code and description.
				    alert('Failed to create new object, with error code: ' + error.description);
				  }
				});


	        }
	});
}
