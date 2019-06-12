const Project = require('../models/project');

//GETS
exports.project_page_get = async (req, res) => {
    const getProject = await Project.getAll();

    res.render('template', {
        locals: {
            title: 'Project Page',
            allproject: getProject,
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            partial: 'partial-project'
        }
    });
}

exports.single_project_page_get = async (req, res) => {
    const { projectID } = req.params,
        instanceProject = new Project(projectID, null, null),
        getProject = await instanceProject.getOneProject(),
        getProjectReviews = await instanceproject.getOneProjectReviews();

    res.render('template', {
        locals: {
            title: 'project Review Page',
            project: getProject,
            allprojectReviews: getProjectReviews,
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            partial: 'partial-project-reviews'
        }
    });
}

exports.single_project_review_post = async function (req, res) {
    const { review, score, id } = req.body,
        instanceProject = new project(id, null, null);

    await instanceProject.addReview(score, review, parseInt(req.session.user_id));

    const getProject = await instanceProject.getOneproject(),
        getProjectReviews = await instanceProject.getOneprojectReviews();

    res.render('template', {
        locals: {
            title: 'project Review Page',
            project: getproject,
            allprojectReviews: getprojectReviews,
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            partial: 'partial-project-reviews'
        }
    });
}