const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [{
            productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true }
        }]
    }
});

userSchema.methods.deleteItemFromCart = function(productId) {
    const updatedCartItems = this.cart.items.filter(item => {
        return item.productId.toString() !== productId.toString();
    });

    this.cart.items = updatedCartItems;
    return this.save();
}

userSchema.methods.addToCart = function(product) { // 这里不能使用箭头函数，来保证this是指向实例化出来的对象user

    const cartProductIndex = this.cart.items.findIndex(cp => {
        // return cp.productId === product._id; // 两个都是ObjectId 类型的实例，是对象，值相等，但是本身不相等，所以不能直接进行比较
        // 解决办法两种
        // 1. mongodb 提供的专门进行ObjectId类型比较的函数equal()
        // 2. toString
        return cp.productId.toString() === product._id.toString();
    });

    let newQuantity = 1;

    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
        updatedCartItems.push({
            productId: product._id, // 这里直接传id 值， mongoose会自动将其包裹为ObjectId对象
            quantity: newQuantity
        });
    }

    const updatedCart = { items: updatedCartItems };
    this.cart = updatedCart;

    return this.save();

}

userSchema.methods.clearCart = function() {
    this.cart = { items: [] };
    return this.save();
}


module.exports = mongoose.model('User', userSchema);



// const mongodb = require('mongodb');
// const getDb = require('../utils/database').getDb;

// const ObjectId = mongodb.ObjectId;

// class User {
//     constructor(username, email, cart, id) {
//         this.username = username;
//         this.email = email;
//         this.cart = cart; // {items: []}
//         this._id = id;
//     }

//     sav() {
//         const db = getDb();
//         return db.collection('users').insertOne(this);
//     }

//     // 购物车 和 用户 是1对1关系，在mongodb中可以使用内嵌的方法来设置购物车

//     addToCart(product) {

//         const cartProductIndex = this.cart.items.findIndex(cp => {
//             // return cp.productId === product._id; // 两个都是ObjectId 类型的实例，是对象，值相等，但是本身不相等，所以不能直接进行比较
//             // 解决办法两种
//             // 1. mongodb 提供的专门进行ObjectId类型比较的函数equal()
//             // 2. toString
//             return cp.productId.toString() === product._id.toString();
//         });


//         let newQuantity = 1;

//         // 方法2， 修改cart.item的方法
//         const updatedCartItems = [...this.cart.items];

//         if (cartProductIndex >= 0) {
//             newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//             updatedCartItems[cartProductIndex].quantity = newQuantity;
//         } else {
//             updatedCartItems.push({ productId: new ObjectId(product._id), quantity: newQuantity });
//         }

//         const updatedCart = { items: updatedCartItems };



//         // // 方法1，直接覆盖相同cart.item种类的方法
//         // if (cartProductIndex >= 0) {
//         //     newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//         // }
//         // // // 如果将product的信息全部传入，name在product发生变化时，修改量很大，所以不建议使用下面的方法
//         // // const updatedCart = { items: [{...product, quantity: 1 }] };

//         // // // 建议只传入product._id
//         // const updatedCart = { items: [{ productId: new ObjectId(product._id), quantity: newQuantity }] }

//         const db = getDb();
//         return db.collection('users').updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: updatedCart } }); // mongodb中操作update,updatOne,会直接覆盖掉原来的该字段数据
//     }

//     getCart() {
//         const db = getDb();
//         const productsIds = this.cart.items.map(i => {
//             return i.productId;
//         })


//         return db
//             .collection('products')
//             .find({ _id: { $in: productsIds } }) // mongodb 多条件查找的方法
//             .toArray()
//             .then(products => {
//                 return products.map(p => {
//                     return {
//                         ...p,
//                         quantity: this.cart.items.find(i => {
//                             return i.productId.toString() === p._id.toString();
//                         }).quantity
//                     }
//                 })
//             })
//             .catch(err => console.log(err));
//     }

//     deleteItemFromCart(productId) {
//         const updatedCartItems = this.cart.items.filter(item => {
//             return item.productId.toString() !== productId.toString();
//         })

//         const db = getDb();
//         return db.collection('users').updateOne({ _id: new ObjectId(this._id) }, { $set: { cart: { items: updatedCartItems } } })
//     }


//     // User 和 Order是一对多的关系，所以需要为order单独建立collection
//     addOrder() {
//         const db = getDb();

//         return this.getCart().then(products => {
//                 const order = {
//                     items: products, // 这里让products内嵌在了order内部，也就是说当前的订单获得了产品的相关信息，以后产品信息发生变化时，订单内的产品信息也不会发生变化，非常合理
//                     user: {
//                         _id: new ObjectId(this._id),
//                         name: this.name
//                     }
//                 }
//                 return db.collection('orders').insertOne(order)
//             })
//             .then(result => {
//                 this.cart = { items: [] };
//                 return db.collection('users').updateOne({ _id: new ObjectId(this._id) }, { $set: { cart: this.cart } });
//             });
//     }

//     getOrders() {
//         const db = getDb();
//         return db.collection('orders').find({ 'user._id': new ObjectId(this._id) }).toArray();
//     }



//     static findById(userId) {
//         const db = getDb();
//         return db.collection('users').find({ _id: new ObjectId(userId) }).next();
//         // return db.collection('user').findOne({_id: new ObjectId(userId)}); //如果确定只有一个user的情况可以这样使用findOne
//     }
// }


// module.exports = User;




// // const Sequelize = require('sequelize');
// // const sequelize = require('../utils/database');

// // const User = sequelize.define('user', {
// //     id: {
// //         type: Sequelize.INTEGER,
// //         autoIncrement: true,
// //         allowNull: false,
// //         primaryKey: true
// //     },
// //     name: {
// //         type: Sequelize.STRING,
// //         allowNull: false
// //     },
// //     email: {
// //         type: Sequelize.STRING,
// //         allowNull: false
// //     }
// // });

// // module.exports = User;