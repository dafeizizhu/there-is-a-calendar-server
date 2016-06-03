var express = require('express')
var router = new express.Router()

var User = require('../../models/user')
var objectId = require('mongoose').Types.ObjectId
var md5 = require('md5')

router
  .route('/')
  .post(function (req, res) {
    if (req.session.user) {
      res.send({
        success: false,
        message: '已经登入了'
      })
    } else {
      User.findOne({ name: req.body.name, password: md5(req.body.password)}).then(function (user) {
        if (user) {
          req.session.user = user
          res.send({
            success: true,
            message: '登入成功',
            user: {
              id: user._id,
              name: user.name
            }
          })
        } else {
          res.send({
            success: false,
            message: '用户名或者密码不符'
          })
        }
      }, function (err) {
        res.send({
          success: false,
          message: String(err)
        })
      })
    }
  })

module.exports = router
