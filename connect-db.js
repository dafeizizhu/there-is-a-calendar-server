var mongoose = require('mongoose')
var connected = false

module.exports = function () {
  return new Promise(function (resolve, reject) {
    if (connected) {
      resolve()
    } else {
      mongoose.connect(process.env.YOUGERILI_MONGODB_CONN_STR, { auth: { authdb: 'yougerili'}})
      mongoose.connection.on('connected', function () {
        connected = true
        resolve()
      })
      mongoose.connection.on('error', function (err) {
        reject(err)
      })
    }
  })
}
