var Schema = require('mongoose').Schema;

var itemSchema = new Schema({
	title: 			{type: String, required: true},
	category: 		{type: String, default: 'books'}, // temp
	seller: 		{type: String, required: true},
	qty: 			{type: Number, required: true},
   	retailprice: 	{type: Number},
	price: 			{type: Number, required: true},
	isbn: 			{type: Number, required: true},
   	sold: 			{type: Boolean},
	date: 			{type: Number}
});

/* find all books which are sold */
itemSchema.static('findSalesSold', function(callback) {
	return this.find({sold: true}, callback);
});
/* find books by seller */
itemSchema.static('findBySeller', function(email, callback) {
	return this.findOne({'local.email': email}, callback);
});
/* find book for sale by ISBN */
itemSchema.static('findByISBN', function(isbnNR, callback) {
	return this.findOne({'isbn': isbnNR}, callback);
});
/* find books for sale priced over given value */
itemSchema.static('findPriceAbove', function(number, callback) {
	return this.find({'price': {$gt: number}}, callback);
});
/* find books for sale priced below given value */
itemSchema.static('findPriceBelow', function(number, callback) {
	return this.find({'price': {$lt: number}}, callback);
});
/* find books for sale by price given min,max range */
itemSchema.static('findPriceRange', function(min, max, callback) {
	return this.find({'price': {$gt: min, $lt: max}}, callback);
});
/* find all items */
itemSchema.static('findAll', function(callback) {
	return this.find({}, callback);
});

module.exports = itemSchema;
