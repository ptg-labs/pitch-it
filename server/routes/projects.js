const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const jwtController = require('../controllers/jwtController');

// All requests here are coming in from /projects/...
router.post('/', projectController.addProject, (req, res) => {
  return res.status(200).json(true);
});

router.get('/all', jwtController.verify, projectController.getAllProjects, (req, res) => {
  return res.status(200).json(res.locals.mergedProjects);
}); // returns mergedProjects to front end

router.get('/:id', projectController.getMyProject, (req, res) => {
  return res.status(200).json(res.locals.mergedProjects);
}); // returns mergedProjects to front end

router.delete('/:id', projectController.deleteProject); // returns true to front end

module.exports = router;
