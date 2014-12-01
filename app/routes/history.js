module.exports = exports = function(models) {
	var config = require('app/config');
	var debug = require('debug')('app:routes:history');

	var index = function(req, res) {
		res.render('history', {
			title: config.app.name,
			id: 'history',
			authed: req.isAuthenticated()
		});
	};

	return {
		'/history': { get: index }
	};
};
