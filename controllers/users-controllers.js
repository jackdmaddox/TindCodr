const bcrypt = require('bcryptjs');
    User = require('../models/users-model'),
    Likes = require('../models/matchmaking-model');


///////
// PAGE GETS //
///////

exports.user_page_get = async (req, res) => {
    const userInstance = new User(req.session.user_id, null, null, null, null, null),
        getUserInfo = await userInstance.getUserInfo();
        //getAllUserComments = await userInstance.getOneUserComments();

    res.render('template', {
        locals: {
            title: 'Your Profile',
            userInfo: getUserInfo,
            // usercomments: getAllUserComments,
            is_logged_in: req.session.is_logged_in,
            user_id: req.session.user_id

        },
        partials: {
            partial: 'partial-myprofile'
        }
    });
}

exports.matchmaker_page_get = async (req, res) => {
    const randomUser = new Likes(req.session.user_id, null)

    let randomUserID = await randomUser.randomUserIDGenerator();
    
    console.log('this is randomuserid from controller', randomUserID.id);
    
    const userInstance = new User(randomUserID.id, null, null, null, null, null)
    console.log('this is the user instance', userInstance);
    getUserInfo = await userInstance.getUserInfo();
    console.log(getUserInfo);
    res.render('template', {
        locals: {
            title: 'MatchMaker',
            userInfo: getUserInfo,
            is_logged_in: req.session.is_logged_in,
            user_id: req.session.user_id

        },
        partials: {
            partial: 'partial-matchmaker'
        }
    });
}

exports.mymatches_page_get = async (req, res) => {
    const loggedInUserId = req.session.user_id;
    const allMatches = await Likes.getMatchesById(loggedInUserId);
    console.log('this is all matches:', allMatches);
    res.render('template', {
        locals: {
            title: 'Match Details',
            myListOfMatches: allMatches,
            is_logged_in: req.session.is_logged_in,
            user_id: req.session.user_id
        },
        partials: {
            partial: 'partial-mymatches',
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
        userInstance = new User(null, null, null, email, password, null, null);
        const userData = await userInstance.getUserByEmail();
        const isValid = bcrypt.compareSync(password, userData.users_password);
        console.log(userData);
        if (!!isValid) {
        req.session.is_logged_in = true;
        req.session.first_name = userData.users_first_name;
        req.session.last_name = userData.users_last_name;
        req.session.user_id = userData.id;
        req.session.city = userData.users_city;
        req.session.about_me = userData.users_about_me;
        console.log('CORRECT PW!');
        res.redirect('/projects');
    } else {
        console.log('WRONG PW!');
        res.redirect('/users/signup');
        res.sendStatus(401);
    }
}

exports.sign_up_post = (req, res) => {
    const { first_name, last_name, city, about_me, email, password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt); 
    
    const userInstance = new User(null, first_name, last_name, email, hash, city, about_me);
    userInstance.save().then(response => {
        req.session.first_name = response.first_name;
        req.session.last_name = response.last_name;
        req.session.user_id = response.id;
        req.session.city = response.users_city;
        req.session.about_me = response.about_me;
        res.redirect('/users/login');
    });
}

exports.matchmaker_liked_post = (req, res) => {
        const {liked_id, liker_id} = req.body;
        Likes.likeUser(liked_id, liker_id)
        .then(async () => {
            res.redirect('/matchmaker');
        })
        .catch((err) => {
            res.sendStatus(500).send(err.message);
        });
}

exports.matchmaker_disliked_post = (req, res) => {
    const {liked_id, liker_id} = req.body;
    Likes.dislikeUser(liked_id, liker_id)
    .then(async () => {
        res.redirect('/matchmaker');
    })
    .catch((err) => {
        res.sendStatus(500).send(err.message);
    });
}
