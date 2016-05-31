const express = require('express')
const router = new express.Router()

router
  .route('/')
  .post(function (req, res) {
    // 创建用户
    res.send('create user')
  })

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
