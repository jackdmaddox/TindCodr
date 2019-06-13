const express = require('express'), 
    router = express.Router();

const ProjectsModels = require('../models/projects-model');
const CommentsModels = require('../models/comments-model');
const User = require('../models/users-model');

const ProjectsController = require('../controllers/projects-controllers');


router.get('/', ProjectsController.ProjectsByUserId_get);

module.exports = router;