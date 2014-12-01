module.exports = exports = function(models) {
	var config = require('app/config');
	var debug = require('debug')('app:routes:team');

	var index = function(req, res) {
		res.render('team', {
			title: config.app.name + ' Team',
			id: 'team',
			authed: req.isAuthenticated()
		});
	};

	return {
		'/team': { get: index }
	};
};