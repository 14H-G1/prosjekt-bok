module.exports = exports = function(models) {
	var config = require('app/config');
	var debug = require('debug')('app:routes:faq');

	var index = function(req, res) {
		/* query API to find all books, currently not paginated */
		res.render('faq', {
			title: config.app.name,
			id: 'faq'
		});
	};

	return {
		'/faq': { get: index }
	};
};
