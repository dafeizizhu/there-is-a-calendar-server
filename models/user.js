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
  },
  token: {
    type: String,
    unique: true,
    default: uuid.v4
  }
})

UserSchema.static('findByToken', function (token) {
  return new Promise(function (resolve, reject) {
    this.findOne({ token: token }, function (err, user) {
      if (err) {
        reject(err)
      } else {
        resolve(user)
      }
    })
  })
})

module.exports = mongoose.model('User', UserSchema)
