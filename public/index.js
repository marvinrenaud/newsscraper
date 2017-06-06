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
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].shortLink +
        "<br /><a class='waves-effect waves-light btn z-depth-0 saveButton right-align'>Save</a>" +
        "<br/><hr class='style11'>" + "</p>");
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

  // When you click the save button
$(document).on("click", "p", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  console.log(thisId);

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/save",
    data: {
      // Value taken from title input
      articles: thisId
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
    });

});




});
