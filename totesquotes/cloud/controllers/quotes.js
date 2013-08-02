var _ = require('underscore');
var Quote = Parse.Object.extend('Quote');

function shuffle(array) {
  var currentIndex = array.length,
	temporaryValue,
	randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Display all movies
exports.index = function(req, res) {
  var query = new Parse.Query(Quote);
  //query.descending('createdAt');
  
  query.limit(500)
	.include('parent')
	.find().then(function(results) {
	  shuffle(results);
	  res.render('quotes/index', { 
		quotes: results
	  });
	},
	function() {
	  res.send(500, 'Failed loading quotes');
	});
};