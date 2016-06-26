var express = require('express')
var router = new express.Router()

var User = require('../../models/user')

var log4js = require('log4js')
var logger = log4js.getLogger('routers/api/check')

router
  .route('/')
  .post(function (req, res) {
    if (!req.session.user) {
      res.send({
        success: false,
        message: '还没有登入'
      })
    } else {
      return User.findOneWithDetail(req.session.user._id).then(function (user) {
        res.send({
          success: true,
          message: '已登入',
          user: user
        })
      }).catch(function (err) {
        logger.warn('check failed, err: ', err)
        res.send({
          success: false,
          mseesage: String(err)
        })
      })
    }
  })

module.exports = router
