var express = require('express')
var router = new express.Router()

var User = require('../../models/user')
var objectId = require('mongoose').Types.ObjectId
var md5 = require('md5')

router
  .route('/')
  .post(function (req, res) {
    if (req.session.user) {
      res.send('already sign in, user.name: ' + req.session.user.name)
    } else {
      User.findOne({ name: req.body.name, password: md5(req.body.password)}).then(function (user) {
        if (user) {
          req.session.user = user
          res.send(user)
        } else {
          res.send('invalid name or password')
        }
      }, function (err) {
        res.send(err)
      })
    }
  })

module.exports = router
