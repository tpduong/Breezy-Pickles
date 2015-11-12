//============== REQUIRE DATABASE MODELS ==============\\
var User = require('./db/Users/userModel');
var Path = require('./db/Paths/pathsModel');

var niceWalk = new Path({
  identifiers: {
    keywords: ['nice', 'pleasant'],
    title: 'nice walk',
    city: 'Ann Arbor'
  },
  path: [[42.284793, -83.755351], [42.283182], [-83.750368]],
  notes: {
    coordinates: [],
    note: null
  },
  createdBy: '5643d696cf934a9a0d4b5f55',
  numLikes: 0
});

//niceWalk.save(function () {
//  console.log('Successfully saved niceWalk!');
//})