//============== REQUIRE DATABASE MODELS ==============\\
var userController = require('./db/Users/userController');
var pathController = require('./db/Paths/pathsController');

var bodyParser = require('body-parser');

module.exports = function (app, express) {

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  // app.get('/', function (req, res){res.send('YOU MADE IT!')});

  // Should post with user information according to user schema
  app.route('/users')
    .post(userController.addUser)
    .get(userController.getAllUsers);

  // app.route('/users/search/:query')

  app.route('/paths')
    .post(pathController.addPath)
    .get(pathController.getAllPaths);

  app.route('/paths/search/:query')
    .get(pathController.filterPaths);
};
