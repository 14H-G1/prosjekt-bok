// initialize needed modules and objects
var express			= require('express')
  , session			= require('express-session')
  , app				= express()
  , swig			= require('swig')
  , sass			= require('node-sass')
  , cookies 		= require('cookie-parser')
  , body			= require('body-parser')
  , path        	= require('path')
  , glob			= require('glob')
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
    cache: false				// false || memory
});

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser('some secret'));
app.use(session({
	secret: 'some secret here as well',
	resave: true,
	saveUninitialized: true
}));

// serve static assets
app.use(express.static(options.assets);

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

// TODO: do routes here

// temp index route
app.route(require('routes/index.js')(options));

// export app logic
module.exports	= app;
