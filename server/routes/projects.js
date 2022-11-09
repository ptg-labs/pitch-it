const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// All requests here are coming in from /projects/...
router.post('/', projectController.addProject, (req, res) => {
  return res.status(200).json(true);
});

router.get('/all', projectController.getAllProjects);

router.get('/:id', projectController.getMyProject);

router.delete('/:id', projectController.deleteProject);

module.exports = router;
