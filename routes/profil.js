module.exports = function(options, db) {
	var profile = function(req, res) {
		res.render('profil', {
			id: 'profil',
			bookList: false
		});
	};
	var profileWithID = function(req, res) {
		var db = require('../models/database');
		db.bookModel.findBySeller(req.params.id, function(err,foundBooks) {
			res.render('profil', {
				id: 'profil',
				bookList: true,
				books: foundBooks
			});
		});
	};
	return {
		'/profil': {
			'get': profile,
			'/:id': {
				get: profileWithID
			}
		}
	};
};
