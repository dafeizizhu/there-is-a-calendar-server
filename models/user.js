var mongoose = require('mongoose')
var uuid = require('node-uuid')

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('User', UserSchema)
