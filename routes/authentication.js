/*  Authentication routing
 *
 *  1) Setup up passport with various authentication methods which Strategies use
 *  2) Return routing logic
 * */

module.exports = function(options, db) {
    var passport = require('passport');
    
    var local = passport.authenticate('local', {
        successRedirect: '/profil',
        failureRedirect: '/'
    });
    
    var facebook = {        
        
    };
    
    return {
        '/local': {
            'post': local
        }
    };
};