module.exports = function(models) {
	var config = require('app/config');

	var profile = function(req, res) {
		if (req.isAuthenticated()) {
			res.render('profile', {
				id: 'profile',
				bookList: false,
				authed: req.isAuthenticated()
			});
		}
		else {
			res.redirect('/');
		}
	};
	var profileWithID = function(req, res) {
		var id = req.params.id;

		/* Tutorial, will be moved into a plugin later */
		if (id == 'tutorial') {
			res.render('tutorial', {
				id: 'tutorial',
				title: 'Learn how to use '+ config.app.name,
				authed: req.isAuthenticated()
			});
		}
		/* See if we find a user matching the ID */
		else {
			/*API.find('username matching', id, function (err, user) {
				if (!err) {
					var userBooks = {};
					var userHasBooks = false;
					if (user.books.length>0) {
						userBooks = user.books;
						userHasBooks = true;
					}
					res.render('profile', {
						id: 'profile',
						bookList: userHasBooks,
						books: userBooks
					});
				}
			});*/
		}
	};
	return {
		'/profile': {
			get: profile/*,
			'/:id': {
				get: profileWithID
			}*/
		}
	};
};
