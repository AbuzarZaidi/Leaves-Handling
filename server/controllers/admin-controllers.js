const User = require("../models/users");
const bcrypt = require("bcryptjs");
const HttpError = require("../models/http-error");
const validator = require("validator");
const nodemailer = require("nodemailer");
const updateLeavesRequest = async (req, res, next) => {
  const userId = req.params.id;
  const updatedStatus = req.query.updatedStatus;
  try {
   const  user = await User.findById(userId);
  if (updatedStatus === "accepted" || updatedStatus === "rejected") {
    const useData=user.leaveRequests.slice(-1)[0]
    useData.status = updatedStatus;
    const managerData=await User.findById(useData.manager)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "abuzarzaidi947@gmail.com",
        pass: "kvttwtwhhcfldrmd",
      },
    });
    const data=employeeMail(updatedStatus,user,managerData,useData.fromDate,useData.toDate,useData.reason)
    const mailOptions = {
      from: `${user.email}`,
      to: `${managerData.email}`,
      subject: `2022: Leave Request & compensation ${user.name}`,
      html: data,
      attachments: [
        {
          filename: "emaillogo.png",
          path: __dirname + "/emaillogo.png",
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
    user.save();
    res.status(201).json("Status Updated!");
  } else {
    return next(new HttpError("Unknown Status", 409));
  }
} catch (err) {
  const error = new HttpError("Could not find user for provided id.", 404);
  return next(error);
}
};

// const getApprovalRequest = async (req, res, next) => {
//   let result;
//   let updatedResult = [];
//   try {
//     result = await User.find({}, "leaveRequests");
//   } catch (err) {
//     const error = new HttpError("Something went wrong.", 500);
//     return next(error);
//   }
//   result.map((val) => {
//     if (val.leaveRequests.slice(-1)[0]) {
//       if (val.leaveRequests.slice(-1)[0].status == "pending") {
//         updatedResult.push(val);
//       }
//     }
//   });
//   res.status(200).json(updatedResult);
// };

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
  const user2Id = req.body.uid;
  
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
        probation:probation.slice(0,9),
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
  const userId = req.body.uid;
  console.log(userId)
  console.log(req.body.data)
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
      probation: probation.slice(0,9),
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
 
  const { employeeId,month, year } = req.body.data;
  await User.find({ _id: employeeId }, "name probation leaveRequests").then((obj) => {
    const dateData = obj[0].leaveRequests.filter((val) => {

      // console.log(new Date(val.fromDate).getDate())
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
    let unpaidLeave;
   const newdata= dateData.map(val=>{
    // console.log(obj[0].probation)
    // console.log(val.toDate)
console.log(new Date (val.toDate)<=new Date(obj[0].probation))
    if(new Date (val.toDate)<=new Date(obj[0].probation)){
      unpaidLeave=val.totalDays
    }
else if(new Date (val.fromDate)<=new Date(obj[0].probation)&&new Date (val.toDate)>=new Date(obj[0].probation)){
  unpaidLeave=new Date (val.toDate).getDate()-new Date(obj[0].probation).getDate()
  // console.log(new Date(obj[0].probation).getDate())
  // console.log(new Date (val.toDate).getDate())
  // console.log(new Date (val.fromDate).getDate())
}
else{
  unpaidLeave=0;
}
    
      return{
        status:val.status,
        reason:val.reason,
        fromDate:val.fromDate,        
        toDate:val.toDate,   
        totalDays:val.totalDays,
        manager:val.manager,
        unpaid:unpaidLeave,
      }
    })
    // console.log(newdata)
    const response = {
      id: obj[0]._id,
      probation: obj[0].probation,
      name: obj[0].name,
      leaveRequests: newdata,
    };
    res.status(200).json({ success: true, data: response });
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
const employeeMail=(status,user,managerData,fromDate,toDate,reason)=>{
  return (
    `<!DOCTYPE html>
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
        <script>
        const myFunction=()=> {
       console.log("hello")
        }
      </script>
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
            <h5>${status} Leave Request </h5>
            <p>Hello ${user.name}</p>
  
            <p>
              Your leave request with following detail has been ${status} by ${managerData.name}.
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
    
      </body>
      
    </html>
   
    `
  )
}
exports.updateLeavesRequest = updateLeavesRequest;
exports.usersList = usersList;
exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.editUser = editUser;
exports.employeesLeaves = employeesLeaves;
exports.getEmployeesName = getEmployeesName;
