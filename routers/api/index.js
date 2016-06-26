const express = require('express')
const router = new express.Router()

router.use('/sign-in', require('./sign-in'))
router.use('/sign-up', require('./sign-up'))
router.use('/sign-out', require('./sign-out'))
router.use('/check', require('./check'))
router.use('/private', require('./private'))

module.exports = router
