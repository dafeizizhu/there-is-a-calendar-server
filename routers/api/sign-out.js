var express = require('express')
var router = new express.Router()

router
  .route('/')
  .post(function (req, res) {
    if (req.session.user) {
      req.session.user = null
      res.send('success')
    } else {
      res.send('not sign in')
    }
  })

module.exports = router
