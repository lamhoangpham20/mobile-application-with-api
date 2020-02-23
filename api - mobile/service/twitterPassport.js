const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const keys = require('./Key');
const db = require('../db');

passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });
// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   done(null, id);
// });

passport.use(
    new TwitterStrategy({
        // options for google strategy
        consumerKey: keys.twitter.clientID,
        consumerSecret: keys.twitter.clientSecret,
        callbackURL: '/auth/twitter/callback',
    }, (token, tokenSecret, profile, cb) => {
        // passport callback function
        db.query('SELECT * FROM users where idOauth = ?', [profile.id])
            .then(function (result,err) {
                //check if user in db
                if (result.length != 0) {
                    // user already in the db
                    user = result[0];
                    console.log('user already in the db');
                    console.log(result[0]);
                    return cb(err, user);
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
                       return(null, user);
                    })
                }
            });

        console.log(profile);
    })
);
