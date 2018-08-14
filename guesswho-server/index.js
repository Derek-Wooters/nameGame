var express = require('express');
var app = express();
var port = process.env.PORT || 3001;
var bodyParser = require('body-parser');

var gameRoutes = require('./routes/game');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use('/api/game', gameRoutes);

app.listen(port, function () {
    console.log(`App is running on ${port}`);
});