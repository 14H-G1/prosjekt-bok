var mongoose 			  = require('mongoose')
  , bcrypt				  = require('bcrypt-nodejs')
  , SALT_WORK_FACTOR	  = 10;

exports.mongoose = mongoose;

var Schema                = mongoose.Schema
  , uristring             = process.env.MONGOLAB_URI ||
                            process.env.MONGOHQ_URL ||
                            'mongodb://pebb:resirkulering@ds029960.mongolab.com:29960/pebb'
  , mongoOptions          = {db: {safe: true}};

// connect to db
mongoose.connect(uristring, mongoOptions, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Successfully connected to: ' + uristring);
  }
});

// user
var userSchema = new Schema({
	// Facebook ID or own Username
	username: {type: String, required: true, unique: true},
	// Email
	email: {type: String, required: true},
	// password
	password: {type: String, required: true},
	// contact info (link to profiles)
	facebook: {type: String},
	twitter: {type: String},
	// call this number
	phone: {type: Number}
});

// books
var bookSchema = new Schema({
	title: {type: String, required: true},
	authors: {type: Array},
	retailprice: {type: Number},
	price: {type: Number, required: true},
	isbn: {type: Number},
	qty: {type: Number, required: true}, 
	seller: {type: String, required: true}
});

bookSchema.statics.findByISBN = function(ISBNnr, callback) {
	return this.find({isbn: ISBNnr}, callback);
};
bookSchema.statics.findBySeller = function(seller, callback) {
	return this.find({seller: seller}, callback);
};
bookSchema.statics.findAllBooks = function(callback) {
	return this.find({}, callback);
}

userSchema.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password')) return next();
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err) return next(err);
		bcrypt.hash(user.password, salt, null, function(err,hash) {
			if(err) return next(err);
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function(pass, cb) {
	bcrypt.compare(pass, this.password, function(err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

var userModel = mongoose.model('User', userSchema);
var bookModel = mongoose.model('Book', bookSchema);

exports.userModel = userModel;
exports.bookModel = bookModel;