module.exports = function(moels) {
	var search = function(req, res) {
		res.render('search', {
			id: 'search',
			advanced: false
		});
	};
	var advanced = function(req, res) {
		var query = req.params.args || '';
		/*
		var runQuery = function(q) {
			var a = q.split('_');
			var b = {};
			var c = '';
			for (var i=0;i<a.length;) {
				switch(key) {
					// variables
					case 'price':
					break;
					case 'isbn':
					break;
					// operators
					case 'lt':
					break;
					case 'gt':
				}
			}
		};*/
		if (query.length > 0) {
			res.render('search', {
				id: 'search',
				advanced: true
			});
		}
		else {
			res.render('search', {
				id: 'search',
				advanced: true
			});
		}
	};
	return {
		'/search': {
			'get': search,
			'/advanced': {
				'get': advanced,
				'/:args': {
					'get': advanced
				}
			}
		}
	};
};
