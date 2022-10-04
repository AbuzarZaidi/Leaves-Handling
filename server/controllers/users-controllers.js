const User = require("../models/users");
const HttpError = require("../models/http-error");
const validator = require("validator");

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


exports.leaveRequest = leaveRequest;
exports.previousLeavesRequest = previousLeavesRequest;
