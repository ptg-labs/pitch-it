const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// All requests here are coming in from /api/...

// express check to /api/express
router.get('/express', projectController.expressCheck);

module.exports = router;
