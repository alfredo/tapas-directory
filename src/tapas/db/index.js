// TODO: pick up settings files
require.paths.unshift('vendor/mongoose');
var settings = ('settings');
var sys = require("sys");
var db_backend = {};
db_backend.backend = require('mongoose/mongoose').Mongoose;
db_backend.db = db_backend.backend.connect('mongodb://localhost/tapas');
module.exports = db_backend;