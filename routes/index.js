module.exports = function(options, db) {
	var index = {
		view: function(req, res) {
			db.bookModel.findAllBooks(function(err, books) {
				res.render('index', {
					title: options.app.name,
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
