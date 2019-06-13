const bcrypt = require('bcryptjs');
    Users = require('../models/users-model'),


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

exports.user_edit_profile_get = async (req, res) => {
    res.render('template', {
        locals: {
            title: 'Edit Profile Page',
            userInfo: getUserInfo,
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            partial: 'partial-edit-profile'
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

exports.logout_get = (req, res) => {
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
        const userData = await userInstance.getUserByEmail();
        const isValid = bcrypt.compareSync(password, userData.users_password);
        console.log(userData);
        if (!!isValid) {
        req.session.is_logged_in = true;
        req.session.first_name = userData.users_first_name;
        req.session.last_name = userData.users_last_name;
        req.session.user_id = userData.id;
        req.session.city = userData.users_city;
        console.log('CORRECT PW!');
<<<<<<< HEAD
        res.redirect('/users/');
    } catch (err) {
        console.log('WRONG PW!')
=======
        res.redirect('/');
    } else {
        console.log('WRONG PW!');
>>>>>>> cbdd50cb13322f35086e19f0a9f4cbbd3921576b
        res.redirect('/users/signup');
        res.sendStatus(401);
    }
}

<<<<<<< HEAD
exports.sign_up_post = async (req, res) => {
    const { first_name, last_name, email, password, users_city, coding_level, about_me, picture_url } = req.body,
        salt = bcrypt.genSaltSync(10),
        hash = bcrypt.hashSync(password, salt),

        userInstance = new Users(null, first_name, last_name, email, hash, users_city, coding_level, about_me, picture_ur);
=======
exports.sign_up_post = (req, res) => {
    const { first_name, last_name, email, password } = req.body;
>>>>>>> cbdd50cb13322f35086e19f0a9f4cbbd3921576b

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt); 
    
    const userInstance = new User(null, first_name, last_name, email, hash);
    userInstance.save().then(response => {
        req.session.first_name = response.first_name;
        req.session.last_name = response.last_name;
        req.session.user_id = response.id;
        res.redirect('/');
    });
}

<<<<<<< HEAD
    if (typeof check === 'object') {
        res.redirect('/users/login');
    } else {
        await userInstance.save().then(response => {
            console.log('response is:', response);
            res.redirect('/users');
        }).catch(err => err)
    }
}
=======
>>>>>>> cbdd50cb13322f35086e19f0a9f4cbbd3921576b
