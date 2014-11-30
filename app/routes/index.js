module.exports = exports = function(models) {
	var config = require('app/config');
	var debug = require('debug')('app:routes:index');

	/* prepare index logic given request and response */
	var index = function(req, res) {
		/* query API to find all books, currently not paginated */
		models.books.find(function(err, results) {
			if (!err) {
				res.render('index', {
					title: config.app.name,
					id: 'index',
					books: results || []
				});
			}
		});
	};
	return {
		'/': { get: index }
	};
};
