var express = require('express')
var router = new express.Router()

router
  .route('/')
  .post(function (req, res) {
    res.send('creat an event')
  })

module.exports = router
