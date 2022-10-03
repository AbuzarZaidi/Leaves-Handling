const User = require("../models/users");
const HttpError = require("../models/http-error");
const updateLeavesRequest=async(req,res,next)=>{
    const  userId=req.params.uid;
    const updatedStatus=req.body.updatedStatus;
       if(updatedStatus==='accepted'||updatedStatus==='rejected'){
        let user = "";
        try {
          user = await User.findById(userId);
        } catch (err) {
          const error = new HttpError("Could not find user for provided id.", 404);
          return next(error);
        }
        user.leaveRequests.slice(-1)[0].status=updatedStatus 
       user.save();
       res.status(201).json("Status Updated!");
       }
       else{
        return next(
            new HttpError("Unknown Status", 404)
          );
       }
    // try {
    //     const filter = { _id:userId };
    //     if(){
    //         const user=await User.findById(userId)
    //        user.leaveRequests.slice(-1)[0].status=updatedStatus 

    //         let result = await User.findOneAndUpdate(filter, user);
    //         res.status(201).json(result);
    //     }else{
    //         res.status(404).json("Something went wrong!")
    //     }
    // } catch (error) {
    //     res.status(409).json({error:error.message})
    // }
}

exports.updateLeavesRequest = updateLeavesRequest;


