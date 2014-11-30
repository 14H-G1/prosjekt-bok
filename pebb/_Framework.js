module.exports = function Framework() {
	return {
		dependencies: {
			"express": "4.10.*",
			"express-session": "1.9.*",
			"express-flash": "0.0.2",
			"body-parser": "1.9.*",
			"cookie-parser": "1.3.*",
		},
		ready: function() {
			var echo = require('debug')('pebb:Framework');
			echo('Framework is ready');
		}
	};
}();
