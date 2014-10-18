/*
 *      Passport authentication
 *
 *      1) Load needed Strategies and the DB.
 *      2) Return a function which configures passport
 *         and all Strategies
 * */

var LocalStrategy       = require('passport-local').Strategy
  , FacebookStrategy	= require('passport-facebook').Strategy
  , db                  = require('../models/database.js');

module.exports = function(passport) {
    /* Serializing and Deserializing,
     * so we can keep user data through session
     * */
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        db.userModel.findById(id, function(err, user) {
            done(err, user);
        });
    });
    /* Set up a LocalStrategy for users not connecting
     * through a social media login
     * */
    passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    /* This is called when a non-social media user tries to logon
    */
    function(req, email, password, done) {
        /* Queue the function at next process tick,
         * this is to make sure db.userModel.findOne()
         * gets enough time to find a user
         * async vs. sync
         * */
        process.nextTick(function() {
            db.userModel.findOne({'local.email': email}, function(err, user) {
                if (err) return done(err);
                /* User already exists in the Database */
                if (user) {
                    // already in use
                }
                else {
                    var newLocalUser = new db.userModel();
                    
                    newLocalUser.local.email = email;
                    newLocalUser.local.password = newLocalUser.hashPassword(password);
                    
                    newLocalUser.save(function(err) {
                        if (err) throw err;
                        return done(null, newLocalUser);
                    });
                }
            });
        });
    }));
}