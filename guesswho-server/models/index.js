var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/guesswho');

mongoose.Promise = Promise;

module.exports.Game = require("./game");