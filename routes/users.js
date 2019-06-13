const express = require('express'),
  router = express.Router(),
  UsersControllers = require('../controllers/users-controllers');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('template', {
    locals: {
      title: 'User Page',
      is_logged_in: req.session.is_logged_in

    },
    partials: {
      partial: 'partial-index'
    }
  });
});


router.get('/login', UsersControllers.login_page_get);

router.get('/signup', UsersControllers.sign_up_get);

//router.get('users/edit_profile', UsersControllers.edit_profile_get);

router.post('/login', UsersControllers.login_page_post);

router.post('/signup', UsersControllers.sign_up_post);

router.get('/logout', UsersControllers.logout_get);

module.exports = router;
