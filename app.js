// prepare debugging
var debug   = require('debug')('PEBB');
// get configuration and app logic
var config  = require('./config.js');
var app     = require('./logic.js')(config);

// set port, default=8080
app.set('port', config.app.port);

// setup server
var server = app.listen(app.get('port'), function() {
  console.log('> '+config.app.name+' running on port: ' + server.address().port);
});
