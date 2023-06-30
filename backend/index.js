const connectToDB = require('./db');
const express = require('express');
require('dotenv').config()
connectToDB(process.env.MONGO_URI)
const app = express()
const port = 5000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/note',require('./routes/note'))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
