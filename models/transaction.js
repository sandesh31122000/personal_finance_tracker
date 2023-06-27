const mongoose = require('mongoose');
const dbschema=new mongoose.Schema({

description:{
    type:String,
    required:true

},
amount:{
    type:Number,
    required:true
},
time:{
    type:Date,
    default:Date.now

}

});

module.exports=mongoose.model('transaction',dbschema);