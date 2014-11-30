module.exports = function Database() {
	return {
		dependencies: {
			"mongoose": "3.8.*",
			"bcrypt-nodejs": "0.0.*"
		},
		ready: function(next) {
			var echo = require('debug')('pebb:Database');
			var mongoose = require('mongoose');
			var config = require('app/config.js');

			var db = this;
			var url = config.mongodb.url();
			var options = config.mongodb.options;

			this.database = {};
			echo('Connecting to MongoDB via Mongoose');
			mongoose.connect(
				url,
				options,
				function(err, res) {
					if (err) {
						echo(err);
						next(err);
					}
					else {
						echo('Successfully connected to: ' + url);
						db.database.models = {
							'users': require('pebb/models/users.js'),
							'books': require('pebb/models/books.js'),
							'items': require('pebb/models/items.js')
						};
						next();
					}
				}
			);
		}
	};
}();
