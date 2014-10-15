bcrypt = require('bcrypt-nodejs');

module.exports = function(config, db) {

    var userSchema = new db.Schema({
        local: {
            email: String,
            password: String
        },
        facebook: {
            id: String,
            token: String,
            email: String,
            name: String
        }
    });

    userSchema.methods.hashPassword = function(password) {
	return bcrypt.hashSync(passport, bcrypt.genSaltSync(config.mongodb.saltFactor), null);
    };

    userSchema.methods.comparePassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
    };
    
    return userSchema;
};