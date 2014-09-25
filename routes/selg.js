module.exports = function(options) {
	var sell = function(req, res) {
		res.render('selg', {id: 'selg'});
	};
	return {
		'/selg': {
			'get': sell
		}
	};
};
