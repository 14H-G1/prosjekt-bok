/*  Authentication routing
 *
 *  1) Setup up passport with various authentication methods which Strategies use
 *  2) Return routing logic
 * */

module.exports = function(models) {
    var passport = require('passport')
    var config = require('app/config');

    var localLogin = passport.authenticate('localLogin', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    });

    var localRegister = passport.authenticate('localRegister', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    });

    var facebook = {
    };

    return {
        '/auth': {
            '/local-login': {
                post: localLogin
            },
            '/local-register': {
                post: localRegister
            },
        },
        '/logout': {
            get: function(req, res) {
                req.logout();
                res.redirect('/');
            }
        }
    };
};
