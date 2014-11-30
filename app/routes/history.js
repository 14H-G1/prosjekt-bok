module.exports = exports = function(models) {
	var config = require('app/config');
	var debug = require('debug')('app:routes:history');

	var index = function(req, res) {
		res.render('history', {
			title: config.app.name,
			id: 'history'
		});
	};

	return {
		'/history': { get: index }
	};
};
