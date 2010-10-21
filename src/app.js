// setup imports
require.paths.unshift(__dirname + "/../lib/node");
require.paths.unshift(__dirname + "/../modules");
require.paths.unshift(__dirname);
/****************************************************
* node dependencies
*****************************************************/
var sys = require('sys');
var fs = require('fs');
var express = require('express');
var ejs = require('ejs');
var auth = require('auth');

/****************************************************
* Setup some logging using log4js
*****************************************************/
// create log directory if required
fs.mkdir('log', 0700);
// bring in module, have to reference directly as not called 'index.js'
var log4js = require('log4js');
// create logging appenders
log4js.addAppender(log4js.fileAppender('log/app.log'), 'app');
// get specified log and set minimum logging level
var logger = log4js.getLogger('app');
logger.setLevel('DEBUG');

/****************************************************
* tapas init
*****************************************************/
// Our Tapas module.
exports.tapas = tapas = {};
tapas.port = 3000;
tapas.directory = {};
tapas.directory.name = "People directory";
tapas.directory.version = 0.1;
tapas.directory.pageSize = 10;
tapas.directory.controllers = {};
tapas.directory.controllers.user = require('./controllers/user');
tapas.directory.controllers.client = require('./controllers/client');
tapas.directory.controllers.auth = require('./controllers/auth');

/****************************************************
* express config
*****************************************************/

// config
var app = express.createServer(
	auth([auth.Basic({validatePassword: tapas.directory.controllers.auth.validatePassword})])
);
app.use(express.staticProvider(__dirname + '/../public'));
app.set('views', __dirname + '/../views');

// var Mu = require('mu');
// app.register('.html',
//              {render: function(str, options){
//                   sys.print("SSS");
//                   return Mu.render(str, options);
//               }
//              });
app.set('view engine', 'ejs');
// Here we use the bodyDecoder middleware
// to parse urlencoded request bodies
// which populates req.body
app.use(express.bodyDecoder());
// Required by session
app.use(express.cookieDecoder());
// The methodOverride middleware allows us
// to set a hidden input of _method to an arbitrary
// HTTP method to support app.put(), app.del() etc
app.use(express.methodOverride());

tapas.server = app;

/****************************************************
* API routes
*****************************************************/

// Get the users

app.get('/users/all', function(req, res){
	    tapas.directory.controllers.user.user_list(req, res);
});

app.get('/users/add', function(req, res){
	    tapas.directory.controllers.user.user_add(req, res);
});


app.get('/', function(req, res){
	res.redirect('/users');
});
app.get('/users/create', function(req, res){
	logger.debug('protecting GET /users/create');
	req.authenticate(['basic'], function(error, authenticated) {
		tapas.directory.controllers.user.createform(req, res);
	});
});
app.post('/users', function(req, res){
	logger.debug('protecting POST /users');
	req.authenticate(['basic'], function(error, authenticated) {
		tapas.directory.controllers.user.create(req, res);
	});
});
app.post('/users/:username', function(req, res){
	logger.debug('protecting POST /users/username');
	req.authenticate(['basic'], function(error, authenticated){
		tapas.directory.controllers.user.update(req, res);
	});
});
app.get('/users/:username/edit', function(req, res) {
	logger.debug('protecting GET /users/username/edit');
	req.authenticate(['basic'], function(error, authenticated){
		tapas.directory.controllers.user.edit(req, res);
	});
});
app.get('/users.:format', tapas.directory.controllers.user.list);
app.get('/users', tapas.directory.controllers.user.index);
app.get('/users/:username.:format', tapas.directory.controllers.user.showformat);
app.get('/users/:username', tapas.directory.controllers.user.show);

// Clients

app.get('/clients', tapas.directory.controllers.client.list);
app.get('/clients/create', tapas.directory.controllers.client.createform);
app.post('/clients', tapas.directory.controllers.client.create);

// authentication
app.get('/logout', tapas.directory.controllers.auth.logout);
