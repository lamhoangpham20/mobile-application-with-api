const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    db.query('SELECT products.*, users.name FROM products inner join users on products.idusers = users.id').then(results => {
        res.json({ products: results });
    }).catch(() => {
        res.sendStatus(500);
    });
});

router.get('/:idproduct', (req, res) => {
    db.query('SELECT products.*, users.name FROM products where idproduct = ? inner join users on products.idusers = users.id ', [req.params.idproduct])
        .then(results => {
            res.json(results);
        }).catch(error => {
            console.error(error);
            res.sendStatus(404);
        });
});

router.post('/', (req, res) => {
    db.query('INSERT INTO products (idusers, Title, Description, Category, Location, Images, Price, ShippingType ) VALUES (?,?,?,?,?,?,?,?)',
        [req.body.idusers, req.body.title, req.body.description, req.body.category, req.body.location, req.body.images, req.body.price, req.body.Shippingtype])
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
    db.query('UPDATE products set  Title=?, Description=?, Category=?, Location=?, Images=?, Price=?, ShippingType=? where idproduct=?',
        [req.body.title, req.body.description, req.body.category, req.body.location, req.body.images, req.body.price, req.body.Shippingtype, req.params.idproduct])
        .then(results => {
            console.log(results);
            res.sendStatus(201);
        }).catch(error => {
            console.error(error);
            res.sendStatus(500);
        });
});

router.get('/category/:category', (req, res)=>{
    db.query('SELECT products.*, users.name FROM products inner join users on products.idusers = users.id ')
    .then((results)=>
    {
        console.log(results);
        console.log(results.products);
        let products = results.filter(i=> i.Category.toUpperCase().includes(req.params.category.toUpperCase()));
        res.send(products);
    }).catch(error => {
        console.log(error);
    })
});

router.get('/location/:location', (req,res) =>{
    db.query('SELECT products.*, users.name FROM products inner join users on products.idusers = users.id ')
    .then((results) => {
        console.log(results);
        console.log(results.products);
        let products = results.filter(i => i.Location.toUpperCase().includes(req.params.location.toUpperCase()));
        res.send(products);
    }).catch(error => {
        console.log(error);
    })
})

router.get('/date/:date', (req,res) =>{
    db.query('SELECT products.*, users.name FROM products inner join users on products.idusers = users.id ')
    .then((results) => {
        console.log(results);
        console.log(results.products);
        let products = results.filter(i => i.Date.toUpperCase().includes(req.params.date.toUpperCase()));
        res.send(products);
    }).catch(error => {
        console.log(error);
    })
})
module.exports = router;
