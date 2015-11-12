//TODO: app.use ALL THE MIDDLEWARE!!!!!!!!
var bodyParser = require('body-parser');

module.exports = function (app, express) {

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

}
