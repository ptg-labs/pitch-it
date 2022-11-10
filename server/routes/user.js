const express = require('express');
const jwtController = require('../controllers/jwtController');
const router = express.Router();
const userController = require('../controllers/userController');
// TODO: REFACTOR MIDDLEWARE TO NOT BE FINAL ENDPOINT HANDLER
// All requests here are coming in from /user/...

router.post('/login', userController.verifyUser, jwtController.write, (req, res) => {
  return res.status(200).json(res.locals.user);
});

// router.get('/login', userController.getAllUsers)

router.post('/signup', userController.createUser, (req, res) => {
  return res.status(200).json(true);
});

// router.get('/settings', userController.verifyUser, jwtController.verify, (req, res) => {
//   return res.status(200).json(res.locals.username);
// })

// TODO: CONNECT TO FRONTEND
router.patch('/settings', userController.updateUser, (req, res) => {
  return res.status(200).json(res.locals.user)
})

// TODO: CONNECT TO FRONTEND
router.delete('/settings', jwtController.write, userController.deleteUser, (req, res) => {
  return res.status(200).json(true);
});

module.exports = router;
