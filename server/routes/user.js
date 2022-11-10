const express = require('express');
const jwtController = require('../controllers/jwtController');
const router = express.Router();
const userController = require('../controllers/userController');
// All requests here are coming in from /user/...

//login route posts the username and password, goes through verificiation, and makes a cookie jwt for the user
router.post('/login', userController.verifyUser, jwtController.write, (req, res) => {
  //returns the user information back to the client
  return res.status(200).json(res.locals.user);
});

//signup route posts the username and password and creates the user, hashing and encrypting the password
router.post('/signup', userController.createUser, (req, res) => {
  //return true to indicate user was created
  return res.status(200).json(true);
});

//settings route initially gets the user jwt object to access username and user id
router.get('/settings', jwtController.verify, (req, res) => {
  //returns the user username to the client
  return res.status(200).json(res.locals.username);
});

//settings route posts a new password for the current user that is verified by jwt object
router.post('/settings', jwtController.verify, userController.updateUser, (req, res) => {
  //returns true to password is updated
  return res.status(200).json(true);
});

//settings route deletes the current user that is verified by jwt object and then deleted
router.delete('/settings', jwtController.verify, userController.deleteUser, (req, res) => {
  //returns true if user is deleted
  return res.status(200).json(true);
});

module.exports = router;
