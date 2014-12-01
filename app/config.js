/*	This config.js file contains configuration for
*	your project, app, website, etc.
*
*	Depending on your project, you may need to access
*	sensitive data, such as API keys, database credentials,
*	email for newsletter account = user:password, the examples are many.
*
*	_As of now_ this is required from 'app/config.credentials.js'
*   which is basically a returned Object with the sensitive data.
*
*	In this file you will only see credentials.x when accessing touchy data.
*
*	config.credentials.js is not committed as it is listed in .gitignore
*	NOTE: Do not share or commit the credentials file,
*	you choose how to store it be it a cloud, ftp, stream, something!
* */

function Config() {
	var self = this;
	var debug = require('debug')('pebb:app:config');
	var credentials = require('app/config.credentials.js');

	var facebookEnabled = typeof credentials['facebook'] === 'object';
	var twitterEnalbed = typeof credentials['twitter'] === 'object';
	var googleEnabled = typeof credentials['google'] === 'object';

	this.app = {
		// general
		name:		'PEBB',			// application name
		port: 		80, 			// 80 needs administrator rights/sudo
		cache: 		false,			// true in production
		debug: 		true,
		// folders
		assets: 	'app/assets/',
		routes: 	'app/routes/',
		views: 		'app/views/',
		sass: 		'app/sass/',

		secret: {
			cookies: credentials.cookies,
			session: credentials.session
		}
	};
	this.mongodb = {
		url: function(db) {
			return 'mongodb://127.0.0.1/'+(db||self.app.name);
		},
		options: {
			db: {safe: true},
			server: {
				socketOptions: {keepAlive: 1}
			}
		}
	};
	if (facebookEnabled) {
		this.facebook = {
			id: 		credentials.facebook.id,
			callback: 	credentials.facebook.callback,
			secret: 	credentials.facebook.secret
		};
	}

	return {
		app: this.app,

		mongodb: this.mongodb,

		facebook: facebookEnabled ? {
			id: this.facebook.id,
			callback: this.facebook.callback,
			secret: this.facebook.secret
		}:false
	};
}

module.exports = exports = new Config();
