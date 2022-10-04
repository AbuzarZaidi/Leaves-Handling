const usersController = require('../controllers/users-controllers');
const express=require('express');
const router=express.Router();

router.post('/leaveRequest/:uid',usersController.leaveRequest);
 
 router.get('/previosRequest/:uid',usersController.previousLeavesRequest);
module.exports = router;