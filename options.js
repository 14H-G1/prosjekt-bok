var path = require('path');

/*	Return options	*/

module.exports = {
	index: {
		title: "PEBB"
	},
	models: 		path.join(__dirname, 'models'),	
	views: 			path.join(__dirname, 'views'),
	controllers: 	path.join(__dirname, 'controllers'),
	assets: 		path.join(__dirname, 'assets')
};
