var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var Admin            = require('../public/admin/models/admin');

// expose this function to our app using module.exports
module.exports = function(passport) {
  // serijalizacija prvo ( i deserijalizacija)
  passport.serializeUser(function(admin, done) {
         done(null, admin.id);
     });

     // used to deserialize the user
     passport.deserializeUser(function(id, done) {
         Admin.findById(id, function(err, admin) {
             done(err, admin);
         });
     });




     passport.use('local-login', new LocalStrategy({
             // by default, local strategy uses username and password, we will override with email
             usernameField : 'email',
             passwordField : 'password',
             passReqToCallback : true // allows us to pass back the entire request to the callback
         },
         function(req, email, password, done) { // callback with email and password from our form

             // find a user whose email is the same as the forms email
             // we are checking to see if the user trying to login already exists
             Admin.findOne({ 'local.email' :  email }, function(err, admin) {
                 // if there are any errors, return the error before anything else
                 if (err)
                     return done(err);

                 // if no user is found, return the message
                 if (!admin)
                     return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

                 // if the user is found but the password is wrong
                 if (!admin.validPassword(password))
                     return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                 // all is well, return successful user
                 return done(null, admin);
             });

         }));

     };
