const usersController = require('../controllers/users-controllers');
const express=require('express');
const router=express.Router();

router.post('/leaveRequest/',usersController.leaveRequest);
// router.post('/signup',usersController.signup);
// router.post('/signup',usersController.signup);
module.exports = router;