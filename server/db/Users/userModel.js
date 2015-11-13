// TODO : Make mongoose.model('User') and user Schema
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;


var userSchema = new Schema({
  username: String,
  password: String,
  name: {
    first: String,
    last: String
  },
  address: {
    street: String,
    city: String,
    zip: String,
    state: String
  },
  likedRoutes: Array,
  friends: Array
});

userSchema.pre('save', function (next) {
  var user = this;
  user.password = bcrypt.hashSync(user.password);
  next();
});

// user method that compares stored password with inputed password
userSchema.methods.comparePasswords = function (inputPwd) {
  return bcrypt.compareSync(inputPwd, this.password);
};

var UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
