var express = require('express')
var router = new express.Router()
var md5 = require('md5')

var User = require('../../models/user')

var log4js = require('log4js')
var logger = log4js.getLogger('routers/api/sign-in')

router
  .route('/')
  .post(function (req, res) {
    var _user
    var _calendars
    if (req.session.user) {
      res.send({
        success: false,
        message: '已经登入了'
      })
    } else {
      User.findOne({
        name: req.body.name, 
        password: md5(req.body.password)
      }).then(function (user) {
        if (user) {
          req.session.user = user
          return User.findOneWithDetail(user._id)
        } else {
          throw new Error('用户名或者密码不符')
        }
      }).then(function (user) {
        res.send({
          success: true,
          message: '登入成功',
          user: user
        })
      }).catch(function (err) {
        logger.warn('sign in failed, err: ', err)
        res.send({
          success: false,
          message: String(err)
        })
      })
    }
  })

module.exports = router
