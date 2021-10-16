// 初始化 npm init -y

// 安装 node mon -> 帮助我们自动刷新 -> npm install --save-dev nodemon

// 安装 express -> npm install --save express -> 注意根文件夹不要命名为express, 会因为与express包重名而报错，导致不能安装

// express 中间件 : 请求 -》 中间件 -》 中间件 -》 响应

const http = require('http');

const path = require('path');


const express = require('express');
const bodyParser = require('body-parser');
// const db = require('./utils/database');
const sequelize = require('./utils/database');

// // 引入数据模型
// 引入 mongodb database 文件
// const mongoConnect = require('./utils/database').mongoConnect;


// 引入mongoose
const mongoose = require('mongoose');


const User = require('./models/user');



// // mysql 数据模型
// const User = require('./models/user');
// const Product = require('./models/product');
// const Cart = require('./models/cart');
// const CartItem = require('./models/cart-item');
// const Order = require('./models/order');
// const OrderItem = require('./models/order-item');





// // 使用pug是不需要引入的，因为在安装pug时， pug已经被安装了express的调用
// // 而express-handlebars在安装时是没有安装在express里面的，所以需要单独引入
// // handlebars模板中逻辑比pug少，更多的逻辑放到了js文件中
// const expressHbs = require('express-handlebars');



const addProduct = require('./routes/admin');
const shopRouter = require('./routes/shop');

const mainPath = require('./utils/mainPath');

const errorControllers = require('./controllers/error');
const { nextTick } = require('process');

const app = express(); // 初始化一个像目 app



// // 初始化handlebars引擎
// // 使用 app.engine(注册名， 实际使用的引擎) 来注册新的引擎
// // 注册名 关系到模板文件的后缀名，注册名为什么，模板文件后缀名就是什么
// // 参数是一个对象，layoutDir -> 指定了layout的文件夹， default -> 指定了默认使用的layout
// app.engine('hbs', expressHbs({ // 注意 expressHbs 要执行
//     layoutDir: 'views/layouts', // layout文件夹
//     defaultLayout: 'main-layout', // 默认layout 
//     extname: 'hbs' // handlebars 的layout 默认是不识别hbs后缀的，需在这里指定, 这里的hbs 能在layout上使用，但是不能定义到其他文件上
// }));

// 获取到了前端传来的数据，但是这个数据换一个用户也会获得，不能做到用户拥有个人数据
// console.log(adminData);

// 模板引擎 -> 用对应的内容替换掉模板中的占位符，生成HTML页面 -> 这些页面是在服务器中生成完成的
// 3个常用的模板引擎
// EJS -> <h1><%=title%></h1> 使用普通的HTML和JS
// PUG -> <h1> #{title} 简略版的HTML，定制的模板语言
// Handlebars -> <h1>{{ title }}</h1> 普通HTML，定制模板语言

// 安装 3 个引擎: npm install --save ejs pug express-handlebars

// 使用 EJS 模板引擎
// EJS 没有layout的概念，而是抽取公共部分到inclues文件节夹， 然后引入到需要的文件中
// 这种方式叫 partials 或者 includes

// ejs 的使用不需要其他安装或引入
app.set('view engine', 'ejs');
app.set('views', 'views');

// // 使用 handlebars 模板引擎
// app.set('view engine', 'hbs'); //定义使用的模板引擎
// app.set('views', 'views'); //定义模板文件所在的文件夹

// // 使用 pug 模板引擎
// app.set('view engine', 'pug'); //定义使用的模板引擎
// app.set('views', 'views'); //定义模板文件所在的文件夹




// 中间件 解析器 -> body-parser ->  npm install --save body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// 提供静态文件，用户可以访问，使用express.static(目录path), 目录下的文件都可以提供用户访问
// 需要public目录下的文件的地方，不需要在写/public/XXX, 而是直接写XXX, express会自动寻找到/public/XXX中
// 可以添加多个静态文件: css, js, images
// app.use(express.static(path.join(__dirname, 'another')));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(mainPath, 'public')));

