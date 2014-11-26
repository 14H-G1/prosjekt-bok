module.exports = exports = function(API) {
	var config = require('app/config');
	var debug = require('debug')('app:routes:index');

	/* prepare index logic given request and response */
	var index = function(req, res) {
		/* check if request is authed */
		API.authenticated(req, res, function() {
			/* query API to find all books, currently not paginated */
			API.find('all books', function(err, results) {
				if (!err) {
					res.render('index', {
						title: config.app.name,
						id: 'index',
						books: results || []
					});
				}
			});
		});

	};
	return {
		'/': { get: index }
	};
};
