/* Work in progress

    todo:
    - API routing (nice for ajax POST calls)
    - pagination on items and books
*/

/* Make sure we have an endsWith() function for strings */
if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}

function API() {
    var config      = require('app/config.js');
    var database    = require('app/database.js');
    var auth        = require('app/passport.js');
    var debug       = require('debug')('app:api');

    self = this;
    this.models = {};
    this.ready = false;
    this.api = {};

    function build(callback) {
        database.ready(function(err, models) {
            // lazy loading
            if (this.ready) {
                debug('lazy load API');
                callback(null, this.api);
            }
            else {
                debug('building API');
                this.models = models;
                this.api = {
                    models: this.models,
                    find: function (query, value, cb) {
                        var dbg = require('debug')('app:api:find');
                        if (typeof value === 'function') {
                            cb = value;
                        }
                        var keys = query.split(' ');
                        switch(keys[0]) {
                            case 'username':
                                this.models.user.findUsername(value, function(err, results) {
                                    cb(err, results);
                                });
                            break;
                            case 'email':
                                this.models.user.findEmail(value, function(err, results) {
                                    cb(err, results);
                                });
                            break;
                            case 'book':
                                if (keys.length == 1) {
                                    // expect title
                                    this.models.book.findTitle(value, function(err, results) {
                                        cb(err, results);
                                    });
                                }
                                else {
                                    switch(keys[1]) {
                                        case 'isbn':
                                            this.models.book.findISBN(value, function(err, results) {
                                                cb(err, results);
                                            });
                                        break;
                                        case 'title':
                                            this.models.book.findTitle(value, function(err, results) {
                                                cb(err, results);
                                            });
                                        break;
                                        default:
                                            cb('couldnt interpret');
                                        break;
                                    }
                                }
                            break;
                            case 'all':
                                switch(keys[1]) {
                                    case 'users':
                                        dbg('all users');
                                        this.models.user.findAll(function(err, results) {
                                            cb(err, results);
                                        });
                                    break;
                                    case 'items':
                                        dbg('all items');
                                        this.models.item.findAll(function(err, results) {
                                            cb(err, results);
                                        });
                                    break;
                                    case 'books':
                                        dbg('all books');
                                        this.models.book.findAll(function(err, results) {
                                            cb(err, results);
                                        });
                                    break;
                                }
                            break;

                        }
                    }.bind(self),

                    authenticated: function (req, res, next) {
                        if (req.isAuthenticated()) {
                            next();
                        }
                        req.flash('alert', 'You need to be logged in to view that page!');
                        res.redirect('/');
                    }
                };
                this.ready = true;
                callback(err, this.api);
            }
        }.bind(self));
    }

    return {
        ready: function(callback) {
            debug('requesting database');
            build(function(err, API) {
                if (!err) callback(err, API);
                else debug(err);
            });
        }
    };

}

module.exports = exports = new API();
