
function Database() {
    var mongoose    = require('mongoose');
    var glob        = require('glob');
    var async       = require('async');
    var config      = require('app/config.js');
    var debug       = require('debug')('app:database');

    // States
    var self = this;
    self.ready = false;
    self.busy = false;
    self.connection = false;
    self.schemas = glob.sync(config.app.schemas+'*.js', {});
    self.models = {};
    self.modelNames = {};
    self.queue = [];

    // Private functions
    function connect(callback) {
        var url = config.mongodb.url();
        var options = config.mongodb.options;

        if (this.ready) {
            callback(null, self.models);
            debug('lazy load db');
        }
        else {
            debug('Sending connection request... ');
            if (!self.busy) {
                self.busy = true;
                debug(' - Connecting ...');
                mongoose.connect(
                    url,
                    options,
                    function(err, res) {
                        if (err) {
                            debug(err);
                            callback(err);
                        }
                        else {
                            debug('Successfully connected to: ' + url);
                            self.connection = mongoose.connection;
                            self.ready = true;
                            modelize(function(err, models) {
                                self.models = models;
                                callback(null, models);
                                while(self.queue.length>0) {
                                    debug('-- Queued callback');
                                    self.queue[0](null, models);
                                    self.queue.shift();
                                }
                                self.busy = false;
                            });
                        }
                    }
                );
            }
            else {
                debug(' - Request in progress, callback queued');
                self.queue.push(callback);
            }
        }
    }
    function disconnect(callback) {
        if (!!this.connection) {
            this.connection.close();
            callback(null, true);
        }
        else {
            callback(new Error('No connection to disconnect'));
        }
    }
    function schemaToModel(schema, callback) {
        var schemaName = schema.substring(
            config.app.schemas.length,
            (typeof config.mongodb.schemas.suffix !=='undefined')?
                (schema.length-(config.mongodb.schemas.suffix.length)) : schema.length
        );
        var modelName = schemaName.charAt(0).toUpperCase()+schemaName.substring(1).toLowerCase();
        debug('Schema -> Model | '+schemaName+' ~/'+schema);
        callback(null, {
            name: schemaName,
            data: mongoose.model(modelName, require(schema))
        });
    }
    function modelize(callback) {
        if (self.models.length>0) {
            callback(null, self.models);
        }
        else {
            debug('> Converting '+ self.schemas.length +' Schemas into Models');
            async.mapSeries(self.schemas, schemaToModel, function(err, results) {
                async.each(
                    results,
                    function(model, next) {
                        self.models[model.name] = model.data;
                        self.modelNames.push(model.name);
                        next();
                    },
                    function(err) {
                        if (!err) {
                            debug('< Converting done');
                            callback(err, self.models, selv.modelNames);
                        }
                    }
                );
            });
        }
    }
    return {
        ready: function(callback) {
            connect(function(err, models, modelNames) {
                callback(err, models, modelNames);
            });
        },
        models: function() {
            return self.models;
        },
        modelNames: function() {
            return self.modelNames;
        }
    };
}
module.exports = exports = new Database();
