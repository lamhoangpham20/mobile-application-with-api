const express  = require('express');
const router = express.Router();
const db = require('../db');

//  Return all dog information 
router.get('/', (req, res) => { 
    db.query('SELECT * FROM users').then(results => {
        res.json({ users: results})
    })
    .catch(() => {
        res.sendStatus(500);
    })    
});

//  Return information of a single dog 
router.get('/:usersId', (req, res) => {
    db.query('SELECT * FROM dogHouse where id = ?', [req.params.usersId])
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

    db.query('INSERT INTO users (name, idGoogle) VALUES (?,?)', [req.body.name])
    .then(results => {
        console.log(results);
        res.sendStatus(201);
    })
    .catch(() => {
        res.sendStatus(500);
    });
    
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