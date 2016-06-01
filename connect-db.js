var mongoose = require('mongoose')
var connected = false

module.exports = function () {
  return new Promise(function (resolve, reject) {
    if (connected) {
      resolve()
    } else {
      console.log(process.env)
      mongoose.connect(process.env.YOUGERILI_MONGODB_CONN_STR, { auth: { authdb: 'yougerili'}})
      mongoose.connection.on('connected', function () {
        connected = true
        resolve()
      })
      mongoose.connection.on('error', function (err) {
        console.warn('Unable to connect to db', err)
        reject(err)
      })
    }
  })
}
