module.exports = function(options) {
	var index = {
		view: function(req, res) {
			var db = require('../models/database');

			db.bookModel.findAllBooks(function(err, books) {
				res.render('index', {
					title: options.index.title,
					id: 'index',
					listOfBooks: books
				});
			});
		}
	};
	return {
		'/': { get: index.view }
	};
};
