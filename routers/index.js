const express = require('express')
const router = new express.Router()

router.use(require('./trace'))
router.use(require('./static'))
router.use('/api', require('./api'))

module.exports = router
