module.exports = function (config, db) {
    return {
        /* API users
         *
         * Handle user functionality
         * */
        users: {
            add: function (data, callback) {
                var user = new db.userModel(data).save(function(err) {
                    if (err) {
                        if (config.app.verbose) {
                            console.log('API Error [newUser]: ' + err);
                        }
                        return false;
                    }
                });
                return user;
            },
            
            find: function(critera, value) {
                var keyWordsFound = criteria.split(" ");
                var lookfor
                
                switch(lookFor) {
                    case 'email':           lookFor = 'local.email';    break;
                    case 'facebook email':  lookFor = 'facebook.email'; break;
                    case 'facebook id':     lookFor = 'facebook.id';    break;
                    case 'name':            lookFor = 'facebook.name';  break;
                    case 'facebook name':   lookFor = 'facebook.name';  break;
                }
                return db.userModel.findOne({
                    lookFor : value
                });
            },
        },
        /* API for JSON I/O
         *
         * Usually for communicating with Ajax via jQuery on client side
         * or answer certain requests specifically wanting json return type.
         * */
        json: {
            findUser: function(email) {
                
            }
        }
    };
};

// random vrøvl som bare ligger her

// make test user
/*var user = new db.userModel({
  username: "marcus",
  email: ",
  password: "",
  phone: 
});*/
/*var book = new db.bookModel({
  title: "",
  authors: ["Wrtor"],
  retailprice: 69,
  price: 99,
  qty: 1,
  isbn: 1,
  seller: "Naiel"
});

book.save(function(err) {
  if (err) {
    console.log('error: ' + err);
  }
  else {
    console.log('new book: ' + book.title);
  }
});*/

/*db.bookModel.findByISBN(9780201730470, function(err, books) {
  console.log(books);
});*/
/*db.bookModel.findBySeller('Marcus', function(err, books) {
  console.log(books);
});*/