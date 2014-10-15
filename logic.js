// initialize needed modules and objects
var express	= require('express')
  , session	= require('express-session')
  , app		= express()
  , passport	= require('passport')
  , swig	= require('swig')
  , sass	= require('node-sass')
  , cookies 	= require('cookie-parser')
  , body	= require('body-parser')
  , glob	= require('glob')
  , config	= require('./config.js')
  , verbose 	= true;

var db          = require('./models/database.js')
  , auth	= require('./models/passport.js')(passport);

/* 	assets/
 *		css
 *		js/
 *		img/
 *
 *	models/
 *	views/
 *	routes/
 *
 *	sass/
 */

// Sets rendering engine as SWIG for html files
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', config.app.views);

// caching
app.set('view cache', config.app.cache);   // false || true
swig.setDefaults({
    cache: config.app.cache?'memory':false
});

// Middlewares
app.use(body.json());
app.use(body.urlencoded({extended: true}));
app.use(cookies(config.app.secrets.cookies));
app.use(session({
    secret: config.app.secrets.session,
    resave: true,
    saveUninitialized: true
}));

// serve static assets
app.use(express.static(config.app.assets));

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
    app.route(require('./'+file)(config,db));
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
  title: "Enda en bok her 2!",
  authors: ["Writor"],
  retailprice: 469,
  price: 199,
  qty: 1,
  isbn: 978020535151,
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
