module.exports = function(model) {
	var publish = function(req, res) {
		/* check if request is authed */
		if (req.isAuthenticated()) {
			res.render('publish', {
				id: 'publish',
				authed: req.isAuthenticated()
			});
		}
		else res.redirect('/');
	};
	return {
		'/publish': {
			'get': publish
		}
	};
};
