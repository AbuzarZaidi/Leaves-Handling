const User = require("../models/users");
const HttpError = require("../models/http-error");
const validator = require("validator");
const bcrypt = require("bcryptjs");
//create leave request
const leaveRequest = async (req, res, next) => {
  let userId = req.params.uid;
  let { reason, fromDate, toDate, manager } = req.body;
  try {
    if (IsRequestValid({ userId, reason, fromDate, toDate, manager })) {
      return next(
        new HttpError("Invalid inputs passed, please check your data.", 200)
      );
    } else {
      let daysInMsec =
        new Date(toDate).getTime() - new Date(fromDate).getTime();

      const request = {
        status: "pending",
        reason: reason,
        fromDate: fromDate.slice(0, 10),
        toDate: toDate.slice(0, 10),
        totalDays: Math.ceil(daysInMsec / (1000 * 3600 * 24)) + 1,
        manager: manager,
      };
      const user = await User.findById(userId);
      user.leaveRequests.push(request);
      user.save();
      res
        .status(200)
        .json({ success: true, message: "Leave Request Created!" });
    }
  } catch (error) {
    return next(new HttpError("Something went wrong.", 500));
  }
};

//get user previous leaves request
const previousLeavesRequest = async (req, res, next) => {
  const userId = req.params.uid;
  try {
    let result = await User.findById(
      {
        _id: userId,
      },
      "leaveRequests"
    );

    res.status(200).json({ success: true, data: result.leaveRequests });
  } catch (err) {
    return next(new HttpError("Something went wrong.", 500));
  }
};

//login
const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return next(
        new HttpError("Invalid credentials, could not log you in.", 200)
      );
    }
   
   let isValidPassword = await bcrypt.compare(password, existingUser.password);
    if (!isValidPassword) {
      return next(
        new HttpError("Invalid credentials, could not log you in.", 200)
      );
    }
    res.status(200).json({success:true,data:{
      userId: existingUser.id,
      email: existingUser.email,
      name: existingUser.name,
      position: existingUser.position,
    }});
  } catch (err) {
    return next(
      new HttpError("Logging in failed, please try again later.", 500)
    );
  }
};

//change password
const passwordChange = async (req, res, next) => {
  const userId = req.params.uid;
  const { previousPassword, password, confirmPassword } = req.body;

  try {
    if (!password || !confirmPassword || password !== confirmPassword) {
      return next(new HttpError("Invalid credentials", 200));
    }
    const existingUser = await User.findById({ _id: userId });
    isValidPassword = await bcrypt.compare(
      previousPassword,
      existingUser.password
    );

    if (!isValidPassword) {
      return next(new HttpError("Invalid credentials.", 200));
    }
    let hashedPassword = await bcrypt.hash(password, 12);
    await User.findOneAndUpdate({ _id: userId }, { password: hashedPassword });
    res
      .status(200)
      .json({ success: true, message: "password changed successfully" });
  } catch (err) {
    return next(new HttpError("Something went wrong.", 500));
  }
};
//get manager
const getManagersName = async (req, res, next) => {
  try {
    const response = await User.find({ type: "manager" }, "name");
    res.json({ success: true, data: response });
  } catch (err) {
    return next(new HttpError("Something went wrong.", 500));
  }
};

const IsRequestValid = (data) => {
  return (
    validator.isEmpty(data.reason) ||
    validator.isEmpty(data.fromDate) ||
    validator.isEmpty(data.toDate) ||
    validator.isEmpty(data.manager)
  );
};

exports.leaveRequest = leaveRequest;
exports.previousLeavesRequest = previousLeavesRequest;
exports.login = login;
exports.passwordChange = passwordChange;
exports.getManagersName = getManagersName;
