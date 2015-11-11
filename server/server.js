var express = require("express");
var app = express();

var PORT = process.env.PORT || 3000;

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// TODO: app.use(express.static(***CLIENT STUFF HERE***))


app.listen(PORT);