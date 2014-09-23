module.exports = function(options) {
	var index = {
		view: function(req, res) {
			res.render('index', {
				title: options.index.title
			})
		}
	};
	return {
		'/': { get: index.view }
	};
};
