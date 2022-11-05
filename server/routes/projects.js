const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// All requests here are coming in from /projects/...
router.post('/', projectController.addProject);

router.get('/all', projectController.getAllProjects);

router.get('/:id', projectController.getMyProject);

router.delete('/', projectController.deleteProject);

module.exports = router;
