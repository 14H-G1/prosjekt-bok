// prepare debugging
var debug   = require('debug')('PEBB');
// import app logic
var app     = require('./logic.js');
var config  = require('./config.js'); 

// set port, default=8080
app.set('port', config.app.port);

// setup server
var server = app.listen(app.get('port'), function() {
  console.log('Server listening on port ' + server.address().port);
});
