const usersController = require("../controllers/users-controllers");
const express = require("express");
const router = express.Router();

router.post("/leaveRequest/:uid", usersController.leaveRequest);
router.get("/previosRequest/:uid", usersController.previousLeavesRequest);
router.get("/getMangersName", usersController.getManagersName);
router.post("/login", usersController.login);
router.patch("/passwordChange/:uid", usersController.passwordChange);
module.exports = router;
