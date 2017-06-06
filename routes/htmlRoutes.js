// DEPENDENCIES
var path = require('path');


// ROUTING
module.exports = function(app) {

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  app.get('/mystash', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/mystash.html'));
  });

  // If no matching route is found default to home
  app.use(function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
};
