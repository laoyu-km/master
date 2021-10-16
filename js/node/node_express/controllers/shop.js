const Product = require('../models/product');
const Order = require('../models/order');
// const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
    // mongoose 方法
    Product.find() // mongoose 获取所有表元素的方法
        .then(products => {
            res.render("shop/index", {
                products: products,
                pageTitle: "商店",
                path: "/"
            });
        })
        .catch(err => console.log(err));




    // // mongodb 方法
    // Product.fetchAll()
    //     .then(products => {
    //         res.render("shop/index", {
    //             products: products,
    //             pageTitle: "商店",
    //             path: "/"
    //         });
    //     })
    //     .catch(err => console.log(err));



    // // sequlize 方法
    // Product.findAll()
    //     .then(products => {
    //         res.render("shop/index", {
    //             products: products,
    //             pageTitle: "商店",
    //             path: "/"
    //         });

    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });




    // Product.fetchAll()
    //     .then(([rows, fileds]) => {
    //         res.render("shop/index", {
    //             products: rows,
    //             pageTitle: "商店",
    //             path: "/"
    //         });

    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
};

exports.getProducts = (req, res, next) => {
    // mongoose
    Product.find()
        .then(products => {
            res.render("shop/product-list", {
                products: products,
                pageTitle: "商店",
                path: "/"
            });
        })
        .catch(err => console.log(err));


    // // mongodb
    // Product.fetchAll()
    //     .then(products => {
    //         res.render("shop/product-list", {
    //             products: products,
    //             pageTitle: "商店",
    //             path: "/"
    //         });
    //     })
    //     .catch(err => console.log(err));


    // // sequelize
    // Product.findAll()
    //     .then(products => {
    //         res.render("shop/product-list", {
    //             products: products,
    //             pageTitle: "所有商品",
    //             path: "/products"
    //         });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })




    // Product.fetchAll()
    //     .then(([row, fileds]) => {
    //         res.render("shop/product-list", {
    //             products: row,
    //             pageTitle: "所有商品",
    //             path: "/products"
    //         });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    console.log(prodId);

    // mongoose
    Product.findById(prodId) // mongoose 方法的会自动将传入的字符串id， 转换为ObjectId类型
        .then((product) => {
            console.log(product);
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: "/products"
            });
        })
        .catch(err => {
            console.log(err);
        });





    // mongodb
    // Product.findById(prodId)
    //     .then((product) => {
    //         console.log(product);
    //         res.render('shop/product-detail', {
    //             product: product,
    //             pageTitle: product.title,
    //             path: "/products"
    //         });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });


    // // sequelize 方法1
    // Product.findAll({ where: { id: prodId } })
    //     .then(products => {
    //         res.render('shop/product-detail', {
    //             product: products[0],
    //             pageTitle: product[0].title,
    //             path: "/products"
    //         });

    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });

    // // sequelize 方法2
    // Product.findByPk(prodId)
    //     .then((product) => {
    //         console.log(product);
    //         res.render('shop/product-detail', {
    //             product: product,
    //             pageTitle: product.title,
    //             path: "/products"
    //         });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });






    // Product.findById(prodId)
    //     .then(([product]) => {
    //         console.log(product);
    //         res.render('shop/product-detail', {
    //             product: product[0],
    //             pageTitle: product.title,
    //             path: "/products"
    //         });
    //     })
    //     .catch();
}



