const express = require('express'), 
    router = express.Router();

const ProjectsModels = require('../models/projects-model');
const CommentsModels = require('../models/comments-model');
const User = require('../models/users-model');

const ProjectsController = require('../controllers/projects-controllers');
const UsersController = require('../controllers/users-controllers');


router.get('/', UsersController.matchmaker_page_get);

router.post('/', UsersController.matchmaker_liked_post);

router.post('/dislike', UsersController.matchmaker_disliked_post);

module.exports = router;