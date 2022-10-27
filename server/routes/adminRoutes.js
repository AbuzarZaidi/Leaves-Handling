const adminController = require("../controllers/admin-controllers");
const express = require("express");
const {isAdmin}=require('../middleswares/auth')
const router = express.Router();


router.post("/usersList",isAdmin, adminController.usersList);
router.post("/createUser",isAdmin, adminController.createUser);
router.patch("/editUser",isAdmin, adminController.editUser);
router.get("/updateStatus/:id", adminController.updateLeavesRequest);
router.post("/deleteUser",isAdmin, adminController.deleteUser);
router.post("/employeesLeaves",isAdmin, adminController.employeesLeaves);
router.post("/getEmployeesName",isAdmin, adminController.getEmployeesName);
module.exports = router;
