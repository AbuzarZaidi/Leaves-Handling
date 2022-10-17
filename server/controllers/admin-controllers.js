const User = require("../models/users");
const bcrypt = require("bcryptjs");
const HttpError = require("../models/http-error");
const validator = require("validator");

const updateLeavesRequest = async (req, res, next) => {
  const userId = req.body.id;
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

  try {
    const response = await User.find({}).select("name email probation type");
    res.status(200).json({ success: true, data: response });
  } catch (err) {
    return next(new HttpError("Something went wrong.", 500));
  }
};
//delete user from userlist
const deleteUser = async (req, res, next) => {
  const userId = req.body.id;
  try {
    await User.findByIdAndRemove({ _id: userId });
    res
      .status(200)
      .json({ success: true, message: "User Delete Successfully" });
  } catch (err) {
    return next(new HttpError("Something went wrong.", 500));
  }
};

//create user
const createUser = async (req, res, next) => {
  const { name, email, password, type, probation } = req.body.data;

  try {
    if (!name || !email || !password || !type) {
      return next(new HttpError("Please fill the complete form!", 200));
    }
    let userExist = await User.findOne({ email: email });
    if (userExist) {
      return next(new HttpError("Email Already Exist!", 200));
    } else if (!validator.isEmail(email) || password.length < 6) {
      return next(new HttpError("Invalid username or password", 200));
    } else {
      let hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        name,
        email,
        password: hashedPassword,
        type,
        probation,
      });
      await user.save();
      res.status(200).json({success:true, message: "User Created Successfully" });
    }
  } catch (err) {
    return next(new HttpError("Could not create user, please try again.", 500));
  }
};

//edit user
const editUser = async (req, res, next) => {
  const userId = req.body.id;
  const { name, email, probation, type } = req.body.data;
  try {
    if (!name || !email || !type) {
      
      return next(new HttpError("Please fill the complete form!", 200));
    } else if (!validator.isEmail(email)) {
      
      return next(new HttpError("Invalid email!", 200));
    }
    const user = {
      name: name,
      email: email,
      probation: probation,
      type: type,
    };
    const result = await User.findOneAndUpdate({ _id: userId }, user);
    return res.status(201).json({ message: "User updated Successfully" });
  } catch (err) {
    return next(new HttpError("Something went wrong.", 500));
  }
  }

//employeesLeaves
const employeesLeaves = async (req, res, next) => {
  const id = req.body.id;
  const { month, year } = req.body.data;
  console.log("user{")
  console.log(year)
  console.log(month)
  console.log("}")
  await User.find({ _id: id }, "name probation leaveRequests").then((obj) => {
    const dateData = obj[0].leaveRequests.filter((val) => {
      // console.log(new Date(val.fromDate).getFullYear())
      // console.log(new Date(val.fromDate).getMonth()+1)
      console.log(new Date(val.fromDate).getDate())
      if (year == new Date(val.fromDate).getFullYear() &&month == new Date(val.fromDate).getMonth() + 1&&year == new Date(val.toDate).getFullYear()&&month == new Date(val.toDate).getMonth() + 1) {
     
        return val;
      }
      else if(year == new Date(val.fromDate).getFullYear() &&month == new Date(val.fromDate).getMonth() + 1&&month != new Date(val.toDate).getMonth() + 1){
val.totalDays=val.totalDays-new Date(val.toDate).getDate();

      }
      else if(year == new Date(val.toDate).getFullYear()&&month == new Date(val.toDate).getMonth() + 1&&month != new Date(val.fromDate).getMonth() + 1){
        val.totalDays=new Date(val.toDate).getDate();
        return val;
      }
    });
    const response = {
      id: obj[0]._id,
      probation: obj[0].probation,
      name: obj[0].name,
      leaveRequests: dateData,
    };
    res.json(response);
  });
};

//get employees
const getEmployeesName = async (req, res, next) => {
  try {
    const response = await User.find({ type: "employee" }, "name");

    res.status(200).json({ success: true, data: response });
  } catch (err) {
    return next(new HttpError("Something went wrong.", 500));
  }
};

exports.updateLeavesRequest = updateLeavesRequest;
exports.getApprovalRequest = getApprovalRequest;
exports.usersList = usersList;
exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.editUser = editUser;
exports.employeesLeaves = employeesLeaves;
exports.getEmployeesName = getEmployeesName;
