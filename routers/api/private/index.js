var express = require('express')
var router = new express.Router()

router.use('/profile', require('./profile'))

module.exports = router
