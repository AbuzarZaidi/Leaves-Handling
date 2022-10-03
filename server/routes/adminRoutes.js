const adminController = require('../controllers/admin-controllers');
const express=require('express');
const router=express.Router();

router.post('/updateStatus/:uid',adminController.updateLeavesRequest);
router.get('/getApprovalRequest',adminController.getApprovalRequest);
 
module.exports = router;