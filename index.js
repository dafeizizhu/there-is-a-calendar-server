const express = require('express')
const app = express()

app.use(require('./routers'))
app.listen(80)
