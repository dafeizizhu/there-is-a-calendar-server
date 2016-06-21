var express = require('express')
var app = express()

var cookieSession = require('cookie-session')
var bodyParser = require('body-parser')
var log4js = require('log4js')

var logger = log4js.getLogger('normal')
logger.setLevel(log4js.levels.INFO)

app.use(cookieSession({
  secret: 'yougerilicookie'
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(require('./routers'))

require('./connect-db')().then(function () {
  app.listen(8080)
}, function (err) {
  logger.error('Connet to db failed!, err: ' + err)
  process.exit()
})
