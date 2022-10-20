const express = require('express')
const cors = require('cors');
const path = require('path');
const bodyParser=require('body-parser')
const HttpError = require('./models/http-error');
const usersRoutes=require('./routes/usersRoutes')
const adminRoutes=require('./routes/adminRoutes')
require("./db/index.js");

const app = express()


app.use(cors());
const port=process.env.PORT||5000;
app.use(express.static(path.join('public')))
app.use(bodyParser.json())
app.use('/user',usersRoutes)
app.use('/admin',adminRoutes)
app.use((req, res,next) => {
  res.sendFile(path.resolve(__dirname,'public','index.html'))
})
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use((req,res,next)=>{
  // const error =new Error('Page not found!');
  // error.status=404;
  const error = new HttpError('Could not find this route.', 404);
  throw error;
  // next(error);
})
app.use((error,req,res,next)=>{
  // res.status(error.status||500)
  // res.json({error:{
  //   message:error.message
  // }})
  res.status(error.code || 500);
  res.json({success:false, message: error.message || 'An unknown error occurred!' });
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})