// TODO : Make mongoose.model('Path') and paths Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pathSchema = new Schema({
  identifiers: {
    keywords: Array,
    title: String,
    city: String
  },
  path: Array,
  notes: {
    coordinates: Array,
    note: String
  },
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
  numLikes: 0
});

module.exports = mongoose.model('Path', pathSchema);