app.use((req, res, next) => {

    // mongoose 使用数据库已有用户
    User.findById('60ec4616039c0f25dcac7d2d')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));

    // // mongodb 使用数据库已有的用户
    // User.findById('60ec4616039c0f25dcac7d2d')
    //     .then(user => {
    //         req.user = new User(user.name, user.email, user.cart, user._id); // 在一个中心的地方将user保存起来，方便在需要调用的地方进行调用
    //         next();
    //     })
    //     .catch(err => console.log(err));


    //     //     // // mysql 方法设置req的user属性
    //     //     User.findByPk(1)
    //     //         .then(user => {
    //     //             req.user = user; // 为req 添加user属性，在后面方便获取 
    //     //             // 注意，这里设置req.user 不要覆盖掉req 原有的属性名，
    //     //             // user 是 User.findByPk获取到的，是一个sequelize对象，可以使用sequelize的方法
    //     //             next(); // 继续执行后面的app.use()
    //     //         })
    //     //         .catch(err => console.log(err));
});

// 添加layout

// 动态添加className

app.use('/admin', addProduct.router); // '/admin' 过滤路由，只有/admin/...才能有效访问adminRouter
app.use(shopRouter);

app.use(errorControllers.get404);

// // 访问的都是同一个'/product', 但是由于获取方式的不同get, post, 所以两者不冲突
// app.post('/product', (req, res, next) => {
//     res.send('<h2>nina elle</h2>')
// });
// app.get('/product', (req, res, next) => {
//     res.send('<h2>wicky angle</h2>')
// });

// app.use('/', (requst, response, next) => {
//     console.log('这个中间件永远都会执行');
//     next(); // 执行next后，才会走到下一个中间件中
// });

// // // 处理访问路径错误的路由
// app.use((req, res, next) => {
//     res.status('404').send('<h1>页面走丢了</h1>');
//     // res.setHeader('..').send('...'); //send()跟在最后面
// })

// // app.use(path, callback, [callback]);
// // path: 路径 -> 也是路由，如果path为 /add-product, 则 /add-product及其下的路径都可以访问例如 /add-product/detail 也可以访问
// // 中间件的顺序也很关键
// app.use('/add-product', (req, res, next) => {
//     console.log('进入 /add-product');
//     res.send('<form action="/product" method="POST"><input type="text" name="title" /><button type=submit>提交数据</button></form>')
//         // res.send('<form action="/product" method="POST"><input type="text" name="title" /><button type=submit>提交数据</button></form>')
// })

// // // callback 中可以省略next, 但是不能省略 req 和 res
// // app.use('/product', (req, res) => {
// //     // res.statusCode('302');
// //     // res.setHeader('Location');
// //     console.log(req.body);
// //     res.redirect('/'); // express 提供的重定向函数
// // })

// // app.get 会过滤掉除了get外的其他请求
// // app.post 会过滤掉除了post外的其他请求
// // app.put 会过滤掉除了put外的其他请求
// // app.patch 会过滤掉除了patch外的其他请求
// // app.delete 会过滤掉除了delete外的其他请求
// app.post('/product', (req, res, next) => {
//     console.log(req.body);
//     res.redirect('/')
// })

// app.use('/index', (requst, response, next) => {
//     console.log('在另外一个中间件中');
//     // response.setHeader();
//     // response.write();
//     response.send('<h1>hello jayden james</h1>') // 新增方法，自动设置了header,并且不需要在一段一段的写.write
//         // 中间件要么执行完后进入到下一个中间件，要么就返回响应
// });

// const server = http.createServer(app);
// server.listen(3000);


// mongodb 的连接
// mongoConnect(() => {
//     app.listen(3000);
// });





