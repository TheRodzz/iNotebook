const connectToDB = require('./db');
const express = require('express');
require('dotenv').config()
connectToDB(process.env.MONGO_URI)
const app = express()
const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
