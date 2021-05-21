const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  pass: String,
  profileImg: String,
  secret: String,
  googleId: String,
  facebookId: String
})

const User = new mongoose.model('user', userSchema)

module.exports = User