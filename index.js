var express = require('express')
var app = express()

var cookieSession = require('cookie-session')
var bodyParser = require('body-parser')

app.use(cookieSession({
  secret: 'yougerilicookie'
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(require('./routers'))

require('./connect-db')().then(function () {
  app.listen(8080)
}, function (err) {
  console.log(err)
  process.exit()
})
