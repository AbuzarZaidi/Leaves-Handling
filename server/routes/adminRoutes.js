const adminController = require('../controllers/admin-controllers');
const express=require('express');
const router=express.Router();


router.patch('/updateStatus/:uid',adminController.updateLeavesRequest);
router.get('/getApprovalRequest',adminController.getApprovalRequest);
router.get('/usersList',adminController.usersList);
router.post('/createUser',adminController.createUser);
 router.post('/editUser/:uid',adminController.editUser);
router.delete('/deleteUser/:uid',adminController.deleteUser);
 
module.exports = router;