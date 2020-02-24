const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM products').then(results => {
        res.json({ products: results });
    }).catch(() => {
        res.sendStatus(500);
    });
});

router.get('/:idproduct', (req, res) => {
    db.query('SELECT * FROM products where idproduct = ?', [req.params.idproduct])
        .then(results => {
            res.json(results);
        }).catch(error => {
            console.error(error);
            res.sendStatus(404);
        });
});

router.post('/', (req, res) => {
    db.query('INSERT INTO products (idusers,Title , Description , Category , Location , Images , Price , Type ) VALUES (?,?,?,?,?,?,?,?)',
        [ req.body.iduser,req.body.title, req.body.description, req.body.category, req.body.location, req.body.images, req.body.price, req.body.type])
        .then(results => {
            console.log(results);
            res.sendStatus(201);
        }).catch((err) => {
            res.sendStatus(500);
            console.log(err);
        });
});

router.delete('/:idproduct', (req, res) => {
    db.query('DELETE FROM products where idproduct = ?', [req.params.idproduct])
        .then(result => {
            res.sendStatus(201);
        }).catch(error => {
            console.error(error);
            res.sendStatus(404);
        });
});

router.put('/:idproduct', (req, res) => {
    db.query('UPDATE products set iduser=? Title=? , Description=? , Category=? , Location=? , Images=? ,Price=?, Type=? where idproduct=?',
        [req.body.iduser, req.body.title, req.body.description, req.body.category, req.body.location, req.body.images, req.body.price, req.body.type, req.params.idproduct])
        .then(results => {
            console.log(results);
            res.sendStatus(201);
        }).catch(error => {
            console.error(error);
            res.sendStatus(500);
        });
});

module.exports = router;
