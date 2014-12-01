module.exports = function API() {
	return {
		dependencies: {
		},
		ready: function(next) {
			var echo = require('debug')('pebb:API');
			var models = this.database.models;
			var modelNames = Object.keys(models);

			this.app.get('/api/isloggedin', function(req, res) {
				var a = {
					status: !!req.isAuthenticated()
				};
				res.status(200);
				res.json(a);
			});

			this.app.get('/api/:model', function(req, res) {
				var m = req.params.model;
				if (modelNames.indexOf(m) > -1) {
					models[m].find(function(err, result) {
						if (err) res.send(err);
						res.json(result);
					});
				}
				else {
					res.status(404);
					res.json({
						message: m + ' is not a valid Model'
					});
				}
			});

			this.app.post('/api/:model', function(req, res) {
				var m = req.params.model;
				if (modelNames.indexOf(m) > -1) {
					var data = req.body;
					var temp = new models[m](data);
					temp.save(function(err) {
						if (err) {
							echo(m+' creation error');
							res.send(err);
						}
						else {
							res.status(200);
							res.json({
								id: temp._id
							});
						}
					});
				}
			});

			this.app.get('/api/:model/:id', function(req, res) {
				var m = req.params.model;
				var id = req.params.id;

				if (modelNames.indexOf(m) > -1) {
					models[m].findById(id, function(err, result) {
						if (err) res.send(err);
						res.json(result);
					});
				}
			});

			this.app.put('/api/:model/:id', function(req, res) {
				var m = req.params.model;
				var id = req.params.id;

				if (modelNames.indexOf(m) > -1) {
					models[m].findById(id, function(err, result) {
						var data = req.body;
						for(var key in data) {
							result[key] = data[key];
						}
						result.save(function(err) {
							if (err) {
								echo(m+' update error');
								res.send(err);
							}
							else {
								res.status(200);
								res.json({
									id: result._id,
									message: 'updated'
								});
							}
						});
					});
				}
			});

			this.app.delete('/api/:model/:id', function(req, res) {
				var m = req.params.model;
				var id = req.params.id;

				if (modelNames.indexOf(m) > -1) {
					models[m].remove({
							_id: id
						},
						function(err, user) {
							if (err) res.send(err);
							else res.json({message: 'deleted'});
						}
					);
				}
			});

			next();
		}
	};
}();
