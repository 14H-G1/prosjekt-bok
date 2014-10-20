/*	Contains Application logic
 *
 *	1) Load need modules and initialize app with Express 4.9.*
 *	2) Configure database, passport authentication and prepare API
 *		i)	Config is always passed on
 *		ii)	DB has no dependencies
 *		iii)	Passport needs DB to look up and store credentials
 *		iv)	API needs both Passport and DB to increase flexibility and functionality
 * */
  
module.exports = function (config) {
    /* Initialize instances of needed NodeJS modules */
    var express	= require('express')
      , session	= require('express-session')
      , swig	= require('swig')
      , sass	= require('node-sass')
      , cookies = require('cookie-parser')
      , body	= require('body-parser')
      , glob	= require('glob');
      
    /* Prepare app using express as framework */
    var app	= express();
    
    /* Configure database, passport authentication and prepare API */
    var db	= require('./models/database.js')(config)
      , auth	= require('./models/passport.js')(config, db)
      , api	= require('./models/api.js')(config, db, auth);

    
    /* Sets rendering engine as SWIG for html files */
    app.engine('html', swig.renderFile);
    app.set('view engine', 'html');
    app.set('views', config.app.views);

    /* Caching */
    app.set('view cache', config.app.cache);
    swig.setDefaults({
	cache: config.app.cache?'memory':false
    });

    /* Middlewares */
    app.use(body.json());
    app.use(body.urlencoded({extended: true}));
    app.use(cookies(config.app.secrets.cookies));
    app.use(session({
	secret: config.app.secrets.session,
	resave: true,
	saveUninitialized: true
    }));

    /* serve static assets */
    app.use(express.static(config.app.assets));
    
    /* Routing function */
    app.route = function(a, route) {
	route = route || '';
	for (var key in a) {
	    switch (typeof a[key]) {
		case 'object':
		    // { '/path': { ... }}
		    app.route(a[key], route + key);
		break;
	    
		case 'function':
		    // get: function(){ ... }
		    app[key](route, a[key]);
		    
		    /* debugging: Notify console on new routes */
		    if (config.app.verbose) {
			console.log('%s %s', key, route);
		    }
		break;
	    }
	}
    };

    /*	Load all routes from folder, and route them
     *	through the routing function specified above
     * */
    glob("routes/*.js", {}, function (er, files) {
	// go through files found by glob() */
	files.forEach(function(file) {
	    app.route(require('./'+file)(config, db));
	});
    });

    // return app logic
    return app;
};