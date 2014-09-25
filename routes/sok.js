module.exports = function(options) {
	var search = function(req, res) {
		res.render('sok', {id: 'sok'});
	};
	return {
		'/sok': {
			'get': search
		}
	};
};
