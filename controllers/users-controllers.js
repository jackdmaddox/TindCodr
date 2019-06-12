const Users = require('../models/users-model'),
    bcrypt = require('bcryptjs');

///////
// PAGE GETS //
///////

exports.user_page_get = async (req, res) => {
    const userInstance = new Users(req.session.user_id, null, null, null, null),
        getUserInfo = await userInstance.getUserInfo(),
        getAllUserComments = await userInstance.getOneUserComments();

    res.render('template', {
        locals: {
            title: 'Users Page',
            userInfo: getUserInfo,
            usercomments: getAllUserComments,
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            partial: 'partial-users'
        }
    });
}

exports.login_page_get = (req, res) => {
    res.render('template', {
        locals: {
            title: 'Login Page',
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            partial: 'partial-login-form'
        }
    });
}

exports.sign_up_get = (req, res) => {
    res.render('template', {
        locals: {
            title: 'Sign Up Page',
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            partial: 'partial-signup-form'
        }
    });
}

exports.logout = (req, res) => {
    console.log('logging out');
    req.session.destroy();
    res.redirect('/');
}

////////////////
// PAGE POSTS //
////////////////

exports.login_page_post = async (req, res) => {
    const { email, password } = req.body,
        userInstance = new Users(null, null, null, email, password);

    try {
        let response = await userInstance.login();

        req.session.is_logged_in = true;
        req.session.first_name = response.first_name;
        req.session.last_name = response.last_name;
        req.session.user_id = response.id;

        console.log('CORRECT PW!');
        res.redirect('/users');
    } catch (err) {
        console.log('WRONG PW!')
        res.redirect('/users/signup');
    }
}

exports.sign_up_post = async (req, res) => {
    const { first_name, last_name, email, password } = req.body,
        salt = bcrypt.genSaltSync(10),
        hash = bcrypt.hashSync(password, salt),
        userInstance = new Users(null, first_name, last_name, email, hash);

    let check = await userInstance.checkIfCreated();

    if (typeof check === 'object') {
        res.redirect('/users/login');
    } else {
        await userInstance.save().then(response => {
            console.log('response is:', response);
            res.redirect('/');
        }).catch(err => err)
    }
}