const UsersLeaves=require('../models/leaves')

const updateLeavesRequest=(req,res,next)=>{
    const  userId=new  UsersLeaves(req.params.id);
    try {
        
        // res.status(201).json(leave);
    } catch (error) {
        // res.status(409).json({error:error.message})
    }
}

exports.updateLeavesRequest = updateLeavesRequest;


