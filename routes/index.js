const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { addProject, updateProject, getProjects,deleteProject } = require('../Controller/projectController');
const { adminLogin } = require('../Controller/adminController');
const responseController = require('../Controller/responseController');


router.post('/login', adminLogin);

// Route to add a new project with file upload
router.post('/add',addProject);

// Route to update an existing project with file upload
router.put('/update/:id',updateProject);

router.delete('/delete/:id',deleteProject)

// Route to get all projects
router.get('/projects', getProjects);

router.post('/responses', responseController.createResponse);
router.get('/responses', responseController.getAllResponses);
router.delete('/responses/:id', responseController.deleteResponse);


module.exports = router;