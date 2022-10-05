const adminController = require("../controllers/admin-controllers");
const express = require("express");
const router = express.Router();

router.get("/getApprovalRequest", adminController.getApprovalRequest);
router.get("/usersList", adminController.usersList);
router.post("/createUser", adminController.createUser);
router.post("/onBehalfLeaveRequest/:uid", adminController.onBehalfLeaveRequest);
router.patch("/editUser/:uid", adminController.editUser);
router.patch("/updateStatus/:uid", adminController.updateLeavesRequest);
router.delete("/deleteUser/:uid", adminController.deleteUser);

module.exports = router;
