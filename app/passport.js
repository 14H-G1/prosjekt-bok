/*
 *      Passport authentication
 *
 *      1) Load needed Strategies
 *      2) Return a function which configures passport
 *         and all Strategies
 * */


/* load passport nodejs module */
var passport            = require('passport');
var LocalStrategy       = require('passport-local').Strategy;
var FacebookStrategy    = require('passport-facebook').Strategy;
var config              = require('app/config.js');
var database            = require('app/database.js');
var debug               = require('debug')('app:passport');

debug('requesting authentication strategies');

database.ready(function(models) {
    /* Serializing and Deserializing,
     * so we can keep user data through session
     * */
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        database.models().user.findById(id, function(err, user) {
            done(err, user);
        });
    });
    /* Set up a LocalStrategy for users not connecting
     * through a social media login
     * */
    passport.use('local',
        new LocalStrategy({
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true
            },
            /* This is called when a non-social media user tries to logon
            */
            function(req, email, password, done) {
                database.models().user.findEmail(email, function(err, user) {
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
    debug('> Passport authentication ready');
    module.exports = passport;
});
