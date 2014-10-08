Prosjekt PEBB
=========
[![Build Status](https://travis-ci.org/14H-G1/prosjekt-bok.svg?branch=master)](https://travis-ci.org/14H-G1/prosjekt-bok)

PEBB is an open e-commerce platform for selling and purchasing used curriculum books. You can see the website in action [here](http://pebb.no). If you find a bug, a pull request is much appriciated.

##Installation process
First clone the git repository
```
$ git clone https://github.com/14H-G1/prosjekt-bok.git
```
Then install dependencies
```
$ cd projekt-bok
$ npm update
```
> Note that you will need a [MongoDB](http://mongodb.com) database

Lastly run the app
```
$ node app
```

##Prepearing a MogngoDB database
Comming soon...

##More on dependencies
PEBB is built using various node modules and MongoDB.

###Node Modules
```
"dependencies": {
  "body-parser": "1.8.*",
  "cookie-parser": "1.3.*",
  "debug": "2.0.0",
  "express": "4.9.*",
  "express-session": "1.8.*",
  "glob": "4.0.*",
  "node-sass": "0.9.*",
  "swig": "1.4.*",
  "passport": "0.2.*",
  "passport-facebook": "1.0.3",
  "bcrypt-nodejs": "0.0.*",
  "mongoose": "3.8.*"
}
```

##TODO:
- ~~Dynamic routes~~
- Database handling
- Search algorithm
- Authentication
