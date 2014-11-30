module.exports = function View() {
	return {
		dependencies: {
			'swig': '1.4.*'
		},
		ready: function() {
			var echo = require('debug')('pebb:View');
			echo('View is ready');
		}
	};
}();
