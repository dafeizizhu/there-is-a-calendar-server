var express = require('express')
var router = new express.Router()
var mongoose = require('mongoose')
var objectId = mongoose.Types.ObjectId

var User = require('../../../models/user')
var Calendar = require('../../../models/calendar')

function getErrorMessage(err) {
  if (err.name == 'ValidationError') {
    return '非法数据'
  }
}

router
  .route('/')
  .post(function (req, res) {
    var name = req.body.name ? req.body.name.trim() : ''
    var color = req.body.color ? req.body.color.trim() : 'red'
    var userId = req.session.user ? req.session.user._id : ''
    var _id = objectId()
    Calendar.create({
      _id: _id,
      name: name,
      color: color,
    }).then(function () {
      return User.findOne({ _id: userId})
    }).then(function (user) {
      user.calendars.push(_id)
      return user.save()
    }).then(function () {
      res.send({
        success: true,
        message: '创建成功'
      })
    }).catch(function (err) {
      console.log(err)
      res.send({
        success: false,
        message: getErrorMessage(err) || err 
      })
    })
  })

module.exports = router
