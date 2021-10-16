const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// mongodb 是schemaless的，但是这里又定义了schema,是因为mongoosed提供了这样的选择, 让你更多的注意到数据上面
const productSchema = new Schema({
    // title: String // 默认是schemaless的
    title: {
        type: String,
        required: true // 加了required： true 以后title就成为了必选字段
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});


// mongoose生成模型的方式 mongoose.model(模型名， 模型对应的Schema)
module.exports = mongoose.model('Product', productSchema);




// // mongodb 方式制作模型
// const mongodb = require('mongodb');
// const getDb = require('../utils/database').getDb

// class Product {
//     constructor(title, imageUrl, price, description, id, userId) {
//         this.title = title;
//         this.imageUrl = imageUrl;
//         this.price = price;
//         this.description = description;
//         this._id = id ? new mongodb.ObjectId(id) : null;
//         this.userId = userId;
//     }

//     save() {
//         const db = getDb();
//         let dpOp;
//         if (this._id) {
//             // 更新产品
//             // mongodb 在更新时， 使用的是{$set: {}} -> {} 中是一个对象, $set 是一个特殊的属性
//             dpOp = db.collection('products').updateOne({ _id: this._id }, { $set: this });
//         } else {
//             dpOp = db.collection('products')
//                 .insertOne(this) // mongodb 存储的是json(BSON)格式文件, mongodb 会将js对象自动转换为JSON格式文件，所以我们直接传js对象
//         }
//         // insertOne() insertMany
//         return dpOp.then(result => {
//                 // console.log(result);
//             })
//             .catch(err => console.log(err));
//     }

//     static fetchAll() {
//         const db = getDb();
//         // db.collection.find(方法返回一个游标。 要访问文档，您需要迭代游标。 但是，在mongo shell中，如果未使用var关键字将返回的游标分配给变量，则该游标将自动迭代多达20次，以打印结果中的前20个文档。)
//         // 可以使用 toArray() 方法来迭代游标并以数组形式返回文档, 该方法将游标返回的所有文档加载到RAM中； toArray() 方法耗尽游标。
//         return db.collection('products').find().toArray()
//             .then(products => {
//                 return products;
//             })
//             .catch(err => console.log(err));
//     }

//     static findById(prodId) {
//         const db = getDb();
//         // 数据库中的 _id 是一个object类型，而我们获取到的prodId,是从monggodb数据库获取到的，已经被处理为字符串的一串编码，所以要通过id进行查找，必须使用new monggodb.ObjectId()的实例，将prodId转换为object类型
//         return db.collection('products').find({ _id: new mongodb.ObjectId(prodId) }).next()
//             .then(product => {
//                 // console.log(product);
//                 return product;
//             })
//             .catch(err => console.log(err));
//     }

//     static deleteById(prodId) {
//         const db = getDb();
//         return db.collection('products').deleteOne({ _id: new mongodb.ObjectId(prodId) })
//             .then(result => {
//                 // console.log(result); //result 是删除指定产品后剩余的数据库产品
//             })
//             .catch(err => console.log(err));
//     }
// }


// // // sequelize 的方式制作模型
// // const Sequelize = require('sequelize');
// // const sequelize = require('../utils/database');

// // const Product = sequelize.define('product', {
// //     id: {
// //         type: Sequelize.INTEGER,
// //         autoIncrement: true,
// //         allowNull: false,
// //         primaryKey: true
// //     },
// //     title: Sequelize.STRING,
// //     price: {
// //         type: Sequelize.DECIMAL,
// //         allowNull: false
// //     },
// //     imageUrl: {
// //         type: Sequelize.STRING,
// //         allowNull: false
// //     },
// //     description: {
// //         type: Sequelize.STRING,
// //         allowNull: false
// //     }
// // });

// module.exports = Product;









// // // const fs = require('fs');
// // // const path = require('path');

// // const db = require('../utils/database');
// // const Cart = require('./cart');
// // // const rootDir = require('../utils/mainPath');
// // // const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

// // // .json文件 初始化时至少需要一个[], 如果全为空会报错

// // // const getProductsFromFile = (cb) => {
// // //     fs.readFile(p, (err, fileContent) => {
// // //         if (err) {
// // //             return cb([]);
// // //         }
// // //         cb(JSON.parse(fileContent));
// // //     })
// // // }

// // module.exports = class Product {
// //     constructor(id, title, imageUrl, price, description) {
// //         this.id = id;
// //         this.title = title;
// //         this.imageUrl = imageUrl;
// //         this.price = price;
// //         this.description = description;
// //     }

// //     save() {
// //         // 这种传参方式是 mysql2 提供的用于防止注入的一种方法
// //         return db.execute('INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)', [this.title, this.price, this.imageUrl, this.description]);
// //     }

// //     static deleteById(id) {

// //     }

// //     static fetchAll() {
// //         return db.execute('select * from products');
// //     }

// //     static findById(id) {
// //         return db.execute('SELECT * FROM products WHERE id = ?', [id]);
// //     }

// //     // // 文件方式存储数据
// //     // save() {
// //     //     getProductsFromFile((products) => {
// //     //         if (this.id) {
// //     //             const existingProductIndex = products.findIndex(prod => prod.id === this.id);
// //     //             const updatedProducts = [...products];
// //     //             updatedProducts[existingProductIndex] = this;
// //     //             fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
// //     //                 console.log(err);
// //     //             });
// //     //         } else {
// //     //             this.id = Math.round(Math.random() * 100).toString();
// //     //             products.push(this);
// //     //             fs.writeFile(p, JSON.stringify(products), (err) => {
// //     //                 console.log(err);
// //     //             });
// //     //         }
// //     //     });
// //     // }

// //     // static deleteById(id) {
// //     //     getProductsFromFile(products => {
// //     //         const product = products.find(prod => prod.id === id);
// //     //         const updatedProducts = products.filter(p => p.id !== id);
// //     //         fs.writeFile(p, JSON.stringify(updatedProducts), err => {
// //     //             if (!err) {
// //     //                 Cart.deleteById(id, product.price);
// //     //             }
// //     //         })
// //     //     })
// //     // }

// //     // static fetchAll(cb) {
// //     //     getProductsFromFile(cb);
// //     // }

// //     // static findById(id, cb) {
// //     //     getProductsFromFile(products => {
// //     //         const product = products.find(p => p.id === id);
// //     //         cb(product);
// //     //     })
// //     // }

// // }