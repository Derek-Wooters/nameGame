var mongoose = require('mongoose');

var gameSchema = new mongoose.Schema({
    user: {
        type: String
    },
    answer: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    entries:{
        type: Object,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

var Game = mongoose.model('Game', gameSchema);

module.exports = Game;