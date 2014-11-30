module.exports = function Server() {
	return {
		dependencies: {
		},
		ready: function(next) {
			var echo = require('debug')('pebb:Server');
			var config = require('app/config');

			this.app.set('port', config.app.port);
			this.server = this.app.listen(this.app.get('port'), function() {
				echo('Server is ready');
				next();
			});
		}
	};
}();
