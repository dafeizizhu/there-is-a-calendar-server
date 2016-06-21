const express = require('express')
const router = new express.Router()

var log4js = require('log4js')
log4js.configure({
  appenders: [{
    type: 'console'
  }, {
    type: 'file',
    filename: 'logs/access.log',
    maxLogSize: 1024,
    backups: 3
  }]
})

var logger = log4js.getLogger('trace')
logger.setLevel(log4js.levels.DEBUG)

router.use(log4js.connectLogger(logger, {
  level: log4js.levels.DEBUG
}))

module.exports = router
