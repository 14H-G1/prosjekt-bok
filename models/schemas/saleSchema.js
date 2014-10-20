module.exports = function(config, db) {

	var saleSchema = new db.Schema({
		title: {type: String, required: true},
		seller: {type: String, required: true},
                retailprice: {type: Number},
		price: {type: Number},
		isbn: {type: Number, required: true},
                sold: {type: Boolean}
	});
        
        saleSchema.static('findSalesSold', function(callback) {
            this.find({sold: true}, callback);
        });
        saleSchema.static('findBySeller', function(email, callback) {
		return this.findOne({'local.email': email}, callback);
	});
        saleSchema.static('findByISBN', function(isbnNR, callback) {
		return this.findOne({'isbn': isbnNR}, callback);
	});
	saleSchema.static('findPriceAbove', function(number, callback) {
		return this.find({'price': {$gt: number}}, callback);
	});
	saleSchema.static('findPriceBelow', function(number, callback) {
		return this.find({'price': {$lt: number}}, callback);
	});
	saleSchema.static('findPriceRange', function(min, max, callback) {
		return this.find({'price': {$gt: min, $lt: max}}, callback);
	});

        return saleSchema;
};