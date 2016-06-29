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
  console.log('create user...')
  return User.create({
    name: 'test',
    password: md5('123')
  })
}).then(function (u) {
  console.log('created user', u)
  console.log('create calendar...')
  return Calendar.create({
    name: '工作',
    color: 'red',
    user: u._id
  })
}).then(function (c) {
  console.log('created calendar', c)
  console.log('create success')
  process.exit()
}).catch(function () {
  console.log('create failed, arguments', arguments)
  process.exit()
})
