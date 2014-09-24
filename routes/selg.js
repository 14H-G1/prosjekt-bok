module.exports = function(options) {
	var sell = function(req, res) {
		res.render('selg', {});
	};
	return {
		'/selg': {
			'get': sell
		}
	};
};
