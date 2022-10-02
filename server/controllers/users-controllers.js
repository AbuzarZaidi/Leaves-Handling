const usersLeaves=require('../models/leaves')
const leaveRequest=async(req,res,next)=>{
    console.log('leaveRequest controller');
console.log(req.body);

  }

  exports.leaveRequest = leaveRequest;