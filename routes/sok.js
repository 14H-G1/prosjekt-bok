module.exports = function(options) {
	var search = function(req, res) {
		res.render('sok', {});
	};
	return {
		'/sok': {
			'get': search
		}
	};
};
