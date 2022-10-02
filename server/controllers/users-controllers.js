const User = require("../models/users");
const validator = require("validator");
const leaveRequest = async (req, res, next) => {
  const userId = req.params.uid;
  const reason = req.body.reason;
  const fromDate = req.body.fromDate;
  const toDate = req.body.toDate;
  if (
    !validator.isEmpty(reason) ||
    !validator.isEmpty(fromDate) ||
    !validator.isEmpty(toDate)
  ) {
    try {
      //need to work here
      var date1 = new Date(toDate);
      var date2 = new Date(fromDate);
      const days = date1.getTime() - date2.getTime();
      console.log(Math.ceil(days / (1000 * 3600 * 24)));

      const request = {
        status: "pending",
        reason: reason,
        fromDate: fromDate,
        toDate: toDate,
        totalDays: days,
      };
      const filter = { _id: userId };
      const result = await User.findOneAndUpdate(
        { filter },
        { $push: { leaveRequests: request } }
      );
      res.status(201).json(result);
    } catch (error) {
      res.status(409).json({ error: error.message });
    }
  }
};
const signup = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  if (!name || !email || !password) {
    res.status(422).json({ error: "Please fill the complete form!" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    console.log(userExist);
    console.log(typeof userExist);

    if (userExist) {
      res.status(422).json({ error: "Email Already Exist!" });
    } else if (!validator.isEmail(email) || password.length < 6) {
      res.status(422).json({ error: "Invalid username or password" });
    } else {
      const user = new User({
        name,
        email,
        password,
      });
      console.log(user);
      await user.save();
      return res.status(201).json({ message: "User Created Successfully" });
    }
  } catch (error) {
    res.status(422).json({ message: "Please Try Again" });
  }
};

exports.leaveRequest = leaveRequest;
exports.signup = signup;
