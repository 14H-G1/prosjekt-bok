var debug = require('debug')('app:fn:routes');

var glob = require('glob');
var config = require('app/config.js');

module.exports = function routes(API, callback) {
	this.route = require('app/functions/route.js').bind(this);
	var io = typeof callback === 'function';
	var self = this;
	this.API = API;
	debug('src: '+config.app.routes+"*.js");
	glob(config.app.routes+"*.js", {}, function (err, files) {
		if (err) {
			if (io) callback(err);
			debug(err);
		}
		else {
			files.forEach(function(file) {
				self.route(require(file)(self.API));
				//debug(file);
			});
			if (io) callback(null);
		}
	});
};
