const User = require("../models/users");
const mongoose=require('mongoose')
const bcrypt = require("bcryptjs");
const HttpError = require("../models/http-error");
const validator = require("validator");
const updateLeavesRequest = async (req, res, next) => {
  const userId = req.params.uid;
  const updatedStatus = req.body.updatedStatus;
  if (updatedStatus === "accepted" || updatedStatus === "rejected") {
    let user = "";
    try {
      user = await User.findById(userId);
    } catch (err) {
      const error = new HttpError("Could not find user for provided id.", 404);
      return next(error);
    }
    user.leaveRequests.slice(-1)[0].status = updatedStatus;
    user.save();
    res.status(201).json("Status Updated!");
  } else {
    return next(new HttpError("Unknown Status", 409));
  }
};

const getApprovalRequest = async (req, res, next) => {
  let result;
  let updatedResult = [];
  try {
    result = await User.find({}, "leaveRequests");
  } catch (err) {
    const error = new HttpError("Something went wrong.", 500);
    return next(error);
  }
  result.map((val) => {
    if (val.leaveRequests.slice(-1)[0]) {
      if (val.leaveRequests.slice(-1)[0].status == "pending") {
        updatedResult.push(val);
      }
    }
  });
  res.status(200).json(updatedResult);
};

//list of users
const usersList = async (req, res, next) => {
  let result;
  try {
    result = await User.find({}).select('name email probation type');
  
  } catch (err) {
    const error = new HttpError("Something went wrong.", 500);
    return next(error);
  }
  res.status(200).json(result);
};
//delete user from userlist
const deleteUser = async (req, res, next) => {
  const userId = req.params.uid;
  try {
   await User.findByIdAndRemove({ _id: userId });
  } catch (err) {
    const error = new HttpError("Something went wrong.", 500);
    return next(error);
  }
  res.status(200).json({status:200,message:"User Delete Successfully"});
};

//create user
const createUser = async (req, res, next) => {
  const { name, email, password, type,probation } = req.body;
  console.log(name, email, password);
  if (!name || !email || !password || !type) {
    const error = new HttpError("Please fill the complete form!", 422);
    return next(error);
  }
  let userExist;
  try {
    userExist = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Please Try Again", 422);
    return next(error);
  }
  if (userExist) {
    const error = new HttpError("Email Already Exist!", 422);
    return next(error);
  } else if (!validator.isEmail(email) || password.length < 6) {
    const error = new HttpError("Invalid username or password", 422);
    return next(error);
  } else {
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
      const error = new HttpError(
        "Could not create user, please try again.",
        500
      );
      return next(error);
    }
    const user = new User({
      name,
      email,
      password: hashedPassword,
      type,
      probation
    });
    console.log(user);
    await user.save();
    return res.status(201).json({ message: "User Created Successfully" });
  }
};

//edit user
const editUser = async (req, res, next) => {
  const userId = req.params.uid;
  const { name, email, probation, type } = req.body;
console.log(name)
console.log(email)
console.log(probation)
console.log(type)
  if (!name || !email  || !type) {
    const error = new HttpError("Please fill the complete form!", 422);
    return next(error);
  } else if (!validator.isEmail(email) ) {
    const error = new HttpError("Invalid email!", 422);
    return next(error);
  }
 
  const user = {
    name: name,
    email: email,
    probation: probation,
    type: type,
  };
  try {
    const result = await User.findOneAndUpdate({ _id: userId }, user);

    console.log(result);
    return res.status(201).json({ message: "User updated Successfully" });
  } catch (err) {
    const error = new HttpError("Something went wrong.", 500);
    return next(error);
  }
};
//employeesLeaves
const employeesLeaves=async(req,res,next)=>{
  const id=req.params.uid
  const {month,year}=req.body
  console.log(year)
  console.log(month)
  const response={}
const data=await User.find({ _id:id,},'name reason leaveRequests').then(obj=>{
const dateData=  obj[0].leaveRequests.filter((val)=>{
 
  if(year==new Date(val.fromDate).getFullYear()&&month==new Date(val.fromDate).getMonth()+1){
    console.log(new Date(val.fromDate).getFullYear())
    console.log(new Date(val.fromDate).getMonth()+1)
    return val;
  }
})
console.log(obj[0]._id)
const response={
  id:obj[0]._id,
  name:obj[0].name,
  leaveRequests:dateData
}
 res.json(response)
})

  // const date=new Date(val.fromDate)
  // console.log(data.getDate())
  // console.log(new Date(val.toDate).getDate())

  // if(val.totalDays>=3){
  //   return val.totalDays
  // }
   
  // })
  // console.log(data)
  // 
 
// const data=await User.find({ _id:id,'leaveRequests.status': 'pending'},'leaveRequests.status')
// age: {$gte:10}}
// res.json(data)
}



//onbehalf leave request
const onBehalfLeaveRequest=async(req,res,next)=>{
//can use simple create leave route
}
//get employees
const getEmployeesName=async(req,res,next)=>{
  try {
    const data=await User.find({type:'employee'},'name');
  console.log(data)
   res.json(data)
  } catch (err) {
    const error = new HttpError("Something went wrong.", 500);
      return next(error);
  }
  }

exports.updateLeavesRequest = updateLeavesRequest;
exports.getApprovalRequest = getApprovalRequest;
exports.usersList = usersList;
exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.editUser = editUser;
exports.onBehalfLeaveRequest = onBehalfLeaveRequest;
exports.employeesLeaves = employeesLeaves;
exports.getEmployeesName = getEmployeesName;
