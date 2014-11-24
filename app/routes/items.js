module.exports = function(API) {
	config = require('app/config');
	var produkt = {
		index: function(req,res) {
			res.render('item', {
				id: 'item'
			});
		},
		item: function(req, res) {
			res.render('item', {
				id: 'item',
				item: req.params.id
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
