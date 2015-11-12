var express = require("express");
var mongoose = require('mongoose');
var user = require('./db/Users/userModel');
mongoose.connect('mongodb://localhost/breezy');

var app = express();

var PORT = process.env.PORT || 3000;

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// TODO: app.use(express.static(***CLIENT STUFF HERE***))

app.get('/', function (req, res){res.send('YOU MADE IT!')});
app.listen(PORT);