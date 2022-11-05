const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// All requests here are coming in from /user/...
router.post('/login', userController.verifyUser 
 );

router.get('/login', userController.getAllUsers)

router.post('/signup', userController.createUser)

router.delete('/', userController.deleteUser)

 
module.exports = router;
