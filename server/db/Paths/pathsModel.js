// TODO : Make mongoose.model('Path') and paths Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pathSchema = new Schema({
  identifiers: {
    keywords: Array,
    title: String,
    city: String
  },
  path: Array, // array of arrays (each subarray is a tuple of longitude and latitude as per Google Maps api)
  notes: Array, // where the comment will show up physically on map, array of 3-tuples [lat, long, messageText]
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}, // creates foreign key pointing to user who created path
  numLikes: 0
});

module.exports = mongoose.model('Path', pathSchema);

/*
============= EXAMPLE CODE TO SAVE NEW PATH TO DATABASE =============

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

niceWalk.save(function () {
  console.log('Successfully saved niceWalk!');
})
*/