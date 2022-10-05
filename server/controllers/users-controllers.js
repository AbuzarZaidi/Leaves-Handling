const User = require("../models/users");
const HttpError = require("../models/http-error");
const validator = require("validator");
const bcrypt = require("bcryptjs");
//create leave request
const leaveRequest = async (req, res, next) => {
  const userId = req.params.uid;
  const reason = req.body.reason;
  const fromDate = req.body.fromDate;
  const toDate = req.body.toDate;
  console.log(!validator.isEmpty(toDate));
  if (
    validator.isEmpty(reason) ||
    validator.isEmpty(fromDate) ||
    validator.isEmpty(toDate)
  ) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  } else {
    let date1 = new Date(toDate);
    let date2 = new Date(fromDate);
    let daysInMsec = date1.getTime() - date2.getTime();
    const days = Math.ceil(daysInMsec / (1000 * 3600 * 24)) + 1;
    const request = {
      status: "pending",
      reason: reason,
      fromDate: fromDate,
      toDate: toDate,
      totalDays: days,
    };

    let user = "";
    try {
      user = await User.findById(userId);
    } catch (err) {
      const error = new HttpError("Could not find user for provided id.", 404);
      return next(error);
    }

    try {
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
  res.status(200).json(result);
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
  });
};

//change password
const passwordChange = async (req, res, next) => {
  const userId = req.params.uid;
  const { password, confirmPassword } = req.body;
  if (!password || !confirmPassword || password !== confirmPassword) {
    const error = new HttpError("Invalid credentials", 403);
    return next(error);
  }
  let user;
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
  try {
    const result = await User.findOneAndUpdate(
      { _id: userId },
      { password: hashedPassword }
    );
  } catch (err) {
    const error = new HttpError("Something went wrong.", 500);
    return next(error);
  }

  res.status(200).json("password changed successfully");
};

exports.leaveRequest = leaveRequest;
exports.previousLeavesRequest = previousLeavesRequest;
exports.login = login;
exports.passwordChange = passwordChange;
