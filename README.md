Prosjekt PEBB
=========
[![Build Status](https://travis-ci.org/14H-G1/prosjekt-bok.svg?branch=master)](https://travis-ci.org/14H-G1/prosjekt-bok)
[![Dependencies](https://david-dm.org/14H-G1/prosjekt-bok.png)](https://david-dm.org/14H-G1/prosjekt-bok)

PEBB is an open e-commerce platform for selling and purchasing used curriculum books. You can see the website in action [here](http://pebb.no). If you find a bug, a pull request is much appriciated.

PEBB is built using [Node.js](http://nodejs.org)

##Installation process
1) Clone the git repository
```
$ git clone https://github.com/14H-G1/prosjekt-bok.git
```
2) Install dependencies
```
$ cd projekt-bok
$ npm update
```

3) Before running the node application you need to setup a configuration
> Note that you will need a [MongoDB](https://www.mongodb.org/) database
```
TO BE DONE
```

4) Run the node application
```
$ node app
```

##Preparing a MongoDB database


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
  "passport": "
  "passport-facebook": "1.0.3",
  "passport-local": "^1.0.*",
  "bcrypt-nodejs": "0.0.*",
  "mongoose": "3.8.*"
}
```

##TODO:
- ~~Dynamic routes~~
- Database handling
- Search algorithm
- Authentication
