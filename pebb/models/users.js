var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var config = require('app/config.js');

var userSchema = new Schema({
	local: {
		email: String,
		password: String,
		verified: Boolean,
		books: Array,
		username: {type: String, default: 'tutorial'}
	},
	facebook: {
		id: String,
		token: String,
		email: String,
		name: String
	},
	contact: {
		facebook: String,
		twitter: String,
		google: String,
		phone: Number
	}
});

userSchema.static('findVerified', function(callback) {
	return this.find({'local.verified': true}, callback);
});

userSchema.static('findUnverified', function(callback) {
	return this.find({'local.verified': false}, callback);
});

userSchema.static('findEmail', function(email, callback) {
	return this.findOne({'local.email': email}, callback);
});

userSchema.static('findFacebookEmail', function(email, callback) {
	return this.findOne({'facebook.email': email}, callback);
});
userSchema.static('findFacebookID', function(email, callback) {
	return this.findOne({'facebook.id': email}, callback);
});

userSchema.static('findUsername', function(username, callback) {
	/* Find all users who have not finished the tutorial */
	if (username == 'tutorial') {
		return this.find({'local.username': 'tutorial'}, callback);
	}
	/* find a user by username */
	else {
		return this.findOne({'local.username': username}, callback);
	}
});

userSchema.static('findAll', function(callback) {
	return this.find({}, callback);
});

userSchema.methods.facebookEnabled = function() {
	return this.local.facebook
}

userSchema.methods.hashPassword = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(config.mongodb.saltFactor||10), null);
};

userSchema.methods.comparePassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
