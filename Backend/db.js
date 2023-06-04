const mongoose = require('mongoose');
require('dotenv').config();

const connectToMongo=()=>{
    // mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MongoURI).then(()=>{
        console.log("connected to Mongo Successsfully");

    }).catch((err)=>{
        console.log("Database not connected due to: ", err);
    })
}
module.exports = connectToMongo;


