var debug = require('debug')('pebb:pkg');

module.exports = exports = function pkgJSON() {
	var fs = require('fs');
	return {
		npm: function() {
			debug('npm, fs.existsSync');
			return fs.existsSync('../package.json');
		},
		bower: function() {
			debug('bower, fs.existsSync');
			return fs.existsSync('../bower.json');
		}
	};
}();
