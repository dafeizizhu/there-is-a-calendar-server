const express = require('express')
const router = new express.Router()

router.use(require('./trace'))
router.use(require('./static'))

module.exports = router
