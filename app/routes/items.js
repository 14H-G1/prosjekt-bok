module.exports = function(models) {
	config = require('app/config');
	var produkt = {
		index: function(req,res) {
			res.render('item', {
				id: 'item',
				authed: req.isAuthenticated()
			});
		},
		item: function(req, res) {
			res.render('item', {
				id: 'item',
				item: req.params.id,
				authed: req.isAuthenticated()
			});
		}
	};

	return {
		'/item': {
			get: produkt.index,
			'/:id': {
				get: produkt.item
			}
		}
	};
};
