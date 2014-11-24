/*  Authentication routing
 *
 *  1) Setup up passport with various authentication methods which Strategies use
 *  2) Return routing logic
 * */

module.exports = function(db) {
    var passport = require('passport')
      , config = require('app/config');

    var local = passport.authenticate('local', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    });

    var facebook = {

    };

    return {
        '/auth': {
            '/local-login': {
                'post': local
            },
            '/logout': {
                'get': function(req,res){res.send('local login');}
            }
        }
    };
};
