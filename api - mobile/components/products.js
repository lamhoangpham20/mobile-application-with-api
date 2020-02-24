const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM products inner join users on products.idusers = users.id').then(results => {
        res.json({ products: results });
    }).catch(() => {
        res.sendStatus(500);
    });
});

router.get('/:idproduct', (req, res) => {
    db.query('SELECT * FROM products where idproduct = ? inner join users on products.idusers = users.id ', [req.params.idproduct])
        .then(results => {
            res.json(results);
        }).catch(error => {
            console.error(error);
            res.sendStatus(404);
        });
});

router.post('/', (req, res) => {
    db.query('INSERT INTO products (idusers,Title , Description , Category , Location , Images , Price , ShippingType ) VALUES (?,?,?,?,?,?,?,?)',
        [ req.body.idusers,req.body.title, req.body.description, req.body.category, req.body.location, req.body.images, req.body.price, req.body.Shippingtype])
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
    db.query('UPDATE products set idusers=? Title=? , Description=? , Category=? , Location=? , Images=? ,Price=?, ShippingType=? where idproduct=?',
        [req.body.idusers, req.body.title, req.body.description, req.body.category, req.body.location, req.body.images, req.body.price, req.body.Shippingtype, req.params.idproduct])
        .then(results => {
            console.log(results);
            res.sendStatus(201);
        }).catch(error => {
            console.error(error);
            res.sendStatus(500);
        });
});

module.exports = router;
