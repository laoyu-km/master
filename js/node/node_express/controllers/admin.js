const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: '添加商品',
        path: 'admin/edit-product',
        editing: false
    });
}

exports.postAddProduct = (req, res, next) => {
    const { title, imageUrl, price, description } = req.body;

    // mongoose 方法
    const product = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
        // userId: req.user._id
        userId: req.user //这里可以直接传user这个对象，mongoose可以帮助分析出_id
    });

    product.save()
        .then(result => {
            console.log('产品添加成功');
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });





    // // mongodb 方法
    // const product = new Product(title, imageUrl, price, description, null, req.user._id);

    // product.save()
    //     .then(result => {
    //         console.log('产品添加成功');
    //         res.redirect('/admin/products');
    //     })
    //     .catch();


    // // sequelize 方法
    // //sequlize 自动添加的方法往产品里添加id 
    // req.user.createProduct({ // createProduct()是sequelize根据表间关联规则自动生成的一个函数. product 就是 数据模型定义时的名称
    //         title: title,
    //         imageUrl: imageUrl,
    //         price: price,
    //         description: description,
    //     })
    //     .then(result => {
    //         res.status(303).redirect('/');
    //     })
    //     .catch(err => console.log(err));

    //     // // 手动获取user id
    //     // Product.create({
    //     //         title: title,
    //     //         imageUrl: imageUrl,
    //     //         price: price,
    //     //         description: description,
    //     //         userId: req.user.id // 手动方式获取user.id
    //     //     })
    //     //     .then(result => {
    //     //         res.status(303).redirect('/');
    //     //     })
    //     //     .catch(err => console.log(err));



    //     // // mysql2 的方法
    //     // const product = new Product(null, title, imageUrl, price, description);
    //     // product.save()
    //     //     .then(() => {
    //     //         res.status(303).redirect('/');
    //     //     })
    //     //     .catch(err => {
    //     //         console.log(err);
    //     //     });
}

// mongsedb 和 mongoose 使用同样的方法
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;

    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/edit-product', {
                pageTitle: '编辑产品',
                path: '/admin/edit-product',
                editing: editMode,
                product: product
            });

        })
        .catch(err => console.log(err));



    // // sequelize 方法
    // req.user.getProducts({ where: { id: prodId } }) // 返回一个数组
    //     .then(products => {
    //         const product = products[0];
    //         if (!product) {
    //             return res.redirect('/');
    //         }
    //         res.render('admin/edit-product', {
    //             pageTitle: '编辑产品',
    //             path: '/admin/edit-product',
    //             editing: editMode,
    //             product: product
    //         });

    //     })
    //     .catch(err => console.log(err));

    // Product.findByPk(prodId)
    //     .then((product) => {
    //         if (!product) {
    //             return res.redirect('/');
    //         }
    //         res.render('admin/edit-product', {
    //             pageTitle: '编辑产品',
    //             path: '/admin/edit-product',
    //             editing: editMode,
    //             product: product
    //         });

    //     })
    //     .catch(err => console.log(err));




    // Product.findById(prodId, product => {
    //     if (!product) {
    //         return res.redirect('/');
    //     }
    //     res.render('admin/edit-product', {
    //         pageTitle: '编辑产品',
    //         path: '/admin/edit-product',
    //         editing: editMode,
    //         product: product
    //     });
    // })
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;

    // mongoose
    Product.findById(prodId)
        .then(product => {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.description = updatedDesc;
            product.imageUrl = updatedImageUrl;
            return product.save();
        })
        .then(result => {
            console.log('更新产品成功');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));


    // // mongose
    // const product = new Product(
    //     updatedTitle,
    //     updatedImageUrl,
    //     updatedPrice,
    //     updatedDesc,
    //     prodId
    // );

    // product.save()
    //     .then(result => {
    //         console.log('更新产品成功');
    //         res.redirect('/admin/products');
    //     })
    //     .catch(err => console.log(err));



    // // sequelize 方法
    // Product.findByPk(prodId)
    //     .then(product => {
    //         product.title = updatedTitle;
    //         product.price = updatedPrice;
    //         product.imageUrl = updatedImageUrl;
    //         product.description = updatedDesc;
    //         return product.save(); // sequelize 提供的快速更新数据的方法
    //     })
    //     .then(result => {
    //         console.log('更新产品成功');
    //         res.redirect('/admin/products');
    //     })
    //     .catch(err => console.log(err));
    // // res.redirect('/admin/products'); 如果重定向放这里的话，由于promise.resolve().then()的异步，使得先重定向了，才进行数据更新



    // const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedPrice, updatedDesc);
    // updatedProduct.save();
    // res.redirect('/admin/products');
}

exports.getProducts = (req, res) => {
    // mongoose 方法
    Product.find()
        // .select('title price -description') // mongoose 提供的方法，只返回其中写明的字段内容，比如title，price， 前面加 - 号，是指不提取此字段的内容
        // .populate('userId', 'name -_id') // mongoose 提供的根据字段返回所有关联表中相关联的user信息, 第二个参数指明传递的字段，- 号表示不传递该字段
        .then(products => {
            console.log(products);
            res.render('admin/products', {
                pageTitle: '管理商品',
                products: products,
                path: '/admin/products'
            });

        })
        .catch(err => {
            console.log(err);
        })


    // // mongoDB 发方法
    // Product.fetchAll()
    //     .then(products => {
    //         res.render('admin/products', {
    //             pageTitle: '管理商品',
    //             products: products,
    //             path: '/admin/products'
    //         });

    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })




    // // sequelize
    // Product.findAll()
    //     .then(products => {
    //         res.render('admin/products', {
    //             pageTitle: '管理商品',
    //             products: products,
    //             path: '/admin/products'
    //         });

    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })



    // Product.fetchAll(products => {
    //     res.render('admin/products', {
    //         pageTitle: '管理商品',
    //         products: products,
    //         path: '/admin/products'
    //     });
    // });
}

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;

    // mongoose
    Product.findByIdAndRemove(productId)
        .then(result => {
            console.log('删除成功');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));

    // // mongodb
    // Product.deleteById(productId)
    //     .then(result => {
    //         console.log('删除成功');
    //         res.redirect('/admin/products');
    //     })
    //     .catch(err => console.log(err));



    // sequelize 方法
    // 1
    // Product.destroy({ where: productId });

    // // 2
    // Product.findByPk(productId)
    //     .then(product => {
    //         return product.destroy();
    //     })
    //     .then(result => {
    //         console.log('删除成功')
    //         res.redirect('/admin/products');
    //     })
    //     .catch(err => console.log(err));

    // Product.deleteById(productId);
    // res.redirect('/admin/products');
}