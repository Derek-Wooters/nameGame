var express = require('express');
var router = express.Router();
var db = require("../models");
var helpers = require("../helpers/game");

router.route('/')
    .get(helpers.createGame)

router.route('/:gameId')
    .put(helpers.updateGame)

module.exports = router;