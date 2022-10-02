const Leaves=require('../models/leaves')
const User=require('../models/users')
const leaveRequest=async(req,res,next)=>{
    const  leave=new  Leaves(req.body);
    try {
        await leave.save();
        res.status(201).json(leave);
    } catch (error) {
        res.status(409).json({error:error.message})
    }

  }
  const signup = async (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      res.status(422).json({ error: "Please fill the complete form!" });
    }
  
    try {
      const userExist = await User.findOne({ email: email });
  
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
        await user.save();
        return res.status(201).json({ message: "User Created Successfully" });
      }
    } catch (error) {
      res.status(422).json({ message: "Please Try Again" });
    }
  };

  exports.leaveRequest = leaveRequest;
  exports.signup = signup;