const mongoose = require("mongoose");
const { Schema } = mongoose;
const usersSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlength:6},
});

const User = mongoose.model('users', usersSchema );
module.exports=User;