module.exports = function(API) {
	var publish = function(req, res) {
		res.render('publish', {id: 'publish'});
	};
	return {
		'/publish': {
			'get': publish
		}
	};
};
