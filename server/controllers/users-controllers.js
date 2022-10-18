const User = require("../models/users");
const path=require('path')
const HttpError = require("../models/http-error");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const nodemailer=require('nodemailer')
//create leave request
const leaveRequest = async (req, res, next) => {
  let userId = req.body.id;
  console.log(path.join(__dirname,'..','views'))
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
      const managerData=await User.findById(manager)
      user.leaveRequests.push(request);
      const url = `http://localhost:5000/user/test/${userId}`;
        const transporter=nodemailer.createTransport({
          service:"gmail",
          auth:{
            user:"abuzarzaidi947@gmail.com",
          pass:"kvttwtwhhcfldrmd",}
        })
       
      
        const mailOptions = {
          from: `${user.email}`,
          to: "036578.syedabuzarzaidi@gmail.com",
          subject: `2022: Leave Request & compensation ${user.name}`,
          html: `<!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Document</title>
              <style>
                  table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
          }
              </style>
            </head>
            <body>
              <div style="width: 90%; border:1px solid; border-radius:50px;padding:20px">
                <div style="display: flex">
                  <div>
                    <img src="cid:unique@kreata.ee" width="200px" alt="" />
                  </div>
                  <div>
                    <h1>MikroStarTech(SMC-Private)</h1>
                    <h1>Limited</h1>
                  </div>
                </div>
                <div style="margin-left: 2rem">
                  <h5>Leave Request By ${user.name}</h5>
                  <p>Hello ${managerData.name}</p>
        
                  <p>
                    Following are the details of leave request submitted by ${user.name}. kindle review it.
                  </p>
                  <table style="width: 30% ; ">
                    <tr>
                      <td><b>Employee</b></td>
                      <td>${user.name}</td>
                    </tr>
                    <tr>
                      <td><b>From</b></td>
                      <td>${fromDate.slice(0, 10)}</td>
                    </tr>
                    <tr>
                      <td><b>To</b></td>
                      <td>${toDate.slice(0, 10)}</td>
                    </tr>
                    <tr>
                      <td><b>Reason</b></td>
                      <td>${reason}</td>
                    </tr>
                
                  </table>
                </div>
                <div style="display: flex;margin-left: 2rem;margin-top:1rem">
                <a style="background-color: red;color:white;width:150px;text-decoration:none;text-align:center;">Reject</a>
                <a href=${url} style="background-color: green;color:white;width:150px;text-decoration:none;text-align:center;">Accept</a>
              </div>
              </div>
            </body>
          </html>`,
          attachments: [{
            filename: 'emaillogo.png',
           path: __dirname +'/emaillogo.png',
            cid: 'unique@kreata.ee' //same cid value as in the html img src
        }]
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error" + error)
        } else {
            console.log("Email sent:" + info.response);
            res.status(201).json({status:201,info})
        }
    })
    user.save();
     
    res
      .status(200)
      .json({ success: true, message: "Leave Request Created!" });
    }
  } catch (error) {
    return next(new HttpError("Something went wrong.", 500));
  }
};
const test=async(req,res,next)=>{
  console.log("here")
console.log(req.params.id)
res.send(`<h1>Successfull</h1>`)
}
//get user previous leaves request
const previousLeavesRequest = async (req, res, next) => {
  const userId = req.body.id;
  console.log("here")
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
      type: existingUser.type,
    }});
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
exports.test = test;
