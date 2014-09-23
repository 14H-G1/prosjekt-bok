// prepare debugging
var debug = require('debug')('PEBB');
// import app logic
var app   = require('./logic');

// set port, default=8080
app.set('port', process.env.PORT || 8080);

// setup server
var server = app.listen(app.get('port'), function() {
  console.log('Server listening on port ' + server.address().port);
});
