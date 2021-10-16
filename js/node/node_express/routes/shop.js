const express = require('express');
const shopControllers = require('../controllers/shop');

const router = express.Router();


router.get('/', shopControllers.getIndex);

router.get('/products', shopControllers.getProducts);

// // // // 路由顺序问题
// // // // :productId 是一个动态路由，可以代表 /123, /good, /g234 等
// // // // 如果有一个静态路由 /add, 必须把/add 写到 /:id 之前，否则会被覆盖
// // // router.get('/products/add');

router.get('/products/:productId', shopControllers.getProduct);

router.get('/cart', shopControllers.getCart);

router.post('/cart', shopControllers.postCart);

router.post('/cart-delete-item', shopControllers.postCartDeleteProduct);

router.post('/create-order', shopControllers.postOrder);

router.get('/orders', shopControllers.getOrders);

// // router.get('/checkout', shopControllers.getCheckout);

module.exports = router;