const updateLeavesRequest=async(req,res,next)=>{
    // const  userId=req.params.uid;
    // const updatedStatus=req.body.updatedStatus;
       
    // try {
    //     const filter = { _id:userId };
    //     if(updatedStatus==='accepted'||updatedStatus==='rejected'){
    //         const update = { status: updatedStatus };
    //         let result = await Leaves.findOneAndUpdate(filter, update);
    //         res.status(201).json(result);
    //     }else{
    //         res.status(404).json("Something went wrong!")
    //     }
    // } catch (error) {
    //     res.status(409).json({error:error.message})
    // }
}

exports.updateLeavesRequest = updateLeavesRequest;


