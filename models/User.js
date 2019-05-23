const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);
module.exports = User;

// converts the password of user object
module.exports.createUser = (newUser, callback) => {
  bcryptjs.genSalt(10, (err, salt) => {
    bcryptjs.hash(newUser.password, salt, (error, hash) => {
      // store the hashed password
      const newUserResource = newUser;
      newUserResource.password = hash;
      // save to the database
      newUserResource.save(callback);
    });
  });
};

// query the databse for a user with given email
module.exports.getUserByEmail = (email, callback) => {
  User.findOne({ email }, callback);
}

// compare the password of the user login
module.exports.comparePassword = (candidatePassword, hash, callback) => {
  bcryptjs.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
};
