const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');
const saltRounds = 4;
//  Return all dog information 
router.get('/', (req, res) => {
    db.query('SELECT * FROM users').then(results => {
        res.json({ users: results })
    })
        .catch(() => {
            res.sendStatus(500);
        })
});

//  Return information of a single dog 
router.get('/:usersId', (req, res) => {
    db.query('SELECT * FROM users where id = ?', [req.params.usersId])
        .then(results => {
            res.json(results);
        })
        .catch(error => {
            console.error(error);
            res.sendStatus(500);
        });
})

/* Create a new dog 
    Expects the following data format
    {
        name: string, 
        image: string - whole url to image
    }
*/
router.post('/', (req, res) => {
    let username = req.body.username.trim();
    let password = req.body.password.trim();

    if ((typeof username === "string") &&
        (username.length > 4) &&
        (typeof password === "string") &&
        (password.length > 6)) {
        bcrypt.hash(password, saltRounds).then(hash =>
            db.query('INSERT INTO users (username, password, name) VALUES (?,?,?)', [username, hash,req.body.name])
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

router.delete('/:usersId', (req, res) => {
    db.query('DELETE FROM users where id = ?', [req.params.usersId])
        .then(results => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.error(error);
            res.sendStatus(500);
        });
});

router.put('/:usersId', (req, res) => {
    db.query('update users set name=? where id=?', [req.name, req.params.usersID])
        .then(results => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.error(error);
            res.sendStatus(500);
        });
});


module.exports = router;