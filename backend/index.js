const express = require('express')
const app = express()
const port = 4001

app.get('/', (req, res) => {
  res.send('Hello Sandip!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})