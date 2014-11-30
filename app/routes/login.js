module.exports = function(models) {
	config = require('app/config');

	var login = function(req, res) {
		res.render('login', {
			id: 'login'
		});
	};

	return {
		'/login': {
			get: login
		}
	};
};
