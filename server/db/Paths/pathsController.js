// TODO : write a bunch o' functions
var Path = require('./pathsModel');
// var url = require('url');

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
        res.status(200).send([]); // send empty array if no paths in database
      }
    },function (err) {
        console.error(err);
        res.status(400).send('Error when trying to retrieve all paths!');
    });
  },

  filterPaths: function (req, res, next) {
    var searchQuery = parser(req.params.query); // using parser helper function to create an object from our url path
    Path.find(serachQuery)
    .then(function (paths) {
      if(paths){
        res.send(paths);
      } else {
        res.status(400).send("No Paths that fit this search query");
      }
    }, function (err) {
      console.error(err);
      res.send(500);
    });
  }

};

// helper parser function for our path --> turns into an objecct that becomes a search query
var parser = function (string) {
  var key = value = '';
  var result = {};
  var currentIsKey=true;
  for(var i=0; i<string.length; i++){
    if(string[i] === '=' || string[i] === '&'){
      if(!currentIsKey){
        result[key] = value;
        key = value = '';
      }
      currentIsKey = !currentIsKey;
    } else {
      if(currentIsKey){
        key += string[i];
      }else{
        value += string[i];
      }
    }
  }
  result[key] = value;
  return result;
};

/* url path after search should come in the style of 
key1=value1&key2=value2
so it can be easily parsed */
