// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require("path");
// Requiring our Note and Article models
var Note = require("../models/note.js");
var Article = require("../models/article.js");
var User = require("../models/User.js");
// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Initialize Express
var app = express();

// ROUTING
module.exports = function(app) {

  // We'll create a generic user by using the User model as a class
  var unknownUser = new User({
    name: "Unknown User"
  });
  // Using the save method in mongoose, we create our example user in the db
  unknownUser.save(function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Or log the doc
    else {
      console.log(doc);
    }
  });


// A GET request to scrape the techcrunch website
app.get("/scrape", function(req, res) {
  console.log("Get in apiRoutes is running");
  // First, we grab the body of the html with request
  request("https://techcrunch.com/", function(error, response, html) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(html);
    // Now, we grab every article within the content river:
    $("li.river-block").each(function(i, element) {

      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(element).attr("data-sharetitle");
      result.shortLink = $(element).attr("data-shortlink");
      result.imgLink = $(element).find("a").find("img").attr("src");

      // Using our Article model, create a new entry
      // This effectively passes the result object to the entry (and the title and link)
        var entry = new Article(result);

        // Now, save that entry to the db
        entry.save(function(err, doc) {
          // Log any errors
          if (err) {
            console.log(err);
          }
          // Or log the doc
          else {
            console.log(doc);
          }
        });
    });
  });
  // Tell the browser that we finished scraping the text
  res.send("Scrape Complete");
  console.log("Scrape Complete");
});

// This will get the articles we scraped from the mongoDB
app.get("/articles", function(req, res) {
  // Grab every doc in the Articles array
  Article.find({}, function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Or send the doc to the browser as a json object
    else {
      res.json(doc);
    }
  });
});

// New save of an article by user via POST route
app.post("/save", function(req, res) {
  console.log(req.body);
  console.log("Post is hitting");
  console.log("******" + unknownUser._id);

  var userId = "{_id: ObjectId('" + unknownUser._id + "')}";
  console.log(userId);

  // Code that works in Robomongo:
  // db.users.findOneAndUpdate({_id: ObjectId("59357fe89b86d52e7439e7a2")} , { $push: { articles: '5935b295715089334c4d3abd' }})

      // Find our user and push the new article id into the User's article array
      User.findOneAndUpdate({_id: unknownUser._id}, {$push: req.body}, { new: true }, function(err, newdoc) {
        // Send any errors to the browser
        if (err) {
          res.send(err);
          console.log("push is NOT happening");
        }
        // Or send the newdoc to the browser
        else {
          res.send(newdoc);
          console.log("push is hapenning");
        }
      });
});

// Grab saved articles by user's ObjectId
app.get("/stash", function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  User.findOne({ "_id": unknownUser._id })
  // ..and populate all of the articles associated with it
  .populate("articles")
  // now, execute our query
  .exec(function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Otherwise, send the doc to the browser as a json object
    else {
      res.json(doc);
    }
  });
});


};
