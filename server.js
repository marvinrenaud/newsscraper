// Dependencies required
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require("path");

// Requiring our Note and Article models
var Note = require("./models/note.js");
var Article = require("./models/article.js");
var User = require("./models/User.js");

// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;


// Initialize Express
var app = express();
var PORT = process.env.PORT || 8080;


// Use morgan and body parser with our current app.
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static(path.join(__dirname, '/public')));

// ROUTER
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Database configuration with mongoose
mongoose.connect("mongodb://heroku_0bhb1m9l:cp9pn96pqe1a5fe18nmbgsmosl@ds117592.mlab.com:17592/heroku_0bhb1m9l");
// mongoose.connect("mongodb://localhost/newsscraper");
var db = mongoose.connection;

// Show any mongoose errors...
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// LISTENER
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
