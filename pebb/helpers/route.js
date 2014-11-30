var debug = require('debug')('pebb:fn:route');

/* https://github.com/BernadineComputing/express/tree/master/examples/route-map */
module.exports = function route(a, route) {
	route = route || '';
	for (var key in a) {
		switch (typeof a[key]) {
			case 'object': // { '/path': { ... }}
				this.route(a[key], route + key);
			break;
			case 'function': // get: function(){ ... }
				this[key](route, a[key]);
				debug('%s %s', key.toUpperCase(), route);
			break;
		}
	}
};
