const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Cart = sequelize.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }

})

module.exports = Cart;
























// const fs = require('fs');
// const path = require('path')

// const p = path.join(path.dirname(process.mainModule.filename),
//     'data',
//     'cart.json'
// );
// module.exports = class Cart {
//     // 购物车不需要创建多个实例，只需要一个就行所以用静态方法

//     static addProduct(id, productPrice) {
//         // 获取之前的购物车
//         fs.readFile(p, (err, file) => {
//             let cart = {
//                 products: [],
//                 totalPrice: 0.00
//             };

//             if (!err) {
//                 cart = JSON.parse(file);
//             }

//             // 分析购物车 -》 找到已存在的产品
//             const existingProductIndex = cart.products.findIndex((prod) => {
//                 return prod.id === id;
//             });
//             const existingProduct = cart.products[existingProductIndex];

//             // 添加产品 / 增加产品的数量
//             let updateProduct;
//             if (existingProduct) {
//                 updateProduct = {...existingProduct };
//                 updateProduct.quantity = updateProduct.quantity + 1;
//                 cart.products = [...cart.products];
//                 cart.products[existingProductIndex] = updateProduct;
//             } else {
//                 updateProduct = { id: id, quantity: 1 };
//                 cart.products = [...cart.products, updateProduct];
//             }
//             cart.totalPrice = (+cart.totalPrice + +productPrice).toFixed(2);

//             fs.writeFile(p, JSON.stringify(cart), (err) => {
//                 console.log(err);
//             })

//         })
//     }

//     static deleteById(id, productPrice) {
//         fs.readFile(p, (err, fileContent) => {
//             if (err) {
//                 return;
//             }
//             const updatedCart = {...JSON.parse(fileContent) };

//             const product = updatedCart.products.find(prod => prod.id === id);
//             if (!product) {
//                 return;
//             }
//             const productQuantity = product.quantity;
//             updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
//             updatedCart.totalPrice = (updatedCart.totalPrice - productPrice * productQuantity).toFixed(2);

//             fs.writeFile(p, JSON.stringify(updatedCart), err => {
//                 console.log(err);
//             })
//         });
//     }

//     static getCart(cb) {
//         fs.readFile(p, (err, fileContent) => {
//             let cart = {
//                 products: [],
//                 totalPrice: 0.00
//             }
//             if (!err) {
//                 cart = JSON.parse(fileContent);
//                 cb(cart);
//             } else {
//                 cb(null);
//             }
//         })
//     }
// }