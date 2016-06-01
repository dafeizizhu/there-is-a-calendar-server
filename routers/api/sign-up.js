var express = require('express')
var router = new express.Router()

var User = require('../../models/user')
var objectId = require('mongoose').Types.ObjectId
var md5 = require('md5')

router
  .route('/')
  .post(function (req, res) { 
    if (req.session.user) {
      res.send('already sign in')
    } else {
      User.create({
        _id: objectId(),
        name: req.body.name.trim(),
        password: md5(req.body.password)
      }).then(function () {
        res.send('create user')
      }, function (err) {
        res.send(err)
      })
    }
  })

module.exports = router
