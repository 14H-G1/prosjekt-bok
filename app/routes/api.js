module.exports = function(API) {
	var async = require('async');
	var debug = require('debug')('app:routes:api');

	function runQuery(q, callback) {
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
	}

	return {
		'/api/users/list': {
			get: function(req, res) {
				API.find('all users', function(err, results) {
					res.send(JSON.stringify(results));
				});
			}
		},
		'/api/books/list': {
			get: function(req, res) {
				API.find('all books', function(err, results) {
					res.send(JSON.stringify(results));
				});
			}
		},
		'/api/books/add/:x': {
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
		},
		/*
		 title(Book_1)
		.authors(Ola_Nordmann+Kari_Nordmann)
		.price(199)
		.isbn(123456789)

		into Object
		*/
		'/api/query/:x': {
			get: function(req, res) {
				var query = req.params.x;
				runQuery(query, function(err, data) {
					if (!err) res.send(JSON.stringify(data));
				});
			}
		},
	};
}
