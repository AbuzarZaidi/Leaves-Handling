const adminController = require('../controllers/admin-controllers');
const express=require('express');
const router=express.Router();

router.post('/updateStatus/:uid',adminController.updateLeavesRequest);
router.get('/getApprovalRequest',adminController.getApprovalRequest);
router.get('/usersList',adminController.usersList);
router.get('/user',adminController.usersList);
router.delete('/deleteUser/:uid',adminController.deleteUser);
 
module.exports = router;