const User = require("../models/users");
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
const usersList=async(req,res,next)=>{
  let result;
  try {
    result = await User.find();
  } catch (err) {
    const error = new HttpError("Something went wrong.", 500);
    return next(error);
  }
  res.status(200).json(result)
}
//delete user from userlist
const deleteUser=async(req,res,next)=>{
  const userId=req.params.uid;
  try {
    await User.findByIdAndRemove({_id:userId});
  } catch (err) {
    const error = new HttpError("Something went wrong.", 500);
    return next(error);
  }
  res.status(200).json('User Delete Successfully')
}

//create user
const createUser = async (req, res) => {
  const { name, email, password,type } = req.body;
  console.log(name, email, password);
  if (!name || !email || !password ||!type) {
    res.status(422).json({ error: "Please fill the complete form!" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    console.log(userExist);
    console.log(typeof userExist);

    if (userExist) {
      res.status(422).json({ error: "Email Already Exist!" });
    } else if (!validator.isEmail(email) || password.length < 6) {
      res.status(422).json({ error: "Invalid username or password" });
    } else {
      const user = new User({
        name,
        email,
        password,
        type
      });
      console.log(user);
      await user.save();
      return res.status(201).json({ message: "User Created Successfully" });
    }
  } catch (error) {
    res.status(422).json({ message: "Please Try Again" });
  }
};

//edit user
const editUser=async(req,res,next)=>{
  const _id = req.params.id;
  const { name, email, password,type } = req.body;
  console.log(name, email, password);
  if (!name || !email || !password ||!type) {
    res.status(422).json({ error: "Please fill the complete form!" });
  }
  const user = {
    name,
    email,
    password,
    type
  }
  try {
    const result=await User.findOneAndUpdate(_id,user);
  } catch (err) {
    const error = new HttpError("Something went wrong.", 500);
    return next(error);
  }

  return res.status(201).json({ message: "User updated Successfully" });
}


exports.updateLeavesRequest = updateLeavesRequest;
exports.getApprovalRequest = getApprovalRequest;
exports.usersList = usersList;
exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.editUser = editUser;
