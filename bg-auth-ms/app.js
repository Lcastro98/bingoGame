var express = require('express');
var path = require('path');
var cors = require('cors');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/database');

require('./config/passport')(passport);
mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });

var indexRouter = require('./routes/index');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(passport.initialize());

let authentication = require('./routes/auth');

app.use('/', indexRouter);

app.use('/api', authentication);
app.use('/api', passport.authenticate('jwt', { session: false}), );

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    //render the error page
    res.status(err.status || 500);
    res.render('error');
});
    
module.exports = app;