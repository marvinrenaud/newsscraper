$(document).ready(function(){
  // This enables the parallax
  $('.parallax').parallax();

  $.ajax({
    type: "GET",
    url: "/stash",
  }).done(function(data){
    console.log(data);
    console.log("Thats the data from the stash.js get");
    console.log(data.articles);
    // $.getJSON("/stash", function(data) {
      // For each one
      for (var i = 0; i < data.articles.length; i++) {
        console.log("for loop is running");
        // Display the apropos information on the page
        $("#myArticles").append("<p data-id='" + data.articles[i]._id + "'>" + data.articles[i].title + "<br />" + data.articles[i].shortLink +
        "<br/><hr class='style11'>" + "</p>");
      }
    // });
  })



});
