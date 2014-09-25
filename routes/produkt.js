module.exports = function(options) {
	var produkt = {
		index: function(req,res) {
			res.render('produkt', {
				id: 'produkt',
				listAll: true
			});
		},
		item: function(req, res) {
			res.render('produkt', {
				id: 'produkt',
				item: req.params.id,
				listAll: false
			});
		}
	}

	return {
		'/produkt': {
			get: produkt.index,
			'/:id': {
				get: produkt.item
			}
		}
	};
}