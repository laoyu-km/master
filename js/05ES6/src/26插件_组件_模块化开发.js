// 插件    组件   模块化开发

// // 插件 -> 基于特定的功能
// ; (function() {
//     class Slider {

//     }

//     window.Slider = Slider;
// })();


// 组件 -> 基于特定功能的UI


// 模块化 -> 使用立即执行函数进行模块化包装

// 为什么要使用立即执行函数而不使用构造函数
// 1. 构造函数可以用来模块化，但是很不采用
// 2. 构造函数其实是抽象化一个类，构造函数中封装的是与类相关的属性和方法
// 3. 而模块化中的方法不一定有相关类
// 4. 立即执行函数执行以后，立即执行函数销毁，只有返回值，但是返回值所关联的立即执行函数中的变量，会存在在单独的作用域当中，只有返回值可以调用，做到了变量的私有化

// // 模块注入 -》 将公有属性私有化
// var module = (function(module, doc, win, $) { // 传入的实参值，成为立即执行函数中的私有变量的值
//     var obj = {
//         m1: m1,
//         m2: m2
//     }

//     return {
//         obj: obj
//     }
// })(module1, document, window, Jquery); // 模块注入 -> 实现模块依赖 -> 这里指立即执行函数依赖所传入的模块

//模块依赖存在的问题
// 1. 依赖过于复杂， a -> b,c; b -> d,c; d -> e,f
// 2. 多层模块化，如果一层模块化不够，外部又加一层，就形成了套娃

// 如何解决模块依赖存在的问题
// namespace -> typescript 中会用的到
// namespace: 命名空间 -> 是一个对象

// // 手写namespace 必须会写
// // 定义namespace
// var namespace = (function() {
//     var cache = {}; // 将cache 私有化

//     return function createModule(moduleName, moduleDeps, moduleDefine) {
//         // 拿到moduleDeps返回值 方式2
//         if (arguments.length === 1) {
//             return cache[moduleName];
//         }

//         deps = moduleDeps.map(function(depsName) { //map()是什么对象的函数?
//             // [].map(item => console.log(1)); // 空数组map不执行
//             return namespace(depsName);
//         })

//         // // 拿到moduleDeps返回值 方式1
//         // deps = moduleDeps.map(function(depsName) {
//         //     return cache[depsName];
//         // })

//         // 没有依赖时
//         cache[moduleName] = moduleDefine.apply(null, deps);
//         return cache[moduleName];
//     }
// })();

// // namespace 的使用
// let module1 = namespace('math', [], function() {
//     //       模块名  模块依赖   模块实现方式    

//     function add(a, b) { return a + b }

//     function sub(a, b) { return a - b }

//     return {
//         add,
//         sub
//     }
// })

// let module2 = namespace('calculator', ['math'], function(m) {
//     var action = 'add';

//     function compute(a, b) {
//         return m[action](a, b);
//     }

//     return {
//         compute
//     }
// });

// console.log(module1, module2);
// console.log(module1.add(1, 2));
// console.log(module2.compute(3, 3));

// 手写的namespace存在的缺陷是依赖单一，解决不了复杂依赖
// 所以引申出了真正的前端模块化

// commonjs - > 同步加载模块 - > nodejs -> 主要用于后端
// AMD - > 异步加载模块 -> 前端模块化规范 -> 用require.js来实现 -> 上面手写的namespace 方法类似于AMD
// CMD -> 用的是sea.js来实现
// AMD 和 CMD 已经是淘汰的写法，现在用ES6 的 模块化， 也是异步的


// // commonjs 中容易问到的问题
// // 在这里 exports.c 是 module.exports的一个引用，可以这样写
// module.exports = {
//     a: function() {},
//     b: function() {}
// }

// exports.c = function() {}

// // 但是如果写成exports = function c (){}就让exports === {}， 引用就不成立了

// // commonjs 的模块化方式
// var a = 1;
// let b = 'jayden';

// function test() {}
// class Fun {}

// // // 导出
// // 方式1
// module.exports = { // index.js文件下
//     a: a,
//     b: b,
//     test: test,
//     Fun: Fun
// }

// // // 方式2
// // exports.a = a;
// // exports.b = b;
// // exports.test = test;
// // exports.Fun = Fun;

// // 引入
// let imports = require('./index');


// ==============================

// // ES6 的模块化方式
// // 方式1
// var a = 1,
//     b = 'jayden';
// export { a, b }; // index文件下

// import { a, b } from './index'
// console.log(a, b)

// // 方式2
// var a = 1;
// let b = 'jayden';
// function test() {}
// class Fun {}
// export default { a, b, test, Fun }; // index文件下

// import index from './index'
// console.log(index.a, index.b);

// // 方式3
// export var a = 1; // index 文件下
// export let b = 'jayden'; // index 下
// export function test() {};
// export class Fun {};

// import * as index from './index';
// console.log(index.a, index.b, index.test, index.Fun);


// ==============================

// 后端模块化为什么要同步？ 因为后端代码在服务端运行， 也就是在本地运行， 所操作的文件都是本地的， 所以使用同步加载模块， 速度快

// 前端可以用同步的方式加载模块吗(有依赖)？ -> 不行
// 1. 页面加载需要第三方资源，
// 2. js 单线程，如果同步的话存在等待资源加载的造成阻塞的问题