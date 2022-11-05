const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// All requests here are coming in from /auth/...
router.post('/login', authController.verifyUser);
module.exports = router;
