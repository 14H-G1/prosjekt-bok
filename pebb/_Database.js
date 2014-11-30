module.exports = function Database() {
	return {
		dependencies: {
			"mongoose": "3.8.*",
			"passport": "0.2.*",
			"passport-facebook": "1.0.*",
			"passport-local": "^1.0.*",
			"bcrypt-nodejs": "0.0.*"
		},
		ready: function() {
			var echo = require('debug')('pebb:Database');
			echo('Database is ready');
		}
	};
}();
