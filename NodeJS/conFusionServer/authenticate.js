var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
// JWT ENCRYPT + STRATEGY
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var config = require('./config.js');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user) {
    // CRIA O TOKEN COM AS OPÇÕES
    // USER -> PAYLOAD DO USUARIO
    // CONFIG.SECRETKEY -> KEY PARA ENCRIPITAR O TOKEN
    // 3 PARAMETRO -> JSON COM OPÇÕES DE ENCRIPTAÇÃO
    return jwt.sign(user, config.secretKey,
        {expiresIn: 3600});
};

var opts = {};
// SET HOW JWT EXTRACT INCOMING REQUEST, CAN ADD CUSTOM EXTRACTS WAYS
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// SET SECRET KEY
opts.secretOrKey = config.secretKey;

// JWT STRATEGY FOR PASSPORT
exports.jwtPassport = passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log("JWT payload: ", jwt_payload);
    User.findOne({_id: jwt_payload._id}, (err, user) => {
        if (err) {
            // done() IS THE CALLBACK THAT PASSPORT INTO YOUR STRATEGY
            return done(err, false);
        }
        else if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    });
}));

// Passport authentication passing the encrypt strategy and options
exports.verifyUser = passport.authenticate('jwt', {session: false});

// CUSTOM VERIFICATION FOR CHECK IF USER HAS ADMIN PREVILIGES
exports.verifyAdmin = function(req, res, next) {
    console.log(req.user);
    User.findOne({_id: req.user._id})
    .then((user) => {
        console.log("User: ", req.user);
        if (user.admin) {
            next();
        }
        else {
            err = new Error('You are not authorized to perform this operation!');
            err.status = 403;
            return next(err);
        } 
    }, (err) => next(err))
    .catch((err) => next(err))
}
