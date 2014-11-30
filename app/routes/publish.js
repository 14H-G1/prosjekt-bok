module.exports = function(model) {
	var publish = function(req, res) {
		/* check if request is authed */
		if (req.isAuthenticated()) {
			res.render('publish', {id: 'publish'});
		}
		else res.redirect('/');
	};
	return {
		'/publish': {
			'get': publish
		}
	};
};
