// TODO : Make mongoose.model('User') and user Schema
var mongoose = require('mongoose');
console.log('inside usermodel');
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
var userModel = mongoose.model('User', userSchema);
var kim = new userModel({
  username:'KimHa',
  name: {
    first: 'Kim',
    last: 'Ha'
  },
  address: '1600 Pennsylvania Ave.',
  likedRoutes: [],
  friends: []
}).save();
module.exports = mongoose.model('User', userSchema);