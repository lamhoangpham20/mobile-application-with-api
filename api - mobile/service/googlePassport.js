const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./googleKey');
const db = require('../db');
passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        db.query('SELECT * FROM users where idGoogle = ?', [profile.id])
            .then(function (result) {
                //check if user in db
                if (result.length != 0) {
                    // user already in the db
                    console.log('user already in the db');
                }
                else {
                    //create new user
                    db.query('INSERT INTO users (idGoogle, name) VALUES (?,?)', [profile.id, profile.displayName])
                        .then(results => {
                            console.log(results);
                            res.sendStatus(201);
                        }).catch(err => { console.log(err); })
                }
            }).catch((err) => {
                console.log(err);
            }
            )
        // console.log(profile);
    })
);