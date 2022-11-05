const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// All requests here are coming in from /projects/...
router.post('/', projectController.addProject);

router.get('/', projectController.getMyProject)

router.get('/all', projectController.getAllProjects);

router.delete('/', projectController.deleteProject);




 
module.exports = router;
