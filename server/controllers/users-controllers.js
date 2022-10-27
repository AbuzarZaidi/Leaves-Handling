const User = require("../models/users");
const path = require("path");
const rootDir=require('../util/path')
const HttpError = require("../models/http-error");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
//create leave request
const leaveRequest = async (req, res, next) => {
  let userId = req.body.id;
  let { reason, fromDate, toDate, manager } = req.body.data;
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
      const managerData = await User.findById(manager);
      user.leaveRequests.push(request);
      const acceptUrl = `http://localhost:5000/admin/updateStatus/${userId}?updatedStatus=accepted`;
      const rejectUrl = `http://localhost:5000/admin/updateStatus/${userId}?updatedStatus=rejected`;
      // const acceptUrl = `https://leavesmanagement.herokuapp.com/admin/updateStatus/${userId}?updatedStatus=accepted`;
      // const rejectUrl = `https://leavesmanagement.herokuapp.com/admin/updateStatus/${userId}?updatedStatus=rejected`;
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "abuzarzaidi947@gmail.com",
          pass: "kvttwtwhhcfldrmd",
        },
      });
      ejs.renderFile(rootDir+'/views'+ '/manager.ejs',{user,managerData,fromDate,toDate,reason,acceptUrl,rejectUrl} , (err, data) => {
        if (err) {
          console.log(err);
        } else {
             const mailOptions = {
        from: `taha@mikrostartech.com`,
        to: `${managerData.email}`,
        subject: `2022: Leave Request & compensation ${user.name}`,
        html: data,
        attachments: [
          {
            filename: "emaillogo.png",
            path: path.join(rootDir,"images","emaillogo.png"),
            cid: "unique@kreata.ee", //same cid value as in the html img src
          },
        ],
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error" + error);
        } else {
          console.log("Email sent:" + info.response);
          res.status(201).json({ status: 201, info });
        }
      });
        }
      });
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
  const userId = req.body.id;
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
     console.log(existingUser)
     let isValidPassword = await bcrypt.compare(password, existingUser.password);
    if (!existingUser||!isValidPassword) {
      return next(
        new HttpError("Invalid credentials, could not log you in.", 200)
      );
    }
    res.status(200).json({
      success: true,
      data: {
        userId: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        type: existingUser.type,
      },
    });
  } catch (err) {
    return next(
      new HttpError("Logging in failed, please try again later.", 500)
    );
  }
};

//change password
const passwordChange = async (req, res, next) => {
  const userId = req.body.id;
  const { previousPassword, password, confirmPassword } = req.body.data;

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

