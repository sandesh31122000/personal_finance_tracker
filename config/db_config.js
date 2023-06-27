const mongoose = require('mongoose');
const uri = "mongodb+srv://dugu5062:Qwer1234@c1.7bfbyvz.mongodb.net/finance_tracker?retryWrites=true&w=majority";
const db=async()=>{
    try{
        const connection=await mongoose.connect(uri,{
            useNewUrlParser:true
        });
        console.log("MongoDB connected");
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports=db;
