const connectToDB = require('./db');
const express = require('express');
require('dotenv').config()
connectToDB(process.env.MONGO_URI)
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
