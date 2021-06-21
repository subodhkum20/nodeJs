var passport = require('passport');
var localStrategy = require('passport-local');
var jwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');
var config = require('./config')
var user = require('./models/users');
var facebookTokenStrategy = require('passport-facebook-token');
exports.local = passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

exports.getToken = (user) => {
    return jwt.sign(user, config.secretKey, { expiresIn: 86400 })
}
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new jwtStrategy(opts, (jwt_payload, done) => {
    console.log("jwt payload:", jwt_payload);
    user.findOne({ _id: jwt_payload._id }, (err, user) => {
        if (err) {
            return done(err, false);
        }
        else if (user) {
            return done(null, user)
        }
        else {
            return done(null, false)
        }
    })
}))

exports.verifyUser = passport.authenticate('jwt', { session: false })
exports.verifyAdmin = (req, res, next) => {
    if (req.user.admin) {
        return next();
    }
    else {
        var err = new Error('You are not authorized to perform this operation!')
        err.status = 403
        return next(err);
    }
}

exports.facebookPassport = passport.use(new facebookTokenStrategy({
    clientID: config.facebook.clientId,
    clientSecret: config.facebook.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    user.findOne({ facebookId: profile.id }
        , (err, User) => {
            if (err)
                done(err, null);
            if (!err && User !== null)
                done(null, User);
            else {
                var User = new user({ username: profile.displayName });
                User.facebookId = profile.id
                User.firstName = profile.name.givenName;
                User.lastName = profile.name.familyName;
                User.save((err, user) => {
                    if (err)
                        return done(err, false);
                    else
                        return done(null, user);
                })
            }
        });
}))