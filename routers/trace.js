const express = require('express')
const morgan = require('morgan')
const router = new express.Router()

router.use(morgan('combined'))

module.exports = router
