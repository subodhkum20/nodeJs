var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var leaderRouter = require('./routes/leaderRouter');
var promoRouter = require('./routes/promoRouter');
const { sign } = require('crypto');

var url = 'mongodb://localhost:27017/';

var connect = mongoose.connect(url);
connect.then((db) => {
  console.log('connected successfully to the database')
}, (err) => {
  return err;
}).catch(err => {
  return err;
})

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cookieParser('i am subodh'));
// cookieParser('thats my secret')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
function auth(req, res, next) {
  if(!req.signedCookies.user){
    var authHeader = req.headers.authorization;
    if (!authHeader) {
      // console.log(authHeader);
      var err = new Error('you are not authenticated');
      res.setHeader( 'WWW-Authenticate', 'Basic' )
      err.status = 401;
      next(err);
      return;
    }
    var user = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    const username = user[0];
    const password = user[1];
    if (username == 'admin' && password == 'password') {
      res.cookie('user','admin',{signed: true});
      next();
    }
    else {
      var err = new Error('you are not authenticated');
      res.setHeader ('WWW-Authenticate','Basic' )
      err.status = 401;
      next(err);
      return;
    }
  }
  else{
    if(req.signedCookies.user==='admin'){
      console.log(req.signedCookies.user);
      next();
    }
    else{
      console.log(req.signedCookies.user);
      var err = new Error('you are not authenticated');
      res.setHeader ('WWW-Authenticate','Basic' )
      err.status = 401;
      next(err);
    }
  }
}

app.use(auth)

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes', dishRouter);
app.use('/leaders', leaderRouter);
app.use('/promotions', promoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;