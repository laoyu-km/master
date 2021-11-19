// JavaScript 模块化

// 模块化前的2个阶段
// 1.
// IE6之前 没有JS引擎，js是作用于在渲染引擎、
// 脚本的写法主要是写在html中的JavaScript标签中

// 2. 
// 一个HTML页面引入一个.js文件
// 做到了渲染与逻辑分离
// 问题1.：出现了多页面公用的东西怎么办 -> common.js
// 问题2.：如果页面只引用了common.js 的某个程序，那么就会引入其他多余的东西怎么办

// 为了修改上面的问题，修改按页面引入模块的办法，变成按照功能来设置模块

// 因起 一个HTML页面加载多个js文件，-> 引出新的问题文件加载顺序
// 一个HTML页面引入的多个文件都是在同一个作用域下（全局作用域）-> 引出全局变量污染的问题

// ===================================

// // js 模块化主要解决2个问题
// // 1. 加载顺序
// // 2. 全局变量污染

// // ES5 中解决变量污染的办法 -> 利用闭包立即执行函数
// // 模块A -》 a.js
// var moduleA = (function() {
//     // 函数有自己的作用域和执行期上下文
//     // 模块自己的作用域
//     var a = [1, 2, 3, 5, 6, 8].reverse();

//     // 任何一个模块几乎都是用对象的形式返回数据
//     // 形成闭包
//     return {
//         a: a
//     }
// })();

// // 模块B -》 b.js
// // 模块A 注入模块B, 模块的注入增加了模块的依赖性, 
// // 模块 注入将全局变量引入到局部变量
// var moduleB = (function(moduleA) { // 模块注入
//     var b = moduleA.a.concat([11, 22, 33]);

//     return {
//         b: b
//     }
// })(moduleA);

// // 模块c -》 c.js
// // 模块B注入模块C
// var moduleC = (function(moduleB) {
//     var c = moduleB.b.join('-');
//     return {
//         c: c
//     }
// })(moduleB);

// // index中引入,让index.html加载时被执行
// ;
// (function(moduleA, moduleB, moduleC) {
//     console.log(moduleA.a);
//     console.log(moduleB.b);
//     console.log(moduleC.c);
// })(moduleA, moduleB, moduleC);

// // 总结 ES5 的闭包立即执行函数的形式可以解决全局变量污染的问题，但是不能解决模块文件加载顺序的问题 -> 怎么办？

// ===================================

// 成熟的模块化的方式
// NodeJS 的诞生带来了全新的模块化的体验 -> CommonJS -> 
// require('模块名');
// 示例：./moduleStu/*

// CommonJS的特点
// 1. 是一种规范， 用的方式是同步
// 2. CommonJS 实际就是使用require -> 只要引用，就会创建一个模块化实例
// 3. 缓存机制 -> 连模块都直接缓存掉，也就是只要require一次就可以，除非有更改
// 4. 一定是在Node上运行, 所以服务端用的较多，前端用的较少
// 5. nodeJS 的框架 koa, express 
// 6. require 不是全局变量， require引入进来的以后实际是执行了一个立即执行函数 (function (exports, require, module, __filename, __dirname))();

// ===================================

// 客户端的CommonJS - AMD -> Asynchronous Module Definition -> 异步模块定义
// define(moduleName, [module], factory); 定义模块
// require([module], callback); 引入模块
// 浏览器上实现AMD -> requireJS -> 引入 require.js 文件

// requireJS -> 是异步加载的 -> 专业术语 前置依赖 -> 他是在页面加载完成后才执行，所以不存在加载顺序的问题

// 前置依赖： 一个模块的执行必须依赖于他前面模块的加载完成


// ===================================

// CMD -> Common Module Definition -> 通用模块定义 -> 阿里做出的贡献
// define(function (require, exports, module) {}); 定义模块
// seajs.use([module路径]， function（moduleA, moduleB, moduleC){}) 使用模块

// 伴随的框架 seajs

// CMD 
// 靠 require 加载， define 来定义
// exports 导出
// 使用模块时需要配置模块URL
// 依赖加载完毕后才执行factory



// CMD 依赖就近 按需加载, 需要的时候在去加载模块
// AMD 前置依赖 : 先导入，加载模块，然后执行回调函数
// CMD 比 AMD 更加灵活

// 模块化必然要用专门针对该模块化方式的框架，原生的js是做不到优秀模块化的, 也就是解决加载顺序的问题

// ===================================

// ES6模块化
// Asynchronous Module Definition 异步模块定义
// import module from '模块路径'; 导入模块
// export module;  导出模块

// ===================================

// commonjs 和 ES6 模块化的区别  重点
// 示例'commonvses6/*
// 结果
// export -> 1
// common -> 0
// es6    -> 1


// 1. commonJS 模块输出的是一个值得拷贝， 
//  而 ES6输出的是值的引用

// 2. commonjs 模块是在运行时加载， 
// 而 ES6模块是在编译时加载

// 作业 什么事YUI

// ===================================

// // 插件
// // 开发者通过一遍又一遍的实验来定义的 一个程序集合， 功能类似模块
// // 例如： 给用户提供一个轮播图并提供一个配置项，让他可以通过不同的配置实现不同功能
// // 引出插件， 插件是纯民间的开发者总结的东西，没有任何官方的说明

// // 示例 计算器
// ;
// (function(doc) {
//     var Calculator = function() {
//         this.oCalculator = doc.getElementsByClassName('j_calcultor');
//     }

//     Calculator.prototype.init = fucntion() {
//         this.bindEvent();
//     }

//     Calculator.prototype.bindEvent = fucntion() {
//         this.oCaculator.addEventListener('click', this.onBtnClick);
//     }

//     Calculator.prototype.onBenClick = function(ev) {
//         var e = ev || window.event,
//             tar = e.target || e.srcElement,
//             tagName = tar.tagname.toLowerCase();
//     }
// })(document);