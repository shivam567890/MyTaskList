const connectToMongo=require('./db');
const express = require('express')
var cors =require('cors');
const sendMail = require('./routes/sendMail');
require('dotenv').config();
const app = express()
connectToMongo();
app.use(cors());
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/userpres',require('./routes/userpresence'))
app.use('/api/notes',require('./routes/notes'))
app.use('/otp',require('./routes/sendMail'))
app.use('/',async(req,res)=>{
  res.send("server is running");
})
app.listen(5000||PORT.process.env, () => {
  console.log(`iNotebook backend  listening on port ${port}`)
})
