module.exports = function(API) {
	var publish = function(req, res) {
		/* check if request is authed */
		API.authenticated(req, res, function() {
			res.render('publish', {id: 'publish'});
		});
	};
	return {
		'/publish': {
			'get': publish
		}
	};
};
