/*
 *	Database handling
 *
 *	1) Connects to MongoDB via Mongoose given an URI (see ~/config.js)
 *	2) Loads Schemas located at ~/models/schemas/*Schema.js
 * */

module.exports = function (config) {

  var mongoose		= require('mongoose')
    , glob		= require('glob')
    , db 		= this;
  
  db.Schema = mongoose.Schema;
  

  /*	Connects to the MongoDB using info from config
   * */
  mongoose.connect(config.mongodb.uri, config.mongodb.options, function (err, res) {
    if (err) {
      /* debugging: Notify console of error when connecting to MongoDB */
      if (config.app.verbose) {
	console.log ('ERROR connecting to: ' + config.mongodb.uri + '. ' + err);
      }
    } else {
      /* debugging: Notify console of successful MongoDB connection */
      if (config.app.verbose) {
	console.log ('Successfully connected to: ' + config.mongodb.uri);
      }
    }
  });
  db.connection = mongoose.connection;
  
  db.connection.once('open', function callback () {
    /*	Loads all Schemas from folder and models them using mongoose.
     *	Passes on config and referance to this DB handler to each Model
     *	so mongoose Schema object can be used
     * */
    glob('models/schemas/*.js', {}, function (err, files) {
      /* go through each file found using glob() */
      files.forEach(function(file) {
	/* Get usable schemaName scraped from file name */ 
	var schemaName = file.substring('models/schemas/'.length, file.length-('Schema.js'.length));
	/* Get usable naming convention for models: First letter capitalized. */
	var modelName = schemaName.charAt(0).toUpperCase()+schemaName.substring(1).toLowerCase();
	/* Get schema logic from file, pass on current config and reference to this DB */
	var schema = require('../'+file)(config, db);
	    
	/* export schema model to outside world, model each Schema with mongoose while doing so */
	exports[schemaName+"Model"] = mongoose.model(modelName, schema);
	/* debugging: Notify console of exported database models */
	if (config.app.verbose) {
	  console.log("Export["+schemaName+"Model]: "+model+" ~/"+file);
	}
      });
    });
  })
  /* Return DB logic */
  return db;
};
