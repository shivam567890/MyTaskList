const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', true);
const connectToMongo=()=>{
    mongoose.connect(MongoURI.process.env,()=>{
        console.log("connected to Mongo Successsfully");
    })
}
module.exports = connectToMongo;


