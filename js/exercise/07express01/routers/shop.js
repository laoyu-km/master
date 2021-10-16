const express = require('express');

const addProduct = require('./add-product');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('shop', {
        products: addProduct.proData,
        'pageTitle': '我的商店'
    });
})

module.exports = router;