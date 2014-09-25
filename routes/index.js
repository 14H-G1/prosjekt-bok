module.exports = function(options) {
	var index = {
		view: function(req, res) {
			res.render('index', {
				title: options.index.title,
				id: 'index'
			})
		}
	};
	return {
		'/': { get: index.view }
	};
};
