const usersController = require("../controllers/users-controllers");
const express = require("express");
const {isLogin}=require('../middleswares/auth')
const router = express.Router();

router.post("/leaveRequest",isLogin,usersController.leaveRequest);
router.post("/previosRequest", isLogin,usersController.previousLeavesRequest);
router.post("/getMangersName",isLogin, usersController.getManagersName);
router.post("/login", usersController.login);
router.patch("/passwordChange",  isLogin,usersController.passwordChange);

module.exports = router;
