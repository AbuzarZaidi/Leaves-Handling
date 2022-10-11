const User = require("../models/users");
const HttpError = require("../models/http-error");
const validator = require("validator");
const bcrypt = require("bcryptjs");
//create leave request
const leaveRequest = async (req, res, next) => {

  // {

  //   success : true,
  //   data: {},
  //   message: ""

  // }
let userId=req.params.uid;
  let {reason, fromDate, toDate, manager } = req.body
console.log(userId)
console.log(fromDate)
console.log(toDate)
console.log(manager)
  if(IsRequestValid({userId,reason, fromDate, toDate, manager }))
    return next(new HttpError("Invalid inputs passed, please check your data.", 200));
  else {
    
    try {

      let daysInMsec = new Date(toDate).getTime() - new Date(fromDate).getTime();
      
      const request = {
        status: "pending",
        reason: reason,
        fromDate: fromDate,
        toDate: toDate,
        totalDays: Math.ceil(daysInMsec / (1000 * 3600 * 24)) + 1,
        manager:manager,
      };
    const  user = await User.findById(userId);
    user.leaveRequests.push(request);
    user.save();
    } catch (err) {
      const error = new HttpError(
        "Creating leave failed, please try again.",
        500
      );
      return next(error);
    }

    res.status(201).json("Leave Request Created!");
  }
};

//get user previous leaves request
const previousLeavesRequest = async (req, res, next) => {
  const userId = req.params.uid;
  let result;
  try {
    result = await User.findById({ _id: userId }, "leaveRequests");
  } catch (err) {
    const error = new HttpError("Something went wrong.", 500);
    return next(error);
  }
  res.status(200).json(result.leaveRequests);
};

//login
const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }
  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again.",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }
  res.status(200).json({
    userId: existingUser.id,
    email: existingUser.email,
    name: existingUser.name,
    position:existingUser.position,
  });
};

//change password
const passwordChange = async (req, res, next) => {
  const userId = req.params.uid;
  const { previousPassword,password, confirmPassword } = req.body;
  if (!password || !confirmPassword || password !== confirmPassword) {
    const error = new HttpError("Invalid credentials", 403);
    return next(error);
  }
  try {
    const existingUser=await User.findById({_id:userId});
    isValidPassword = await bcrypt.compare(previousPassword, existingUser.password);
    if(isValidPassword){
      let   hashedPassword = await bcrypt.hash(password, 12);
      await User.findOneAndUpdate(
        { _id: userId },
        { password: hashedPassword }
      );
      res.status(200).json("password changed successfully");
    }
  
  } catch (err) {
    const error = new HttpError(
      // "Could not create user, please try again.",
      err,
      500
    );
    return next(error);
  }};
//get manager
const getManagersName=async(req,res,next)=>{
try {
  const data=await User.find({type:'manager'},'name');

 res.json(data)
} catch (err) {
  const error = new HttpError("Something went wrong.", 500);
    return next(error);
}
}

const IsRequestValid = (data) => {

  return validator.isEmpty(data.reason) ||
         validator.isEmpty(data.fromDate) ||
         validator.isEmpty(data.toDate)||
         validator.isEmpty(data.manager)
}

exports.leaveRequest = leaveRequest;
exports.previousLeavesRequest = previousLeavesRequest;
exports.login = login;
exports.passwordChange = passwordChange;
exports.getManagersName = getManagersName;
