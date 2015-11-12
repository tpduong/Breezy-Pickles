//============== REQUIRE DATABASE MODELS ==============\\
var userController = require('./db/Users/userController');
var pathController = require('./db/Paths/pathsController');

var bodyParser = require('body-parser');

module.exports = function (app, express) {

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  // app.get('/', function (req, res){res.send('YOU MADE IT!')});

//=============== ROUTES FOR USERS ===============\\
  app.route('/users')
    .get(userController.getAllUsers);

  app.route('/users/signup')
    .post(userController.addUser);
    
  app.route('/users/signin')
    .post(userController.signIn);


//=============== ROUTES FOR PATHS ===============\\
  app.route('/paths')
    .post(pathController.addPath)
    .get(pathController.getAllPaths);

  app.route('/paths/search/:query')
    .get(pathController.filterPaths);
};