// // Sequelize -> ORM(Object-Relational Mapping)框架
// // 核心概念 -> 模型 -> 实例化
// // 安装 npm install --save sequelize
// // sequelize 的使用必须依赖 mysql2, 所以在安装sequelize 之前 必须安装 mysql2


// // sequelize 定义表之间的关系
// // 用户对产品， 1 对 多
// Product.belongsTo(User, {
//     constraints: true, // 约束
//     onDelete: 'CASCADE' // 级联删除
// });

// User.hasMany(Product); // 要使用req.user.createProduct() 这个sequelize 自动生成的special method, 就必须写明 User.hansMany(Product)
// // 如果想使用 product.createUser(), 就必须写明Product.belongsTo(User)
// // 模型之间的关系自行确定，但是要调用特殊函数，那个调用那个在前，必须写明

// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, { through: CartItem });
// Product.belongsToMany(Cart, { through: CartItem });
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, { through: OrderItem });




// // sequelize.sync({ force: true }) // 让product数据表更新时，自动添加上关联字段，但是实际生产环境中是不用的
// sequelize
// // .sync({ force: true })
//     .sync()
//     .then(result => {
//         return User.findByPk(1);
//     }).then(user => {
//         if (!user) {
//             return User.create({
//                 name: 'jayden',
//                 email: 'jaydenjames@sexPorn.com'
//             });
//         }
//         return user; //事实上，这里返回一个普通值或者对象，会被自动包裹一个Promise，所以也可以不写明
//         // 这样 user 有 还是没有都能返回一个同一的数据类型 Promise类型
//         // return Promise.resolve(user); // user存在的话是一个对象，并不是Promise示例，所以使用 Promise.resolve()来进行包裹，让其成为一个Promise对象，传递个下一个then
//     })
//     .then(user => {
//         return user.createCart();
//     })
//     .then(cart => {
//         // console.log(user);
//         app.listen(3000);
//     })
//     .catch(err => {
//         console.log(err);
//     })



// MVC
// Models -> 数据，处理数据(保存，获取)
// Views -> 用户看到的内容，与应用代码解耦
// Controllers -> 连接 Models 和 Views -> 包含中间的逻辑

// 链接并使用mysql (mariaDB)
// 1. 安装 myslq2 -> npm install --save mysql2
// 2. 在utils 中 创建 database.js 文件, 并写入数据库相关代码


// MongoDB 的使用
//  MongoDB 有两种使用方式，一种是本地安装使用，另一种是云数据库

// MongoDB 中的三种概念
// database collections documents

//  云数据库默认是按最佳实践来配置
// user: laoyu 
// password: CHSDaua26uGX0nF7
// 设置 Network Access -> 防止未被授权用户访问云MongoDB数据库的一种机制 -> 注意，本地网络的IP会改变，如果发生改变将会连接不了云服务器，解决办法 1. 修改云服务器上面的ip 配置，其中可以设置为0.0.0.0，那么任何人都可以访问。 2. 建立本地服务器

// 链接云MongoDB
// mongodb+srv://laoyu:<password>@cluster0.o737f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority -> 替换掉password,和 myFirstDatabase

// 安装 MongoDB Driver -> npm install mongodb


// Mongoose
// MongoDB 的 ODM(Object Document Mapping) -> Mongoose
// Mongoose 安装 npm install mongoose
// Mongoose 不需要在设置数据库连接文件(./utils/database), mongoose会自动帮我们设置数据库连接

mongoose.connect('mongodb+srv://laoyu:CHSDaua26uGX0nF7@cluster0.o737f.mongodb.net/shop?retryWrites=true&w=majority', { userNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        return User.findOne();

    })
    .then(user => {
        if (!user) {
            const user = new User({
                name: 'jayden',
                email: 'jayden@pornsex.com',
                cart: {
                    items: []
                }
            });
            return user.save()
        }
    })
    .then(result => {
        app.listen(3000);
    })
    .catch(err => console.log(err));