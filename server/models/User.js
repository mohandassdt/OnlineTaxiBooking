var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var userSchema = mongoose.Schema({
    FirstName: String,
    LastName: String,
    MobileNumber: String,
    Email: String,
  UserType: String,
    Password: String
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.Password);
}

module.exports = mongoose.model('User', userSchema, 'User');
