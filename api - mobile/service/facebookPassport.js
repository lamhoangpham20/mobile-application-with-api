const passport = require('passport');
const FacebookStrategy = require('passport-facebook-token');
const keys = require('./Key');
const db = require('../db');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});

passport.use(
  new FacebookStrategy({
    // options for google strategy
    clientID: keys.facebook.clientID,
    clientSecret: keys.facebook.clientSecret,
    //callbackURL: '/auth/facebook/redirect'
  }, (accessToken, refreshToken, profile, done) => {
    // passport callback function
    db.query('SELECT * FROM users where idOauth = ?', [profile.id])
      .then(function (result) {
        //check if user in db
        if (result.length != 0) {
          // user already in the db
          user = result[0];
          console.log('user already in the db');
          console.log(result[0]);
          done(null, user);
        }
        else {
          //create new user
          db.query('INSERT INTO users (idOauth, name) VALUES (?,?)', [profile.id, profile.displayName])
            .then(
              results => {
                console.log(results);
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