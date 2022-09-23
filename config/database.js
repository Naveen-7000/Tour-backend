const mongoose = require('mongoose');

const {MONGODB_URL} = process.env;

exports.connect = () =>{
    mongoose
    .connect(MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(res=>{
        console.log("DB connected successfully");
    })
    .catch(err=>{
        console.log("Connection Failed");
        console.log(err);
        process.exit(1)
    })
}