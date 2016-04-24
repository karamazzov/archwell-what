var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash    = require('connect-flash');
var session = require('express-session');

var app = express();

var mongoose = require('mongoose');
var Mail = require('./models/mail');

var db = 'mongodb://localhost/archwell';

require('./config/passport')(passport); //MEINE CONFIGMEISTER

mongoose.connect(db);

app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

app.use(session({ secret: 'ilovearchwellyarchwellarchwellyarchwell'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
/*

app.use('/', routes);
app.use('/users', users);
*/


app.get('/adminy/', function(req, res) {
        res.render('admin.jade'); // load the admin.jade
    });

app.get('/admin/login', function(req, res) {

           // render the page and pass in any flash data if it exists
        res.render('login.jade', { message: req.flash('loginMessage') });
   });

app.post('/admin/login', passport.authenticate('local-login', {
    successRedirect : '/admin/', // redirect to the secure profile section
    failureRedirect : '/admin/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));


app.get('/admin/profile/', isLoggedIn, function(req, res) {
        res.render('profile.jade', {
             admin : req.admin // get the user out of session and pass to template
         });
  });

app.get('/admin/logout/', function(req, res) {
          req.logout();
          res.redirect('/');
      });

function isLoggedIn(req, res, next) {

          // if user is authenticated in the session, carry on
          if (req.isAuthenticated())
              return next();

          // if they aren't redirect them to the home page
          res.redirect('/');
}




// API BRUH
app.get('/mails', function(req, res){
  Mail.find()
  .exec(function(err, mails) {
    if(err) {
      res.send('error has ocured');
    } else {
      res.send(mails);
      console.log('mailovi su poslati adminu');
    }
  })
});

app.post('/mail', function(req, res){
  var newMail = new Mail();

  newMail.name = req.body.name;
  newMail.email = req.body.email;
  newMail.content = req.body.content;

  newMail.save(function(err,mail){
    if(err){
      res.send('error saving mail');
    } else {
      console.log(mail);
      res.send(mail);
    }
  });

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
