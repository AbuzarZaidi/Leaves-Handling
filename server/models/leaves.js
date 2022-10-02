const mongoose = require("mongoose");
const { Schema } = mongoose;
const usersLeavesSchema = new Schema({
    userName:{type:String,required:true},
    status:{type:String,required:true},
    reason:{type:String,required:true},
    fromDate:{type:String,required:true},
    toDate:{type:String,required:true}, 
});

const Leaves = mongoose.model('leaves', usersLeavesSchema );
module.exports=Leaves;