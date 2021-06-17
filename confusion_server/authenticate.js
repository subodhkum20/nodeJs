var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var user=require('./models/users');

passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser())
passport.deserializeUser(user.deserializeUser())