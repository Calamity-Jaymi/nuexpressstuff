var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const campsiteRouter = require('./routes/campsiteRouter');
const promotionRouter = require('./routes/promotionRouter');
const partnerRouter = require('./routes/partnerRouter');

const mongoose = require('mongoose');
const { runInNewContext } = require('vm');
// i feel like i am missing something? like i skipped something?
const url = 'mongodb://localhost:27017/nucampsite';
const connect = mongoose.connect(url, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

connect.then(() => console.log('You are connected to the server correctly'), 
    err => console.log(err)
); // error promise

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('12345-67890-09876-54321'));

function auth(req, res, next) {
  if (!req.signedCookies.user) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      const err = new Error('You are not authenticated');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      return next(err);
    }//if !authHeader close
    ////////
    const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(":");
    const user = auth[0];
    const pass = auth[1];
    ///////
    if (user === 'admin' && pass === 'password') {
        res.cookie("user", "admin", { signed: true });
        return next();
    } else {
        const err = new Error('You are not authenticated');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err);
    }//if/else
  } else {
      if (req.signedCookies.user === "admin") {
        return next();
      }/*line 64 close*/ else {
        const err = new Error('You are not authenticated');
        err.status = 401;
        return next(err);
      } //line 66 close
  }  //line 63 close
}//func auth close

app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
///////////////////////////////////////
app.use('/campsites', campsiteRouter);
app.use('/promotions', promotionRouter);
app.use('/partners', partnerRouter);
///////////////////////////////////////
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
