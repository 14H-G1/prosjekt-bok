var mongoose		= require('mongoose')
  , config		= require('../config.js');

this.Schema = mongoose.Schema;

// connect to db
mongoose.connect(config.mongodb.uri, config.mongodb.options, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + config.mongodb.uri + '. ' + err);
  } else {
    console.log ('Successfully connected to: ' + config.mongodb.uri);
  }
});

// userSchema
var userSchema = require('../models/userSchema.js')(config, this);
exports.userModel = mongoose.model('User', userSchema);

// bookSchema
var bookSchema = require('../models/bookSchema.js')(config, this);
exports.bookModel = mongoose.model('Book', bookSchema);
