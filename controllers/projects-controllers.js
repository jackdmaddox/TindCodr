const ProjectsModels = require('../models/projects-model');
const CommentModels = require('../models/comments-model');

exports.allProjects_get = async (req, res) => {
    const allProjects = await ProjectsModels.getAll();
    res.render('template', {
        locals: {
            title: 'Projects',
            projectsList: allProjects,
            is_logged_in: req.session.is_logged_in,
            user_id: req.session.user_id

        },
        partials: {
            partial: 'partial-projects',
        }
    });
}

exports.ProjectById_get = async (req, res) => {
    const ProjectId = req.params.id;
    const singleProject = await ProjectsModels.getById(ProjectId);
    const singleProjectComment = await CommentModels.getById(ProjectId);
    res.render('template', {
        locals: {
            title: 'Project Comment',
            projectDetails: singleProject,
            projectComment: singleProjectComment,
            is_logged_in: req.session.is_logged_in,
            user_id: req.session.user_id
        },
        partials: {
            partial: 'partial-comments',
        }
    });
}

exports.ProjectsByUserId_get = async (req, res) =>{
    const UserId = req.session.user_id;
    console.log('this is req params: ', req.session.user_id)
    console.log('user id being called is: ', UserId);
    const myProjects = await ProjectsModels.getByUserId(UserId);
    res.render('template', {
        locals: {
            title: 'My Projects',
            myListOfProjects: myProjects,
            is_logged_in: req.session.is_logged_in,
            user_id: req.session.user_id
        },
        partials: {
            partial: 'partial-myprojects',
        }
    });

}

exports.addProject_post = async (req, res) => {
    const { project_title, project_start, project_summary, project_url, project_open, project_users_id} = req.body;

    ProjectsModels.addProject(project_title, project_start, project_summary, project_url, project_open, project_users_id)
    .then(async () => {
        const allProjects = await ProjectsModels.getAll();
        
        res.status(200).render('template', {
            locals: {
                title: 'Projects Updated',
                projectsList: allProjects,
                is_logged_in: req.session.is_logged_in,
                user_id: req.session.user_id

            },
            partials: {
                partial: 'partial-projects',
            }
        });
    })
        .catch((err) => {
        res.sendStatus(500).send(err.message);
    });
}

exports.addComment_post = async (req, res) => {
    const {comments_content, comments_project_id, comments_users_id} = req.body;
    CommentModels.addComment(comments_content, comments_project_id, comments_users_id)
    .then(async () => {
        res.redirect(`/projects/${comments_project_id}`);
    })
    .catch((err) => {
        res.sendStatus(500).send(err.message);
    });
}