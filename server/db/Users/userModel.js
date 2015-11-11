// TODO : Make mongoose.model('User') and user Schema
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  name: {
    first: String,
    last: String
  },
  address: String,
  likedRoutes: Array,
  friends: Array
});

module.exports = mongoose.model('User', userSchema);