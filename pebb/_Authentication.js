module.exports = function Authentication() {
	return {
		dependencies: {
			"passport": "0.2.*",
			"passport-facebook": "1.0.*",
			"passport-local": "^1.0.*"
		},
		ready: function(next) {
			var echo 				= require('debug')('pebb:Authentication');
			var passport 			= require('passport');
			var LocalStrategy       = require('passport-local').Strategy;
			var FacebookStrategy    = require('passport-facebook').Strategy;

			this.app.use(passport.initialize());
			this.app.use(passport.session());
			var ref = this;

			passport.serializeUser(function(user, done) {
				done(null, user.id);
			});
			passport.deserializeUser(function(id, done) {
				ref.database.models.user.findById(id, function(err, user) {
					done(err, user);
				});
			});
			passport.use('local',
				new LocalStrategy({
						usernameField: 'email',
						passwordField: 'password',
						passReqToCallback: true
					},
					/* This is called when a non-social media user tries to logon
					*/
					function(req, email, password, done) {
						ref.database.models.user.findEmail(email, function(err, user) {
							if (err) return done(err);
							/* User already exists in the Database */
							if (user) {
								return done(null, false, req.flash('alert', 'Email allerede i bruk'));
							}
							else {
								return done(null, false, req.flash('alert', 'Email does not exist'));
								/*var newLocalUser = new database.models().user();
								newLocalUser.local.email = email;
								newLocalUser.local.password = models.user.hashPassword(password);
								newLocalUser.local.username = 'tutorial';
								newLocalUser.save(function(err) {
									if (err) throw err;
									return done(null, newLocalUser);
								});*/
							}
						});
					}
				)
			);
			echo('Authentication is ready');
			next();
		}
	};
}();
