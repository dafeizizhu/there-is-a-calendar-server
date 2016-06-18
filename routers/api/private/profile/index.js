var express = require('express')
var router = new express.Router()

router.use('/calendar', require('./calendar'))
router.use('/event', require('./event'))

module.exports = router
