const passport = require('passport');
const userModel = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const tokenExtractor = function (req) {
    return req.headers['token'];
};

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromExtractors([tokenExtractor]);
opts.secretOrKey = process.env.secretkey;

const strategy = new JwtStrategy(opts, function (jwt_payload, done) {
    userModel.findOne({ _id: jwt_payload.data._id }, async function (err, user) {
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    });
});

passport.use(strategy);