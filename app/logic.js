var debug = require('debug')('app:logic');

var express     = require('express');
var session     = require('express-session');
var flash       = require('express-flash');
var passport    = require('passport');
var swig        = require('swig');
var cookies     = require('cookie-parser');
var body        = require('body-parser');
var path        = require('path');
var config      = require('app/config.js');
var app	        = express();
var server;

debug('requesting API');

require('app/api.js').ready(function(err, API) {
    debug('API ready');

    if (err) {
        debug(err);
        return;
    }
    app = this;
    app._require = function(path) {
        return require(path).bind(app);
    };
    /* Sets rendering engine as SWIG for html files */
    app.engine('html', swig.renderFile);
    app.set('view engine', 'html');
    app.set('views', config.app.views);

    debug('- HTML rendering engine: SWIG');
    debug('- Views: '+ app.get('views'));

    /* Caching */
    app.set('view cache', config.app.cache);
    swig.setDefaults({cache: config.app.cache?'memory':false});

    debug('- Caching: ' + app.get('view cache'));

    /* Middlewares */
    app.use(body.json());
    app.use(body.urlencoded({extended: true}));
    app.use(cookies(config.app.secret.cookies));
    app.use(session({
        secret: config.app.secret.session,
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

    /* serve static assets */
    app.use(express.static(config.app.assets));
    debug('- Serving assets from: '+ (config.app.assets));

    /* load needed functions */
    app.routes = require('app/functions/routes.js').bind(app);

    /* run functions */
    debug('> [ROUTING]');
    app.routes(API, function() {
        debug('< [/ROUTING]');
        // after all routes are loaded, prepare server
        app.set('port', config.app.port);
        server = app.listen(app.get('port'), function () {
            debug('HTTP listening on port: '+ server.address().port);
        });
    });
}.bind(app));
