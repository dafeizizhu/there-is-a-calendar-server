var mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId
var md5 = require('md5')

var User = require('../models/user')

require('../connect-db')().then(function () {
  return User.remove({})  
}).then(function () {
  var id = ObjectId()
  console.log('id', id)

  return User.create({
    _id: id,
    name: '测试',
    password: md5('123')
  })
}).then(function () {
  console.log('create success, arguments', arguments)
  process.exit()
})
