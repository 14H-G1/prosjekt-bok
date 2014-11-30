module.exports = function Authentication() {
	return {
		dependencies: {
			"passport": "0.2.*",
			"passport-facebook": "1.0.*",
			"passport-local": "^1.0.*"
		},
		ready: function(next) {
			var echo 		= require('debug')('pebb:Authentication');
			var passport 	= require('passport');

			this.app.use(passport.initialize());
			this.app.use(passport.session());

			echo('Authentication is ready');
			next();
		}
	};
}();
