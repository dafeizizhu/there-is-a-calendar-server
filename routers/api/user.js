var express = require('express')
var router = new express.Router()

var User = require('../../models/user')
var objectId = require('mongoose').Types.ObjectId
var md5 = require('md5')

router
  .route('/:id')
  .put(function (req, res) {
    // 修改用户
    res.send('modify user')
  })
  .delete(function (req, res) {
    // 删除用户
    res.send('delete user')
  })
  .get(function (req, res) {
    // 获取用户
    res.send('get user')
  })

module.exports = router
