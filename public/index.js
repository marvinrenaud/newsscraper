$(document).ready(function(){
  // This enables the parallax
  $('.parallax').parallax();

  console.log("Code before getJSON is running");

  $.ajax({
    type: "GET",
    url: "/scrape",
  }).done(function(){
    $.getJSON("/articles", function(data) {
      console.log("getJSON is running!");
      // For each one
      for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].shortLink + "<br/><hr class='style11'>" + "</p>");

      }
    });
  })



  // $.get("/scrape", function() {
  //   $.getJSON("/articles", function(data) {
  //     console.log("getJSON is running!");
  //     // For each one
  //     for (var i = 0; i < data.length; i++) {
  //       // Display the apropos information on the page
  //       $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].shortLink + "</p>");
  //     }
  //   });
  // });
  //
  // // Grab the articles as a json
  // $.getJSON("/articles", function(data) {
  //   console.log("getJSON is running!");
  //   // For each one
  //   for (var i = 0; i < data.length; i++) {
  //     // Display the apropos information on the page
  //     $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].shortLink + "</p>");
  //   }
  // });

console.log("code after the getJSON is running");











});
