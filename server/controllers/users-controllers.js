const UsersLeaves=require('../models/leaves')
const leaveRequest=async(req,res,next)=>{
    const  leave=new  UsersLeaves(req.body);
    try {
        await leave.save();
        res.status(201).json(leave);
    } catch (error) {
        res.status(409).json({error:error.message})
    }

  }

  exports.leaveRequest = leaveRequest;