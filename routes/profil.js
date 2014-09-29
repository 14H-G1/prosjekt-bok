module.exports = function(options) {
	var profile = function(req, res) {
		res.render('profil', {id: 'profil'});
	};
	return {
		'/profil': {
			'get': profile
		}
	};
};
