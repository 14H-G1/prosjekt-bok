module.exports = exports = function(API) {
	var config = require('app/config');
	var debug = require('debug')('app:routes:contact');

	var index = function(req, res) {
		res.render('contact', {
			title: config.app.name,
			id: 'contact'
		});
	};

	return {
		'/contact': { get: index }
	};
};
