const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

//add verify user middleware -- and give 404 response if not valid
// All requests here are coming in from /projects/...
router.post('/', projectController.addProject);

router.get('/all', projectController.getAllProjects);

router.get('/:id', projectController.getMyProject);

router.delete('/:id', projectController.deleteProject);

module.exports = router;
