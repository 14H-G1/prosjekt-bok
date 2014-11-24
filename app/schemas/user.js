var Schema = require('mongoose').Schema
  , bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
    local: {
        email: String,
        password: String,
        verified: Boolean,
        books: Array,
        username: {type: String, default: 'tutorial'},
        facebookEnabled: {type: Boolean, default: false}
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
    if (this.facebookEnabled) {
        return this.findOne({'facebook.email': email}, callback);
    }
    else {
        return this.findOne({'local.email': email}, callback);
    }
});

userSchema.static('findUsername', function(username, callback) {
    /* Find all users who have not finished the tutorial */
    if (username == 'tutorial') {
        return this.findOne({'local.username': 'tutorial'}, callback);
    }
    /* find a user by username */
    else {
        return this.findOne({'local.username': username}, callback);
    }
});

userSchema.static('findAll', function(callback) {
    return this.find({}, callback);
});

userSchema.methods.hashPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(config.mongodb.saltFactor), null);
};

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = userSchema;
