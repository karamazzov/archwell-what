var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

var mongoose = require('mongoose');
var Mail = require('./public/admin/models/Mail.model');

var db = 'mongodb://localhost:27017/contactdb';

mongoose.connect(db);

app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/*
app.use('/', routes);
app.use('/users', users);
*/

// API BRUH
app.get('/mails', function(req, res){
  Mail.find({name:"Petar Matko"})
  .exec(function(err,mail) {
    if(err) {
      res.send('error has ocured');
    } else {
      res.json(mail);
    }
  })
});

app.post('/admin/', function(req, res){


});

// ALL PURPOSE ROUTE
app.get('/mails', function(req, res){
  res.send('perapro');
  console.log('alert123');
});

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
