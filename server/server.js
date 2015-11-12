var express = require("express");
var mongoose = require('mongoose');
var path = require('path');
var middleware = require('./middleware'); // returns a function

//============== HOOK UP DATABASE ==============\\
mongoose.connect('mongodb://localhost/breezy');

var app = express();

//============== DECORATE APP WITH MIDDLEWARE ==============\\
middleware(app, express);

var PORT = process.env.PORT || 3000;



app.use(express.static(__dirname+'/../client'));

app.listen(PORT);
