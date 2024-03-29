var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var authenticated = require('./authenticate');
var config = require('./config');

//IMPORTING ROUTES
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const dishRouter = require('./routes/dishRouter');
const leaderRouter = require('./routes/leaderRouter');
const promoRouter = require('./routes/promoRouter');
const uploadRouter = require('./routes/uploadRouter');
const favoriteRouter = require('./routes/favorite');

const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log('Connected correctly to the server');
}).catch( err => console.log('Error on connect to the server:', err));

var app = express();

// SETTING SECURE TRAFIC ONLY (HTTPS ONLY)
app.all('*', (req, res, next) => {
  if (req.secure) {
    return next(); 
  }
  else {
    res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// encrypt cookie
// app.use(cookieParser('12345-67890-09876-54321'));
app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}))

// PASSPORT
app.use(passport.initialize());
app.use(passport.session());

// REGISTER ROUTES BEFORE AUTHENTICATION
app.use('/', indexRouter);
app.use('/users', usersRouter);

// USED BEFORE WE INTRODUCED JWT PASSPORT
//
// function auth(req, res, next){
//   console.log('SESSION REQ', req.session);

//   if( !req.user ){
//     var err = new Error('You are not authenticated');
//     err.status = 403;
//     return next(err);
//   }
//   else{
//     if( req.session.user === 'authenticated' ){
//       next();
//     }
//     else{
//       next();
//     }
//   }

// }
// app.use(auth);

// set authentication before set public paths
app.use(express.static(path.join(__dirname, 'public')));

// REGISTER ROUTES
app.use('/dishes', dishRouter);
app.use('/leaders', leaderRouter);
app.use('/promotions', promoRouter);
app.use('/imageUpload',uploadRouter);
app.use('/favorites', favoriteRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
