var debug = require('debug')('pebb:core');
var prompt = require('prompt');
var glob = require('glob');
var async = require('async');
var child_process = require('child_process');
var exec = require('child_process').exec;

function PEBB() {
	pebb = this;

	this.modules = glob.sync('_*.js');
	this.dependencies = {};
	this.triggers = {};
	debug('Found plugins: '+this.modules);

	this.hasPackageJSON = require('pebb/pkg.js').npm();
	//this.hasBowerJSON = require('pebb/pkg.js').bower();

	this.node_modules = this.hasPackageJSON ? require('package.json').dependencies : {};
	//this.bower_components = this.hasBowerJSON ? require('bower.json').dependencies : {};

	async.eachSeries(['Framework', 'View', 'Database'], use, function(err) {
		if (err) {
			debug(err);
		}
		else {
			pebb.whenReady = function() {
				trigger('ready', function() {
					debug('Serving PEBB application ...');
					pebb.server = require('app.js');
				});
			};
			prompt.start();
			prompt.message = 'Compile SASS and assets using GULP?';
			prompt.get({
				properties: {
					'[y/n]': {
						pattern: '^[YNyn\s]{1}$',
						message: 'Input must be [y/n/Y/N], CTRL+C to cancel'
					}
				}
			},	function(err, result) {
				if (!err) {
					var input = result['[y/n]'].toLowerCase();
					if (input == 'y') {
						// install packages
						var temp = exec('gulp compile',
							function(err,stdout,stderr) {
								if (err === null) {
									debug('Compiling done');
									pebb.whenReady();
								}
							}
						);
					}
					else {
						pebb.whenReady();
					}
				}
			});
		}
	});

	function use(plugin, callback) {
		var resolve = '_'+plugin+'.js';
		debug('Activating: '+ resolve);

		if (pebb.modules.indexOf(resolve)>-1) {
			var plugin_data = require('pebb/'+resolve);
			var plugin_dependencies = plugin_data.dependencies;
			var pdl = Object.keys(plugin_dependencies).length;

			if (pebb.hasPackageJSON) {
				var toBeInstalled = {};
				// check if dependencies needs to installed
				for(var p in plugin_dependencies) {
					if (typeof pebb.node_modules[p] === 'undefined') {
						toBeInstalled[p] = plugin_dependencies[p];
						continue;
					}
				}
				var tbil = Object.keys(toBeInstalled).length;
				if (tbil > 0) {
					debug('['+(pdl-tbil)+'/'+pdl+'] installed, needs: '+Object.keys(toBeInstalled));
					prompt.start();
					prompt.message = 'Install '+plugin+' dependencies?';
					prompt.get({
						properties: {
							'[y/n]': {
								pattern: '^[YNyn\s]{1}$',
								message: 'Input must be [y/n/Y/N], CTRL+C to cancel'
							}
						}
					},	function(err, result) {
							if (!err) {
								var input = result['[y/n]'].toLowerCase();
								if (input == 'y') {
									// install packages
									require('pebb/installer.js')
									.install(toBeInstalled, function(err) {
										callback(err);
									});
									once('ready', plugin_data.ready);
								}
								else {
									// exit
									callback('PEBB needs dependencies to run, exiting!');
								}
							}
						}
					);
				}
				else {
					debug('all dependencies installed!');
					once('ready', plugin_data.ready);
					callback();
				}
			}
			else {
				// no package.json
				callback('no package.json');
			}
		}
	}

	function once(trigger, callback) {
		if(typeof trigger === 'function') {
			debug('once(trigger,cb): trigger must be a string and cb a function');
			callback(new Error('expected trigger word'));
		} else {
			if (typeof callback ==='function') {
				if (typeof pebb.triggers[trigger]==='undefined') {
					pebb.triggers[trigger] = [callback];
				}
				else {
					pebb.triggers[trigger].push(callback);
				}
			}
		}
	}
	function trigger(word, callback) {
		var type = typeof pebb.triggers[word];
		switch(type) {
			case 'undefined':
				debug(word+' as a word is not a registered trigger');
				break;
			case 'object':
				var trigs = pebb.triggers[word];
				async.eachSeries(trigs, function(trig, cb) {
					trig();
					cb();
				}, function(err) {
					if (!!err) {
						debug(err);
						callback(err);
					}
					else {
						if (typeof callback === 'function') {
							callback();
						}
					}
				});
				break;
			default:
				debug('uncatched trigger word: ' + word + ':'+type);
		}
	}
}

module.exports = exports = new PEBB();
