// initialize needed modules and objects
var express			= require('express')
  , session			= require('express-session')
  , app				  = express()
  , swig			  = require('swig')
  , sass			  = require('node-sass')
  , cookies 		= require('cookie-parser')
  , body			  = require('body-parser')
  , path        = require('path')
  , glob			  = require('glob')
  , debug       = require('debug')('PEBB')
  , logger      = require('morgan')
  , options			= require('./options.js')
  , verbose 		= true;

/* 	assets/
 *		css
 *		js/
 *		images/
 *
 *	models/
 *	views/
 *	controllers/
 *
 *	sass/
 */

 // Sets rendering engine as SWIG for html files
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', options.views);
// caching
app.set('view cache', false);   // false || true
swig.setDefaults({
    cache: false		// false || memory
});

// Middlewares
app.use(logger('dev'));
app.use(body.json());
app.use(body.urlencoded({extended: true}));
app.use(cookies('some secret'));
app.use(session({
	secret: 'some secret here as well',
	resave: true,
	saveUninitialized: true
}));

// serve static assets
app.use(express.static(options.assets));

// Routing function
app.route = function(a, route) {
	route = route || '';
    for (var key in a) {
    	switch (typeof a[key]) {
        	case 'object': // { '/path': { ... }}
          		app.route(a[key], route + key);
          	break;
        	case 'function': // get: function(){ ... }
          		if (verbose) console.log('%s %s', key, route);
          		app[key](route, a[key]);
          	break;
      	}
    }
};

// Routing
glob("routes/*.js", {}, function (er, files) {
  files.forEach(function(file) {
    app.route(require('./'+file)(options));
    console.log('Route: '+file);
  });
});

// export app logic
module.exports	= app;
