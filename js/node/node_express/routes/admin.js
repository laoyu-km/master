const express = require('express');

const adminControllers = require('../controllers/admin');

const router = express.Router();

const addProData = [];

// /admin/add-product
router.get('/add-product', adminControllers.getAddProduct);

// // /admin/products
router.get('/products', adminControllers.getProducts);

// /admin
router.post('/add-products', adminControllers.postAddProduct);

router.get('/edit-product/:productId', adminControllers.getEditProduct);

router.post('/edit-product', adminControllers.postEditProduct);

router.post('/delete-product', adminControllers.postDeleteProduct);

module.exports.router = router;