const express = require('express'), 
    router = express.Router();
const ProjectsModels = require('../models/projects-models');
const CommentsModels = require('../models/comments-models');
const User = require('../models/users-model');
const ProjectsController = require('../controllers/projects-controllers');

router.get('/', ProjectsController.allProjects_get);

router.get('/:id', ProjectsController.ProjectById_get);

router.post('/', ProjectsController.addProject_post);

router.post('/update', ProjectsController.addComment_post);

module.exports = router;