const passport = require('passport');
const GoogleStrategy = require('passport-google-plus-token');
const keys = require('./Key');
const db = require('../db');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy({
    // options for google strategy
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    //callbackURL: '/auth/google/redirect'
  }, (accessToken, refreshToken, profile, done) => {
    // passport callback function
    console.log(accessToken);
    db.query('SELECT * FROM users where idOauth = ?', [profile.id])
      .then(function (result) {
        //check if user in db
        if (result.length != 0) {
          // user already in the db
          user = result[0];
          console.log('user already in the db');
          //console.log(result[0]);
          
          done(null, user);
        }
        else {
          //create new user
          console.log('create new users');
          db.query('INSERT INTO users (idOauth, name) VALUES (?,?)', [profile.id, profile.displayName])
            .then(
              results => {
                //console.log(results);
              }
            );
          db.query('SELECT * FROM users where idOauth = ?', [profile.id]).then(function (result) {
            user = result[0];
            done(null, user);
          })
        }
      });

    console.log(profile);
  })
);