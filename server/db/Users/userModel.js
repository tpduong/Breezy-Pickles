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
var UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;