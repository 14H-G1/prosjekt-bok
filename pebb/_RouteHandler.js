module.exports = function RouteHandler() {
	return {
		dependencies: {
		},
		ready: function(next) {
			var glob = require('glob');
			var config = require('app/config.js');
			var debug = require('debug')('pebb:RouteHandler');
			this.app.route = require('pebb/helpers/route.js').bind(this.app);
			var ref = this;
			debug('src: '+config.app.routes+"*.js");
			glob('../'+config.app.routes+'*.js', {}, function(err, files) {
				if (err) {
					debug(err);
					next(err);
				}
				else {
					files.forEach(function(file) {
						var f = file.substring(3);
						debug(f);
						ref.app.route(require(f)(ref.database.models));
					});
					next();
				}
			});
		}
	};
}();
