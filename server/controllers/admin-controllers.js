const User = require("../models/users");
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
    result = await User.find();
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
  res.status(200).json("User Delete Successfully");
};

//create user
const createUser = async (req, res, next) => {
  const { name, email, password, type } = req.body;
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
      position:"manager"
    });
    console.log(user);
    await user.save();
    return res.status(201).json({ message: "User Created Successfully" });
  }
};

//edit user
const editUser = async (req, res, next) => {
  const userId = req.params.uid;
  const { name, email, password, type } = req.body;

  if (!name || !email || !password || !type) {
    const error = new HttpError("Please fill the complete form!", 422);
    return next(error);
  } else if (!validator.isEmail(email) || password.length < 6) {
    const error = new HttpError("Invalid username or password", 422);
    return next(error);
  }
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
  const user = {
    name: name,
    email: email,
    password: hashedPassword,
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
  console.log(req.body)
const data=req.body;

res.json(data)
}
//onbehalf leave request
const onBehalfLeaveRequest=async(req,res,next)=>{
//can use simple create leave route
}

exports.updateLeavesRequest = updateLeavesRequest;
exports.getApprovalRequest = getApprovalRequest;
exports.usersList = usersList;
exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.editUser = editUser;
exports.onBehalfLeaveRequest = onBehalfLeaveRequest;
exports.employeesLeaves = employeesLeaves;
