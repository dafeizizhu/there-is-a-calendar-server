var express = require('express')
var router = new express.Router()
var mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId

var User = require('../../../models/user')
var Calendar = require('../../../models/calendar')

function getErrorMessage(err) {
  if (err.name == 'ValidationError') {
    return '非法数据'
  } else {
    switch (err.code) {
      case 11000:
        return '名称已存在'
    }
  }
}

router
  .route('/')
  .post(function (req, res) {
    var name = req.body.name ? req.body.name.trim() : ''
    var color = req.body.color ? req.body.color.trim() : 'red'
    var userId = req.session.user ? req.session.user._id : ''
    var _id = ObjectId()
    Calendar.create({
      _id: _id,
      name: name,
      color: color,
      user: userId
    }).then(function (c) {
      res.send({
        success: true,
        message: '创建成功',
        calendar: {
          id: c._id,
          name: c.name,
          color: c.color,
          user: c.user
        }
      })
    }).catch(function (err) {
      console.log('create calendar faild', err)
      res.send({
        success: false,
        message: getErrorMessage(err) || err 
      })
    })
  })

module.exports = router
