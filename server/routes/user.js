const express = require('express');
const jwtController = require('../controllers/jwtController');
const router = express.Router();
const userController = require('../controllers/userController');
// TODO: REFACTOR MIDDLEWARE TO NOT BE FINAL ENDPOINT HANDLER

//add verify user middleware -- and give 404 response if not valid
// All requests here are coming in from /user/...

router.post('/login', userController.verifyUser, jwtController.write, (req, res) => {
  return res.status(200).json(res.locals.user);
});

// router.get('/login', userController.getAllUsers)

router.post('/signup', userController.createUser, (req, res) => {
  return res.status(200).json(true);
});

//what needs to happen in the front end for this?
// router.post('/update', userController.updateUser, (req, res) => {
//     return res.status(200).json(true);
// })

// TODO: CONNECT TO FRONTEND!!
router.delete('/', userController.deleteUser);

module.exports = router;