exports.getCart = (req, res, next) => {
    // mongoose
    req.user
        .populate('cart.items.productId') // 这里populate的参数路径顺序是从user的对象的第一层，层层递进，user对象的第一层由cart, cart包含items， items包含productId
        // populate方法不会放回一个promise对象，所以还需要执行一个execPopolate()函数
        .execPopulate()
        .then(user => {
            const products = user.cart.items;
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: '我的购物车',
                products: products
            });

        })
        .catch(err => console.log(err));


    // // mongodb
    // req.user
    //     .getCart()
    //     .then(products => {
    //         res.render('shop/cart', {
    //             path: '/cart',
    //             pageTitle: '我的购物车',
    //             products: products
    //         });

    //     })
    //     .catch(err => console.log(err));



    // req.user
    //     .getCart()
    //     .then(cart => {
    //         return cart.getProducts();
    //     })
    //     .then(products => {
    //         res.render('shop/cart', {
    //             path: '/cart',
    //             pageTitle: '我的购物车',
    //             products: products
    //         });

    //     })
    //     .catch(err => console.log(err));




    // Cart.getCart(cart => {
    //     Product.fetchAll(products => {
    //         const cartProducts = [];
    //         for (product of products) {
    //             const cartProductData = cart.products.find(prod => prod.id === product.id);
    //             if (cartProductData) {
    //                 cartProducts.push({ productData: product, quantity: cartProductData.quantity });
    //             }
    //         }
    //         res.render('shop/cart', {
    //             path: '/cart',
    //             pageTitle: '我的购物车',
    //             products: cartProducts
    //         });
    //     })
    // });
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;

    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));




    // let fetchCart;
    // let newQuantity = 1;
    // req.user
    //     .getCart()
    //     .then(cart => {
    //         fetchCart = cart;
    //         return cart.getProducts({ where: { id: prodId } });
    //     })
    //     .then(products => {
    //         let product;
    //         if (products.length > 0) {
    //             product = products[0];
    //         }
    //         if (product) {
    //             const oldQuantity = product.cartitem.quantity; // sequelize 会在product对象中添加cartItem属性，这个属性是在定义多对多表结构中的中间表，我们把quantity放到了中间表中
    //             newQuantity = oldQuantity + 1;
    //             return product;
    //         }
    //         return Product.findByPk(prodId);
    //     })
    //     .then(product => {
    //         return fetchCart.addProduct(product, { through: { quantity: newQuantity } });
    //     })
    //     .then(() => {
    //         res.redirect('/cart');
    //     })
    //     .catch(err => console.log(err));



    // Product.findById(prodId, product => {
    //     Cart.addProduct(prodId, product.price);
    // })
    // res.redirect('/cart');
}

exports.postCartDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;

    req.user.deleteItemFromCart(productId)
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));






    // req.user
    //     .getCart()
    //     .then(cart => {
    //         return cart.getProducts({ where: { id: productId } })
    //     })
    //     .then(products => {
    //         const product = products[0];
    //         return product.cartitem.destroy();
    //     })
    //     .then(result => {
    //         res.redirect('/cart');
    //     })
    //     .catch(err => console.log(err));

    // Product.findById(productId, product => {
    //     Cart.deleteById(productId, product.price);
    //     res.redirect('/cart');
    // })
}

exports.postOrder = (req, res, next) => {
    // mongoose
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items.map(i => {
                return {
                    product: {...i.productId._doc },
                    quantity: i.quantity
                };
            });

            const order = new Order({
                products: products,
                user: {
                    name: req.user.name,
                    userId: req.user
                }
            });
            return order.save();
        })
        .then(result => {
            return req.user.clearCart();
        })
        .then(result => {
            res.redirect('/orders');
        })
        .catch(err => console.log(err));


    // // mongodb 
    // let fetchCart;
    // req.user.addOrder()
    //     .then(result => {
    //         res.redirect('/orders');
    //     })
    //     .catch(err => console.log(err));




    // let fetchCart;
    // req.user
    //     .getCart()
    //     .then(cart => {
    //         fetchCart = cart;
    //         return cart.getProducts();
    //     })
    //     .then(products => {
    //         return req.user
    //             .createOrder()
    //             .then(order => {
    //                 order.addProducts(products.map(product => {
    //                     product.orderItem = { quantity: product.cartitem.quantity };
    //                     return product;
    //                 }))
    //             })
    //             .catch(err => console.log(err));
    //     })
    //     .then(result => {
    //         return fetchCart.setProducts(null); //清空购物车
    //     })
    //     .then(resulet => {
    //         res.redirect('/orders');
    //     })
    //     .catch(err => console.log(err));
}

exports.getOrders = (req, res, next) => {
    // mongooose
    Order.find({ 'user.userId': req.user._id })
        .then(orders => {
            res.render('shop/orders', {
                path: '/order',
                pageTitle: '我的订单',
                orders: orders
            })
        })






    // // mongodb
    // req.user.getOrders()
    //     .then(orders => {
    //         res.render('shop/orders', {
    //             path: '/order',
    //             pageTitle: '我的订单',
    //             orders: orders
    //         });

    //     })
    //     .catch(err => console.log(err));





    // req.user
    //     .getOrders({ include: ['products'] }) // 这里参数作用是在获取orders的同时，获取orders对应products, Product 模型在定义时的名字是product，sequelize 自动将其改为复数，而在app.js中，模型关系定义时，Order 和 Product 是多对多关系，所以这里是products
    //     .then(orders => {
    //         res.render('shop/orders', {
    //             path: '/order',
    //             pageTitle: '我的订单',
    //             orders: orders
    //         });

    //     })
    //     .catch(err => console.log(err))

}

// exports.getCheckout = (req, res, next) => {
//     res.render('shop/checkout', {
//         path: '/checkout',
//         pageTitle: '结算页面'
//     })
// }