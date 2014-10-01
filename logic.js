// initialize needed modules and objects
var express			= require('express')
  , session			= require('express-session')
  , app					= express()
  , swig				= require('swig')
  , sass				= require('node-sass')
  , cookies 		= require('cookie-parser')
  , body				= require('body-parser')
  , path        = require('path')
  , glob				= require('glob')
  , debug       = require('debug')('PEBB')
  , options			= require('./options.js')
  , verbose 		= true;

var auth        = require('./models/auth.js')
  , db          = require('./models/database.js');

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
    app.route(require('./'+file)(options,db));
    console.log('Route: '+file);
  });
});

// make test user
/*var user = new db.userModel({
  username: "marcus",
  email: "marcus@pebb.no",
  password: "abc123",
  phone: 41418153
});*/
/*var book = new db.bookModel({
  title: "Discrete Mathematics and Computing",
  authors: ["Rod Haggarty"],
  retailprice: 689,
  price: 199,
  qty: 1,
  isbn: 9780201730470,
  seller: "Nataniel"
});

book.save(function(err) {
  if (err) {
    console.log('error: ' + err);
  }
  else {
    console.log('new book: ' + book.title);
  }
});*/

/*db.bookModel.findByISBN(9780201730470, function(err, books) {
  console.log(books);
});*/
/*db.bookModel.findBySeller('Marcus', function(err, books) {
  console.log(books);
});*/

// export app logic
module.exports	= app;
