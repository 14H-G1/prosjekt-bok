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