Prosjekt PEBB
=========
[![Build Status](https://travis-ci.org/14H-G1/prosjekt-bok.svg?branch=master)](https://travis-ci.org/14H-G1/prosjekt-bok)
[![Dependencies](https://david-dm.org/14H-G1/prosjekt-bok.png)](https://david-dm.org/14H-G1/prosjekt-bok)
[![devDependency Status](https://david-dm.org/14H-G1/prosjekt-bok/dev-status.svg)](https://david-dm.org/14H-G1/prosjekt-bok#info=devDependencies)

#PEBB
__Before starting make sure you have this installed:__

`node.js`
`npm`
`MongoDB`
`SASS`
`bower`
`gulp`

FAQ
--
__Q1)__ How to install the above?

__A1)__ See `docs/` folder. Bower and gulp are npm packages

#Installation

1) Clone repo

```
$ git clone https://github.com/14H-G1/prosjekt-bok.git
```
```
$ cd prosjekt-bok/
```
2) Create this file: `app/config.credentials.js`

    module.exports = {
       cookies: 'some_random_secret_here_for_security',
       session: 'some_random_secret_here_for_security',

       facebook: { // remove this object to disable fb
           id:      'clientID',
           secret:  'clientSecret',
           callback:'clientCallbackURL'
       }
    };

3) Edit app configuration in your fav text editor

```
$ start app/config.js
```

4) Initialize PEBB
```
$ node pebb/app.js
```

RESTful API
--
___Note:___ words prefixed with `:` means it is parsed as a parameter. This is used to dynamically build the API using the models built by the database.

HTTP Verb | URL | what it does
:---: | :---: | :----
__GET__ | `/api/:model` | Returns all data for specified model
__POST__ | `/api/:model` | Creates a new model with data provided
__GET__ | `/api/:model/:id` | Returns data contained by `id`
__PUT__ | `/api/:model/:id` | Updates `id` with new data
__DELETE__ | `/api/:model/:id` | Deletes `id`
