
// These two lines are required to initialize Express in Cloud Code.
var express = require('express');
var moment = require('moment');
var _ = require('underscore');

//Controllers
var moviesController = require('cloud/controllers/movies.js');
var quotesController = require('cloud/controllers/quotes.js');


//Start of App
var app = express();

// Setup your keys
app.locals.parseAppKey = 'YOUR_APP_ID';
app.locals.parseJSKey = 'YOUR_JAVASCRIPT_KEY';
app.locals.FBAppID = 'YOUR_FB_APP_ID';
app.locals.AppURL = 'YOUR_APP_URL';


// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body
app.use(express.cookieParser());
app.use(express.cookieSession({ secret: 'YOUR_SECRET'}));
app.use(express.csrf());


// Routes
app.get('/', moviesController.index);
app.get('/movies', moviesController.index);
app.get('/movies/:id', moviesController.view);
app.post('/movies/create', moviesController.create);
app.get('/quotes', quotesController.index);

// Attach the Express app to Cloud Code.
app.listen();
