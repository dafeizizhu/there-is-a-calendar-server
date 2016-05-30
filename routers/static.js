const express = require('express')
const router = new express.Router()
const path = require('path')

router.use(express.static(path.join(__dirname, '../public')))

module.exports = router
