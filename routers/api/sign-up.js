var express = require('express')
var router = new express.Router()

var User = require('../../models/user')
var objectId = require('mongoose').Types.ObjectId
var md5 = require('md5')

var messages = {
  '11000': '用户名已存在'
}

router
  .route('/')
  .post(function (req, res) { 
    if (req.session.user) {
      res.send({
        success: false,
        message: '已经登入了'
      })
    } else {
      var name = req.body.name ? req.body.name.trim() : ''
      var password = req.body.password || ''
      User.create({
        _id: objectId(),
        name: name,
        password: md5(password)
      }).then(function () {
        res.send({
          success: true,
          message: '创建成功'
        })
      }, function (err) {
        res.send({
          success: false,
          message: messages[String(err.code)]
        })
      })
    }
  })

module.exports = router
