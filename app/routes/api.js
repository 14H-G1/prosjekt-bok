module.exports = function(API) {
	var async = require('async');
	var debug = require('debug')('app:routes:api');

	/*function runQuery(q, callback) {
		var vars = q.split('.');
		var data = {};
		async.eachSeries(vars,
			function(variable, cb1) {
				var a = variable.split('(');
				var v = a[0];
				var _args = a[1].slice(0,-1);
				if (_args.indexOf('+')) _args =  _args.split('+');
				else _args = [_args];
				async.mapSeries(_args,
					function(arg, cb2) {
						cb2(null,arg.replace('_',' '));
					},
					function(err,args) {
						if (args.length==1) {
							// String
							data[v] = args[0];
							cb1();
						}
						else if (args.length>1) {
							// Array
							data[v] = args;
							cb1();
						}
						else{
							cb1('syntax error');
						}
					}
				);
			},
			function(err) {
				if (!err) {
					callback(null,data);
				}
				else {
					debug(err);
					callback(err);
				}
			}
		);
	}*/

	return {
		'/api/users': {
			// get all users
			get: function(req, res) {
				API.find('all user', function(err, results) {
					if (err) res.send(err);
					res.json(results);
				});
			},
			// creating users through api disabled for now
			post: function(req, res) {
				res.json({message: 'creating users through api disabled for now'});
			}
		},
		'/api/books': {
			// get all books
			get: function(req, res) {
				API.find('all book', function(err, results) {
					if (err) res.send(err);
					res.json(results);
				});
			},
			// create a new plain book, use put to edit it
			post: function(req, res) {
				var _book = new API.models.book();
				_book.save(function(err) {
					if (err) {
						debug('book creation error');
						res.send(err);
					}
					else {
						res.json({
							message: 'new book',
							code: 200,
							id: _book._id
						});
					}
				});
			}
		},
		'api/items': {
			get: function(req, res) {
				API.find('all item', function(err, results) {
					if (err) res.send(err);
					res.json(results);
				});
			},
			post: function(req, res) {
				var _book = new API.models.item();
				_book.save(function(err) {
					if (err) {
						debug('item creation error');
						res.send(err);
					}
					else {
						res.json({
							message: 'new item',
							code: 200,
							id: _book._id
						});
					}
				});
			}
		},
		'api/users/:id': {
			get: function(req, res) {
				API.models.user().findById(req.params.id, function(err, user) {
					if (err) res.send(err);
					res.json(user);
				});
			},
			put: function(req, res) {
				API.models.user().findById(req.params.id, function(err, user) {
					if (err) res.send(err);
					res.json({
						message: 'PUT put on hold for now, wip'
					});
				});
			},
			delete: function(req, res) {
				API.models.user().remove({
					_id: req.params.id
				}, function(err, user) {
					if (err) res.send(err);
					res.json({message: 'user deleted'});
				});
			}
		},
		'api/items/:id': {
			get: function(req, res) {
				API.models.item().findById(req.params.id, function(err, item) {
					if (err) res.send(err);
					res.json(item);
				});
			},
			put: function(req, res) {
				API.models.item().findById(req.params.id, function(err, item) {
					if (err) res.send(err);
					res.json({
						message: 'PUT put on hold for now, wip'
					});
				});
			},
			delete: function(req, res) {
				API.models.item().remove({
					_id: req.params.id
				}, function(err, user) {
					if (err) res.send(err);
					res.json({message: 'item deleted'});
				});
			}
		},
		'api/books/:id': {
			get: function(req, res) {
				API.models.book().findById(req.params.id, function(err, book) {
					if (err) res.send(err);
					res.json(book);
				});
			},
			put: function(req, res) {
				API.models.book().findById(req.params.id, function(err, book) {
					if (err) res.send(err);
					res.json({
						message: 'PUT put on hold for now, wip'
					});
				});
			},
			delete: function(req, res) {
				API.models.book().remove({
					_id: req.params.id
				}, function(err, user) {
					if (err) res.send(err);
					res.json({message: 'user deleted'});
				});
			}
		},
		/*'/api/books/:x': {
			get: function(req, res) {
				var query = req.params.x;
				runQuery(query, function(err, data) {
					debug('woohoo ' + data.title);
					if (data.title.length>0) {
						API.find('book title', data.title, function(err, results) {
							if (!err) {
								if (!results) {
									//res.send('ADD BOOK ' + JSON.stringify(data));
									var _book = new API.models.book(data);
									_book.save(function(err) {
										if (err) {
											debug('user creation error');
											throw err;
										}
										else {
											res.send('NEW BOOK ' + _book._id);
										}
									});
								}
								else {
									res.send('BOOK EXISTS');
								}
							}
						});
					}
				});
			}
		},*/
		/*
		 title(Book_1)
		.authors(Ola_Nordmann+Kari_Nordmann)
		.price(199)
		.isbn(123456789)

		into Object
		*/
		/*'/api/query/:x': {
			get: function(req, res) {
				var query = req.params.x;
				runQuery(query, function(err, data) {
					if (!err) res.send(JSON.stringify(data));
				});
			}
		},*/
	};
}
