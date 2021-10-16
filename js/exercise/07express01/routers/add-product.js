const express = require('express');

const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
    res.render('add-product', {
        pageTitle: '添加商品',
    })
})

router.post('/product', (req, res, next) => {
    products.push(req.body);
    res.status(303).redirect('/');
})

module.exports.router = router;
module.exports.proData = products;