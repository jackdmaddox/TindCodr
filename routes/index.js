var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('template', { 
    locals: {
      title: 'Welcome to the index page', 
      is_logged_in: req.session.is_logged_in

    },
    partials: {
      partial: 'partial-index'
    }
    });
});

module.exports = router;
