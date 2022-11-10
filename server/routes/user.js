const express = require('express');
const jwtController = require('../controllers/jwtController');
const router = express.Router();
const userController = require('../controllers/userController');
// TODO: REFACTOR MIDDLEWARE TO NOT BE FINAL ENDPOINT HANDLER
// All requests here are coming in from /user/...
router.post('/login', userController.verifyUser, jwtController.write, (req, res) => {
  return res.status(200).json(res.locals.jwt);
});

// router.get('/login', userController.getAllUsers)

router.post('/signup', userController.createUser, (req, res) => {
  return res.status(200).json(true);
});

// TODO: CONNECT TO FRONTEND
router.delete('/', userController.deleteUser);

module.exports = router;
