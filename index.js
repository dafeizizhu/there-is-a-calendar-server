const express = require('express')
const app = express()

const cookieSession = require('cookie-session')

app.use(cookieSession({
  secret: 'yougerilicookie'
}))
app.use(require('./routers'))

app.listen(80)
