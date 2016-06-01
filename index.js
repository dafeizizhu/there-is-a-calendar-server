const express = require('express')
const app = express()

const cookieSession = require('cookie-session')

app.use(cookieSession({
  secret: 'yougerilicookie'
}))
app.use(require('./routers'))

require('./connect-db')().then(function () {
  app.listen(8080)
}, function (err) {
  console.log(err)
  process.exit()
})
