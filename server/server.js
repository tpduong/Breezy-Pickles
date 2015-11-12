var express = require("express");
var mongoose = require('mongoose');
var middleware = require('./middleware'); // returns a function
var router = require('./router.js');

//============== HOOK UP DATABASE ==============\\
mongoose.connect('mongodb://localhost/breezy');

var app = express();

//============== DECORATE APP WITH MIDDLEWARE ==============\\
middleware(app, express);

var PORT = process.env.PORT || 3000;

// TODO: app.use(express.static(***CLIENT STUFF HERE***))

app.get('/', function (req, res){res.send('YOU MADE IT!')});
app.listen(PORT);