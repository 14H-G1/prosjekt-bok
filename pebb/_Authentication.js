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
				ref.database.models.users.findById(id, function(err, user) {
					done(err, user);
				});
			});
			passport.use('localLogin',
				new LocalStrategy({
						usernameField: 'email',
						passwordField: 'password',
						passReqToCallback: true
					},
					/* This is called when a non-social media user tries to logon
					*/
					function(req, email, password, done) {
						ref.database.models.users.findEmail(email, function(err, user) {
							if (err) return done(err);
							/* User already exists in the Database */
							if (!user) {
								return done(null, false, req.flash('alert', 'Fant ikke bruker i systemet'));
							}
							else {
								if (user.comparePassword(password)) {
									return done(null, user);
								}
								else {
									return done(null, req.flash('alert', 'Feil passord'));
								}
							}
								/*var newLocalUser = new database.models().user();
								newLocalUser.local.email = email;
								newLocalUser.local.password = models.user.hashPassword(password);
								newLocalUser.local.username = 'tutorial';
								newLocalUser.save(function(err) {
									if (err) throw err;
									return done(null, newLocalUser);
								});*/
						});
					}
				)
			);

			passport.use('localRegister',
				new LocalStrategy({
						usernameField: 'email-register',
						passwordField: 'password-register',
						passReqToCallback: true
					},
					function (req, email, password, done) {
						ref.database.models.users.findEmail(email, function(err, user) {
							if (err) return done(err);
							if (user) {
								return done(null, false, req.flash('alert', 'Email allerede registrert'));
							}
							else {
								var temp = new ref.database.models.users();

								temp.local.email = email;
								temp.local.username = 'tutorial';
								temp.local.password = temp.hashPassword(password);
								temp.local.fullname = req.body.fullname;
								temp.contact.phone = req.body.mobile;

								temp.save(function(err) {
									if (err) {
										debug(err);
										throw err;
									}
									return done(null, temp);
								});
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
