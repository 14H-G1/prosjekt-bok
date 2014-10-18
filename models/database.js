/*
 *	Database handling
 *
 *	1) Connects to MongoDB via Mongoose given an URI (see ~/config.js)
 *	2) Loads Schemas located in ~/models/schemas/*Schema.js
 * */
 
var glob = require('glob');

var mongoose		= require('mongoose')
  , config		= require('../config.js')
  , glob		= require('glob')
  , db 			= this;

db.Schema = mongoose.Schema;

/*	Connects to the MongoDB using info from ~/config.js
 * */
mongoose.connect(config.mongodb.uri, config.mongodb.options, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + config.mongodb.uri + '. ' + err);
  } else {
    console.log ('Successfully connected to: ' + config.mongodb.uri);
  }
});

/*	Loads all Schemas from folder and models them using mongoose.
 *	Passes on config and referance to this DB handler to each Model
 *	so mongoose Schema object can be used in each
 * */
glob('models/schemas/*.js', {}, function (err, files) {
  files.forEach(function(file) {
    var schemaName = file.substring('models/schemas/'.length, file.length-('Schema.js'.length));
    var modelName = schemaName.charAt(0).toUpperCase()+schemaName.substring(1);
    var schema = require('../'+file)(config, db);
    
    exports[schemaName+"Model"] = mongoose.model(modelName, schema);
    console.log("Export["+schemaName+"Model]: "+model+" ~/"+file);
  });
});	
