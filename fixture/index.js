var mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId
var md5 = require('md5')

var User = require('../models/user')
var Calendar = require('../models/calendar')
var Event = require('../models/event')

var dropCollection = function (name) {
  console.log('drop', name)
  var collection = mongoose.connection.collections[name]
  if (collection) {
    return collection.drop().catch(function (err) {
      console.warn('drop ' + name + ' failed', err)
      return new Promise(function (resolve) {
        resolve()
      })
    })
  } else {
    return new Promise(function (resolve) {
      resolve()
    })
  }
}

require('../connect-db')().then(function () {
  return dropCollection('users')
}).then(function () {
  return dropCollection('calendars')
}).then(function () {
  return dropCollection('events')
}).then(function () {
  return User.create({
    _id: ObjectId(),
    name: '测试',
    password: md5('123')
  })
}).then(function () {
  console.log('create success, arguments', arguments)
  process.exit()
}).catch(function () {
  console.log('create failed, arguments', arguments)
  process.exit()
})
