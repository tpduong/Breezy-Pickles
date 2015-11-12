// TODO : write a bunch o' functions
var User = require('./userModel');
// var url = require('url');

module.exports = {
  addUser: function (req, res, next) {
    var userInfo = req.body;
    User.findOne({username: userInfo.username}).then(function (user) {
      if (user) {
        res.status(400).send('That username already exists in the database!');
      }
      else {
        new User(userInfo).save();
        res.status(200).send('user added');
      }
    }, function (err) {
      console.error(err);
      res.status(500).send('There was an error adding user. Sorry!');
    });
  },

  getAllUsers: function (req, res, next) {
    User.find({}).then(function (users) {
      if (users){
        res.status(200).send(users);
      }
      else {
        res.status(200).send([]); // send empty array if no users exist in database
      }
    }, function (err) {
      console.error(err);
      res.status(400).send('Error when trying to retrieve all users!');
    });
  },

  signIn: function (req, res, next) {
    var userInfo = req.body;
    User.findOne({username: userInfo.username}).then(function (user) {
      if (user) {
        if (user.comparePasswords(userInfo.password)){
          res.status(200).send(user);
        }else{
          res.status(400).send("User password does not match");
        }
      }
      else {
        res.status(400).send("User not found");
      }
    }, function (err) {
      console.error(err);
      res.status(500).send('There was an error adding user. Sorry!');
    });
  }


};
