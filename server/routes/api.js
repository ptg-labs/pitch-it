const express = require('express');
const router = express.Router();

// express check to /api/express
router.get('/express', projectController.expressCheck);

module.exports = router;