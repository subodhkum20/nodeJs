var express = require('express');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = express.Router();
var users = require('../models/users')
var passport = require('passport')
router.use(bodyParser.json())
var authenticate = require('../authenticate')
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.post('/signup', (req, res, next) => {
  users.register(new users({ username: req.body.username }), req.body.password, (err, user) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json')
      res.json({ err: err });
    }
    else {
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: true, status: 'registaration successful' })
        // res.redirect('/')
      })
    }
  })

});
router.post('/login', passport.authenticate('local'), (req, res) => {
  var token=authenticate.getToken({_id:req.user._id})
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({ success: true, token:token, status: 'You are successfully logged in!' });
});

router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('you are not logged in');
    res.statusCode = 403;
    next(err);
  }

})
module.exports = router;
