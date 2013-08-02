var _ = require('underscore');
var Movie = Parse.Object.extend('Movie');

// Display all movies
exports.index = function(req, res) {
  var query = new Parse.Query(Movie);
  //query.descending('createdAt');
  query.find().then(function(results) {
    res.render('movies/index', { 
      movies: results
    });
  },
  function() {
    res.send(500, 'Failed loading movies');
  });
};

// Show a given movie based on specified id.
exports.view = function(req, res) {
  var movieQuery = new Parse.Query(Movie);
  var movie, quotes, comments;
  movieQuery.get(req.params.id).then(function(data) {
    if (data) {
      movie = data;
      var Quote = Parse.Object.extend('Quote');
      var quoteQuery = new Parse.Query(Quote);
      quoteQuery.equalTo('parent', movie);
      return quoteQuery.find();
    } else {
      return [];
    }
  }).then(function(data) {
    if(data){
      quotes = data;
    }

    var Comment = Parse.Object.extend('Comment');
    var commentQuery = new Parse.Query(Comment);
    commentQuery.equalTo('parent', movie);
    return commentQuery.find();
  }).then(function(data) {
    if(data){
      comments = data;
    }

    res.render('movies/view', {
      movie: movie,
      quotes: quotes,
      comments: comments,
      token: req.session._csrf
    });
  },
  function() {
    res.send(500, 'Failed finding the specified movie to show');
  });
};

exports.create = function(req, res) {
    var Movie = Parse.Object.extend('Movie');
    var Comment = Parse.Object.extend('Comment');
    var comment = new Comment();
    var movie = new Movie();
    var text = req.body.comment;
    var movie_id = req.body.movie_id;

    console.log('Saving Comment for ' + movie_id);

    if(movie_id == undefined){
      //go to standard movies page
      res.redirect('/movies');
      return;
    }

    //simple check for empty comment
    if(text == ''){
      //just go back to movie page then
      res.redirect('/movies/'+movie_id);
      return;
    }

    movie.id = movie_id;

    comment.set('parent',movie);
    comment.set('text', text);

    var commentACL = new Parse.ACL(Parse.User.current());
    commentACL.setPublicReadAccess(true);
    comment.setACL(commentACL);
    comment.save(null,{
      success:function(comment){
        console.log('saved');
        res.redirect('/movies/'+movie_id);
      },
      error:function(comment,error){
        console.log('not saved');
        res.redirect('/movies/'+movie_id);
      }
    });
};