module.exports = exports = function() {
	var debug = require('debug')('pebb:installer');
	var async = require('async');
	var exec = require('child_process').exec;

	return {
		install: function(mods, cb) {
			switch(typeof mods) {
				case 'object':
					// install each in series, then cb
					var list = Object.keys(mods);
					async.eachSeries(list, function(key, callback) {
						var pkg = key+'@'+mods[key];
						debug('installing '+ pkg)
						var temp = exec(
							'npm install --save '+pkg,
							function(error, stdout, stderr) {
								//debug('stdout '+stdout);
								if (stderr) {
									debug('stderr '+stderr);
								}
								callback(error);
							}
						);
					}, function(err) {
						if (err) debug(err);
						else debug('All dependencies successfully installed');
						cb(err);
					});
					break;
				default:
					cb('invalid input');
			}
		}
	};
}();
