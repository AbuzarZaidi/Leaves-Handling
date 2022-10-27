const User = require("../models/users");
const rootDir=require('../util/path')
const path=require('path')
const bcrypt = require("bcryptjs");
const HttpError = require("../models/http-error");
const validator = require("validator");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const updateLeavesRequest = async (req, res, next) => {
  const userId = req.params.id;
  const updatedStatus = req.query.updatedStatus;
  try {
    const user = await User.findById(userId);
    if (updatedStatus === "accepted" || updatedStatus === "rejected") {
      const useData = user.leaveRequests.slice(-1)[0];
      useData.status = updatedStatus;
      const managerData = await User.findById(useData.manager);
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "abuzarzaidi947@gmail.com",
          pass: "kvttwtwhhcfldrmd",
        },
      });
      
      ejs.renderFile(rootDir+'/views'+ '/employee.ejs',{status:updatedStatus,
        user,
        managerData,
        fromDate:useData.fromDate,
        toDate: useData.toDate,
        reason:useData.reason} , (err, data) => {
        if (err) {
          console.log(err);
        } else {
          const mailOptions = {
            from: `${managerData.email}`,
            to: `${user.email}`,
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
      // res.status(201).sendFile(path.join(__dirname,'..','views','Response.html'));
      res.status(201).sendFile(path.join(rootDir,'views','Response.html'));
    } else {
      return next(new HttpError("Unknown Status", 200));
    }
  } catch (err) {
    const error = new HttpError("Something went wrong.", 500);
    return next(error);
  }
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
  const userId = req.body.uid;
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
        probation: probation.slice(0, 10),
      });
      await user.save();
      res
        .status(200)
        .json({ success: true, message: "User Created Successfully" });
    }
  } catch (err) {
    return next(new HttpError("Could not create user, please try again.", 500));
  }
};

//edit user
const editUser = async (req, res, next) => {
  const userId = req.body.uid;
  console.log(userId);
  console.log(req.body.data);
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
      probation: probation.slice(0, 10),
      type: type,
    };
    const result = await User.findOneAndUpdate({ _id: userId }, user);
    return res.status(201).json({ message: "User updated Successfully" });
  } catch (err) {
    return next(new HttpError("Something went wrong.", 500));
  }
};

//employeesLeaves
const employeesLeaves = async (req, res, next) => {
  const { employeeId, month, year } = req.body.data;
  await User.find({ _id: employeeId }, "name probation leaveRequests").then(
    (obj) => {
     
      const dateData = obj[0].leaveRequests.filter((val) => {
        let startDate=new Date(val.fromDate);
        let endDate=new Date(val.toDate);
        if (
          year == startDate.getFullYear() &&
          month == startDate.getMonth() + 1 &&
          year == endDate.getFullYear() &&
          month == endDate.getMonth() + 1
        ) {
          return val;
        } else if (
          year == startDate.getFullYear() &&
          month == startDate.getMonth() + 1 &&
          month != endDate.getMonth() + 1
        ) {
          val.totalDays = val.totalDays - endDate.getDate();
          return val;
        } else if (
          year == endDate.getFullYear() &&
          month == endDate.getMonth() + 1 &&
          month != startDate.getMonth() + 1
        ) {
          val.totalDays = endDate.getDate();
          return val;
        }
      });
      let unpaidLeave;
      const newdata = dateData.map((val) => {
        console.log(obj[0].probation)
        console.log(new Date(obj[0].probation).getDate())
      
        if (new Date(val.toDate) <= new Date(obj[0].probation)) {
          unpaidLeave = val.totalDays;
         
        } else if (
          new Date(val.fromDate) <= new Date(obj[0].probation) &&
          new Date(val.toDate) >= new Date(obj[0].probation)
        ) {
          unpaidLeave =
            new Date(val.toDate).getDate() -
            new Date(obj[0].probation).getDate();
            
        } else {
          unpaidLeave = 0;
          
        }

        return {
          status: val.status,
          reason: val.reason,
          fromDate: val.fromDate,
          toDate: val.toDate,
          totalDays: val.totalDays,
          manager: val.manager,
          unpaid: unpaidLeave,
        };
      });
      
      const response = {
        id: obj[0]._id,
        probation: obj[0].probation,
        name: obj[0].name,
        leaveRequests: newdata,
      };
      res.status(200).json({ success: true, data: response });
    }
  );
};

//get employees
const getEmployeesName = async (req, res, next) => {
  try {
    const response = await User.find({}, "name");

    res.status(200).json({ success: true, data: response });
  } catch (err) {
    return next(new HttpError("Something went wrong.", 500));
  }
};

exports.updateLeavesRequest = updateLeavesRequest;
exports.usersList = usersList;
exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.editUser = editUser;
exports.employeesLeaves = employeesLeaves;
exports.getEmployeesName = getEmployeesName;
