// TODO : write a bunch o' functions
var Path = require('./pathsModel');

module.exports = {
  addPath: function (req, res, next) {
    var pathInfo = req.body;
    console.log(pathInfo);
    new Path(pathInfo).save( function (err) {
      console.error(err);
      res.status(500).send("There was an error adding the path");
    });
    next();
  },

  getAllPaths: function (req, res, next) {
    Path.find({})
    .then(function (paths) {
      if (paths){
        res.status(200).send(paths);
      }
      else {
        res.status(200).send([]); // send empty array if no users exist in database
      }
    },function (err) {
        console.error(err);
        res.status(400).send('Error when trying to retrieve all paths!');
    });
  },

  filterPaths: function (req, res, next) {

  }

};
