var LocalStrategy       = require('passport-local').Strategy
  , FacebookStrategy	= require('passport-facebook').Strategy
  , db                  = require('../models/database.js');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        db.userModel.findById(id, function(err, user) {
            done(err, user);
        });
    });
    passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done) {
        process.nextTick(function() {
            db.userModel.findOne({'local.email':email}, function(err, user) {
                if (err) return done(err);
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