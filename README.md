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
[How to install Node.js &  NPM](docs/how-to-install-node-js.md)

[How to install MongoDB](docs/how-to-install-mongodb.md)

[How to install SASS](docs/how-to-install-sass.md)

#Installation

1) Clone repo

```
$ git clone https://github.com/14H-G1/prosjekt-bok.git
```
```
$ cd prosjekt-bok/
```

2) Install dependencies

```
$ npm update
$ bower update
```

3) Create this file: 'app/config.credentials.js'

    // In later releases this is where you store i.e. facebook API credentials
    module.exports = {
	   'cookies': 'some_random_secret_here_for_security',
	   'session': 'some_random_secret_here_for_security'
    };

4) Edit configuration in your favourite text editor

```
$ start app/config.js
```

4) Start via gulp

```
$ gulp livereload start
```

API
--

Lets add a few books

```
GET /api/books/add/title(Book_1).authors(Ola+Kari).price(199).isbn(123456789)
```

```
GET /api/books/add/title(Book_2).authors(Per+Askeladden).price(299).isbn(987654321)
```

Lets take a look

```
GET /api/books/list
```

These two books are now displayed on index!

```
GET /
```
