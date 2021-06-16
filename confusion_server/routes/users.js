var express = require('express');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = express.Router();
var users = require('../models/users')
router.use(bodyParser.json())

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.post('/signup', (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    var err = new Error('you are not authenticated');
    res.statusCode = 401;
    next(err);
  }
  else {
    users.findOne({ username: req.body.username }).then((user) => {
      if (user !== null) {

        var err = new Error('username already exists!');
        res.statusCode = 403;
        // res.setHeader('www-authenticate', 'basic');
        next(err);
      }
      else {
        users.create({ username: req.body.username, password: req.body.password })
      }
    })
        .then((user) => {
          res.statusCode = 200;
          res.setHeader('content-type', 'application/json');
          res.json({status:"rsgistration successful",user:user});
        },err => {next(err);}).catch((err) => { next(err); });
  }
});
router.post('/login', (req, res, next) => {
  if (!req.session.user) {
    var authHeader=req.headers.authorization;
    if(!authHeader){
      var err = new Error('you are not authenticated');
      res.setHeader('www-authenticate', 'basic');
      res.statusCode=401;
      return next(err);
    }
    var user=new Buffer.from(authHeader.split(' ')[1],'base64').toString().split(':');
    var username=user[0];
    var password=user[1];
    users.findOne({username:username}).then((user) => {
      if(user===null){
        var err = new Error('user not found');
        res.statusCode=403;
        // res.setHeader('www-authenticate', 'basic');
        return next(err);
      }
      else if(user.password!=password){
        var err = new Error('Your password is incorrect');
        err.status=403;
        // res.setHeader('www-authenticate', 'basic');
        return next(err);
      }
      else{
        res.statusCode=200;
        res.setHeader('content-type', 'text/plain');
        req.session.user='authenticated';
        res.end('you are authenticated')
      }
    }).catch((err) => next(err))
  }
  else {
    res.statusCode=200;
        res.setHeader('content-type', 'text/plain');
        // res.session.user='authenticated';
        res.end('you are already authenticated');
  }
})
router.get('/logout',(req, res, next)=>{
  if(req.session){
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else{
    var err= new Error('you are not logged in');
    res.statusCode=403;
    next(err);
  }

})
module.exports = router;
