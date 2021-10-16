// CPU密集型场景：压缩，解压，加密，解密，图形计算
// I/O密集型场景：文件操作，http的网络操作，数据库操作等
// I/O密集型除了请求处理外，文件传输过程，我们认为是不占用node资源的（或者说是不占用CPU资源的)

// mvc -> model, view, controller 都是在后端进行分层 -> ASP, JSP, PHP

// AJAX 出现后 ->  前端和后端分的更明确，前端工程师正式登场


// 新前后端分层 -> 前端   :    后端(web层, 服务层, DAO)
// 1. web层：controller, 权限校验，封装，用户提示
// 2. 服务层：server层, 业务逻辑层 LoginService
// 3. DAO (data access object) 数据操作
// 4. 持久层：数据库 -> 关系型： mySql, Oracle, DB2
//                  -> 非关系学：MongoDB, redis, HBase

// 新的后端分层将后端的职级分为了几个模块（web层， 服务层， DAO）
// nodeJS中使用CommonJS来进行模块分层和管理

// ===========================

// // CommonJS 模块化规范
// 1. 一个文件是一个模块， 拥有单独的作用域
// 2. 普通方式定义的变量， 函数， 对象， 都属于模块内部
// 3. require(); - > 引入模块
// 4. exports, module.exports - > 导出模块

// ===========================

// // nodeJS 全局对象 -> global
// // 查看global 
// console.log(global);
// // 使用global
// console.log(global.Buffer);

// // nodeJS 全局对象
// // 普通方式定义全局对象不可行
// var a = 100;
// console.log(global.a) // undefined -> nodeJS中 -> 一个文件就是一个模块 -> 拥有单独作用域

// // 正确定义全局对象
// global.a = 'jayden';
// console.log(global.a)

// nodeJS -> 一个文件就是一个模块 -> 拥有单独作用域 -> 深入
// console.log(arguments);
// // 分别打印5个参数
// console.log(arguments);
// exports.a = 100;
// console.log(exports);
// console.log(require);
// console.log(module);
// console.log(__filename);
// console.log(__dirname);

// // node 的页面立即执行函数 -> 使达成一个页面一个模块效果 -> 示例
// (function (exports, require, module, __filename, __dirname) {
//     var a = 100;
//     console.log(global.a);
// })();

// ===========================

// REPL 解释器 (read Eval Print Loop) -> 交互式解释器 -> node 命令行执行 (linux 命令行的执行)

// ===========================

// 模块的加载方式

// 核心模块 -> nodeJS 定义好的模块 -> 在内存中加载最快
// 引入
// require('fs')

// 文件模块 -> 
// 引入
// 相对目录
// require('./index.js');
// 绝对目录
// require('D:/code/javascript/js/node/index.js');

// 后缀名
// 默认寻找 .js -> 没有找 .json -> 没有找 .node -> 没有 报错

// require('./index.js') 执行两次 但是只打印一次 为什么
// 引用同一文件一次后就将引用内容放入缓存，再次引用无效

// // 接受引入模块的module.exports
// // 方法1
// let { test, a } = require('./index'); //解构赋值
// console.log(test(), a);

// // 方法2
// let indexObj = require('./index.js');
// console.log(indexObj);

// // index.js 的内容
// var a = 100;
// function test() {
//     console.log(a);
// }
// module.exports = {
//     a: a,
//     test: test
// }

//======================

// 循环依赖 
// 其他语言会报错，但是nodeJS不会报错 -> 只输出已经加载的部分，未加载部分不输出
// 不要使用循环依赖


//======================

// 引入和使用chalk -> chalk 让那个文字有style
// 引入： npm i chalk D

// 为什么chalk是以核心模块的方式引入的？
// 因为在chalk安装时也同时在node里面进行了注册

/**
 * chalk 引入的步骤
 * 找chalk的入口文件
 * 1.  node_module -> chalk -> package.json -> "main" : "入口文件地址"
 * 2. 如果没有 -> chalk下面的index.js, index.json, index.node
 * 3. 如果还没有 -> node_module 中找
 * 4. 还没有的话 -> node 安装目录 -> node_module
 * 5. 还没有报错
 */

// 为什么安装chalk是还同时安装了其他的包
// 因为依赖 dependencies
// 我们使用的node版本-> 新版本 -> 依赖和为我们需要的包都安装在chalk包的同级(node_modules)文件夹下
// 老版本的依赖是安装在chalk包当中的
// const chalk = require('chalk');

// console.log(chalk.red('hello jayden'));

//======================

// // module 解读
// module.exports.a = 100;
// var indexModule = require('./index.js');
// console.log(module); {
/* <ref *1> Module {
  id: '.',    // 标识符
  path: 'D:\\code\\javascript\\js\\node', 
  exports: {a:100},
  parent: null,
  filename: 'D:\\code\\javascript\\js\\node\\demo.js',
  loaded: false, //自身加载情况 false
  children: [
    Module {
      id: 'D:\\code\\javascript\\js\\node\\index.js',
      path: 'D:\\code\\javascript\\js\\node',
      exports: [Object],
      parent: [Circular *1],
      filename: 'D:\\code\\javascript\\js\\node\\index.js',
      loaded: true, //引入模块的加载情况
      children: [],
      paths: [Array]
    }
  ],
  paths: [
    'D:\\code\\javascript\\js\\node\\node_modules',
    'D:\\code\\javascript\\js\\node_modules',
    'D:\\code\\javascript\\node_modules',
    'D:\\code\\node_modules',
    'D:\\node_modules'
  ]
} */

//======================

// 文件导出的另外两种方法

// // global方法
// global.a = 200; // 可行，但是尽量不要用，会造成变量污染

// // exports 方法
// exports.a = 200 // 可以
// exports = { a: 200 } // 不可以
// // 因为 引用值不可改
// (function(exports, require, module, __filename, dirname){
//     exports = module.exports
// })

//========================
// node解析编译
// .node(使用的是c++写的类库libuv 中的dlopen()方法来解析), 
// .json, 
// .js文件
// 解析后存放到一个隐式属性 Module._cache()中 -> 所以多次加载同一文件也只会出现一个，因为被缓存了