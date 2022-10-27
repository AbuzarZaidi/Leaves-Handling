const User = require("../models/users");
const HttpError = require("../models/http-error");
const isLogin=(req,res,next)=>{
try {
    User.findById({_id:req.body.id},(err,data)=>{
        if (err) {
            return next(new HttpError("Authentication Failed.", 200));
        } else  {
            next();
        }
    })

} catch (error) {
    return next(new HttpError("Something went wrong.", 500));
}

}
const isAdmin=(req,res,next)=>{
   
    try {
        const data=User.findById({_id:req.body.id});
       
        User.findById({_id:req.body.id},(err,data)=>{
            if (err) {
                return next(new HttpError("Authentication Failed.", 200));
            } else  {
               
                if(data.type=="manager"||data.type=="hr"||data.type=="admin"){
                    next();
                }
                else{
                    return next(new HttpError("your are not admin.", 200));
                }
            }
        })
    } catch (error) {
        return next(new HttpError("Something went wrong.", 500));
    }
}
module.exports={isLogin,isAdmin}