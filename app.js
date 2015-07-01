var express = require('express');
var path = require('path');
var mongoose = require( 'mongoose' ); 
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var routes = require('./routes/index');
var dairies = require('./routes/dairies');
var filters = require('./routes/filters');

//var users = require('./routes/users');

var app = express();
//app.use(express.static(path.join(__dirname, 'public')));
var hbs = require('hbs');
var fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials');
 //mongoose.connect('mongodb://localhost/cartdb');
//mongoose.connect('mongodb://localhost/dairydb');
mongoose.connect('mongodb://sanjeet:noidea@ds061641.mongolab.com:61641/dairydb');


app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride()); 
app.use(cookieParser());

//app.use(express.static(__dirname + '../public'));
app.use('/', routes);
app.use('/',dairies);
app.use('/',filters);


//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
