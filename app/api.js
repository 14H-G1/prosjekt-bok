/* Application Programming Interface

    Restful API:
        - */

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

    this.models = {};
    this.ready = false;
    this.api = {};

    function buildIntoApp(lication, callback) {
        var app=lication;
        var router = app.Router();
    }
    function buildMap(callback) {

    }

    function build(callback) {
        database.ready(function(err, models, modelNames) {
            // lazy loading
            if (this.ready) {
                debug('lazy load API');
                callback(null, this.api);
            }
            else {
                debug('building API');
                this.models = models;
                this.modelNames = modelNames;
                this.api = {
                    models: this.models,
                    modelNames: this.modelNames,
                    find: function (query, value, cb) {
                        var dbg = require('debug')('app:api:find');
                        if (typeof value === 'function') {
                            cb = value;
                            value = '';
                        }
                        var keys = query.split(' ');
                        switch(keys[0]) {
                            case 'user':
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
                                        case 'price':
                                            if (keys[2]=='>'||keys[2]==">=") {

                                            }
                                        default:
                                            cb('couldnt interpret '+keys[1]);

                                    }
                                }
                            break;
                            case 'all':
                                if (this.modelNames.indexOf(keys[1])>-1) {
                                    dbg('all '+keys[1]);
                                    this.models[keys[1]].findAll(function(err, results) {
                                        cb(err, results);
                                    });
                                }
                            break;
                        }
                    }.bind(this),

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
        }.bind(this));
    }

    return {
        ready: function(callback) {
            debug('building process requesting database');
            build(function(err, API) {
                if (!!err) debug(err);
                else callback(err, API);
            });
        }
    };

}

module.exports = exports = new API();
