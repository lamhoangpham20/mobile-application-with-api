const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const saltRounds = 4;
//  Return all users information 
router.get('/', (req, res) => {
    db.query('SELECT id, idOauth, username, name, email, phoneNumber FROM users').then(results => {
        res.json({ users: results })
    })
        .catch(() => {
            res.sendStatus(500);
        })
});

//  Return information of a single user
router.get('/:usersId', (req, res) => {
    db.query('SELECT id, idOauth, username, name, email, phoneNumber FROM users where id = ?', [req.params.usersId])
        .then(results => {
            res.json(results);
        })
        .catch(error => {
            console.error(error);
            res.sendStatus(500);
        });
})

/* Create a new user
   
*/
router.post('/', (req, res) => {
    let username = req.body.username.trim();
    let password = req.body.password.trim();

    if ((typeof username === "string") &&
        (username.length > 4) &&
        (typeof password === "string") &&
        (password.length > 6)) {
        bcrypt.hash(password, saltRounds).then(hash =>
            db.query('INSERT INTO users (username, password, name, email, phoneNumber) VALUES (?,?,?,?,?)', [username, hash, req.body.name, req.body.email, req.body.phoneNumber])
        )
            .then(dbResults => {
                console.log(dbResults);
                res.sendStatus(201);
            })
            .catch(error => res.sendStatus(500));
    }
    else {
        console.log("incorrect username or password, both must be strings and username more than 4 long and password more than 6 characters long");
        res.sendStatus(400);
    }
});

router.delete('/:usersId', passport.authenticate('jwt', { session: false }), (req, res) => {
    db.query('DELETE FROM users where id = ?', [req.params.usersId])
        .then(results => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.error(error);
            res.sendStatus(500);
        });
});

router.put('/:usersId', passport.authenticate('jwt', { session: false }), (req, res) => {
    db.query('update users set name=? where id=?', [req.body.name, req.params.usersId])
        .then(results => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.error(error);
            res.sendStatus(500);
        });
});


module.exports = router;