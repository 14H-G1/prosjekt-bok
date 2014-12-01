module.exports = exports = function(models) {
	var config = require('app/config');
	var debug = require('debug')('app:routes:contact');

	var index = function(req, res) {
		res.render('contact', {
			title: config.app.name,
			id: 'contact',
			authed: req.isAuthenticated()
		});
	};

	return {
		'/contact': { get: index }
	};
};
