const express = require('express')
const cors = require('cors');
const bodyParser=require('body-parser')

const usersRoutes=require('./routes/usersRoutes')
// const adminRoutes=require('./routes/adminRoutes')
require("./db/index.js");

const app = express()


app.use(cors());
const port=process.env.PORT||5000;
app.use(bodyParser.json())
app.use('/user',usersRoutes)
// app.use('/admin',adminRoutes)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})