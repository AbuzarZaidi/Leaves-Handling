const User = require("../models/users");
const HttpError = require("../models/http-error");
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

exports.updateLeavesRequest = updateLeavesRequest;
exports.getApprovalRequest = getApprovalRequest;
