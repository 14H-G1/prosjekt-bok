module.exports = function Framework() {
	return {
		dependencies: {
			"express": "4.10.*",
			"express-session": "1.9.*",
			"express-flash": "0.0.2",
			"body-parser": "1.9.*",
			"cookie-parser": "1.3.*",
			"swig": "1.4.*"
		},
		ready: function(next) {
			var echo 		= require('debug')('pebb:Framework');
			var express     = require('express');
			var session     = require('express-session');
			var flash       = require('express-flash');
			var cookies     = require('cookie-parser');
			var body        = require('body-parser');
			var swig 		= require('swig');
			var config      = require('app/config.js');

			this.app = express();

			this.app.engine('html', swig.renderFile);
			this.app.set('view engine', 'html');
			this.app.set('views', '../'+config.app.views);

			this.app.use(body.json());
			this.app.use(body.urlencoded({extended: true}));
			this.app.use(cookies(config.app.secret.cookies));
			this.app.use(session({
				secret: config.app.secret.session,
				resave: true,
				saveUninitialized: true
			}));
			this.app.use(flash());

			this.app.set('view cache', config.app.cache);
			swig.setDefaults({cache: config.app.cache?'memory':false});

			this.app.use(express.static('../'+config.app.assets));

			next();
		}
	};
}();
