// mongodb 的链接数据库方法
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    mongoClient.connect('mongodb+srv://laoyu:CHSDaua26uGX0nF7@cluster0.o737f.mongodb.net/shop?retryWrites=true&w=majority', { userNewUrlParser: true, useUnifiedTopology: true }) // 老师讲课是用的mongodb 版本是支持userNewUrlParser, 但是听课时使用的最新版本已经不支持了 { userNewUrlParser: true, useUnifiedTopology: true }
        // 在传入连接函数的地址中，数据库shop是没有提前设置好的，但是monggodb 会根据提交的内容，自动生成这个数据库，这提现了MongoDB这种非关系型数据库的灵活性
        .then(client => { // 链接数据库成功后返回的是一个mongodb 客户端对象，提供数据库的访问
            console.log('链接数据库成功');
            _db = client.db(); // client.db提供数据库的访问
            callback();


            // callback(client);
            // callback 直接使用client存在几个问题
            // 1. 连接建立之后没法断掉这个连接
            // 2. 每次操作都要去建立和mongodb的连接
            // 我们需要有一个连接到数据库，返回相对应的权限，在整个项目中，我们在不同的地方，调用这个连接就可以
        })
        .catch(err => {
            console.log(err)
            throw err;
        });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw '没有发现数据库';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;





// // sequelize 的链接数据库方法
// const { Sequelize } = require('sequelize');
// // 引入 Sequelize 的时候使用大括号引入，这样的话vscode可以对sequelize定义的模型和模型方法进行提示

// // Sequelize (数据库名称， 用户名， 用户密码， 配置项 -> dialect(数据库类型) host:主机地址)
// const sequelize = new Sequelize('node_express_study', 'root', 'root', {
//     dialect: 'mysql',
//     host: 'localhost'
// });
// // sequelize 其实也是一个连接池
// module.exports = sequelize;




// // mysql2 的链接数据库方法 
// const mysql = require('mysql2');
// // mysql.createConnection -> 每一次链接都需要关闭，链接太多的话非常消耗性能
// // 更好的方式是创建链接池
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node_express_study',
//     password: 'root'
// });
// module.exports = pool.promise();