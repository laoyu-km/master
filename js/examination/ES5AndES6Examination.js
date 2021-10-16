// // No.1
// // if (a === 1 && a === 2 && a === 3) {
// //   console.log('you win');
// // }

// var a = {
//     i: 1,
//     toString: function() {
//         return parseInt(a.i++);
//     }
// }


// if (a === 1 && a === 2 && a === 3) {
//     console.log('you win');
// } else {
//     console.log('false');
// }

// // // 正确答案
// // var _a = 0;
// // Object.defineProperty(window, 'a', {
// //     get() {
// //         return ++_a;
// //     }
// // });

// // if (a === 1 && a === 2 && a === 3) {
// //     console.log('you win');
// // }

// No.2
// if (a == 1 && a == 2 && a == 3) {
//     if (a.a === 1 && a.a === 2 && a.a === 3) {
//         console.log('You win!!!!');
//     }
// }

// // 自解
// var a = {
//     b: 1,
//     get a() {
//         return this.b++;
//     },
//     i: 1,
//     toString: function() {
//         return this.i++;
//     }
// }

// if (a == 1 && a == 2 && a == 3) {
//     if (a.a === 1 && a.a === 2 && a.a === 3) {
//         console.log('You win!!!!');
//     }
// }

// // 正确答案
// var a = {
//     a0: 0,
//     a1: 0,
//     toString() {
//         return ++this.a0;
//     }
// }

// Object.defineProperty(a, 'a', {
//     get() {
//         return ++a.a1;
//     }
// })

// // No.3 重写 for each
// // 自写
// Array.prototype.myForEach = function(callback) {
//     var arr = this,
//         arrLen = arr.length,
//         arg2 = arguments[1] || window,
//         item;

//     for (let i = 0; i < arrLen; i++) {
//         item = arr[i]
//         callback.apply(arg2, [item, i, arr]);
//     }
// }

// var arr = ['st', 'jl', 'gxt', 'hcy'];

// arr.myForEach(function(value, key) {
//     console.log(key + ' => ' + value)
// })

// // 标准答案
// Array.prototype.myForEach = function(cb) {
//     var _arr = this; // 为什么要用this, 因为this指向的是myForEach外部的arr,所以用一个变量来保存，让其保存在函数内部，方便调用
//     var _len = _arr.length;
//     var _arg2 = arguments[1] || window;

//     for (var i = 0; i < _len; i++) {
//         cb.apply(_arg2, [_arr[i], i, _arr]);
//     }
// }


// No.4 严格模式下的作用

// 在 js 中 任何变量都不会没有值，如果没有赋值则为undefined -> 例如 
// var a 
// obj.a
// 专业表述一定要到位

// 严格模式总结，交笔记


// ======================================

// ES6

// No.1 weakmap的特征
// weakmap 存在是基于map的
// weakmap,键名必须是对象，null除外，
// 弱类型，不计入垃圾回收机制,
// var listener = new WeakMap()
// listener.set(dom, test)
// listener.dom.addEventListener('click', listener.test, false);
// delete dom
// dom 引用全部会被回收

// No.2
// var const let 的区别

// var a = 1 和 window.a = 1 是同一个东西吗？
// 不是同一个东西，是映射关系

// //No.3
// const test1 = () => {
//     console.log(this);
// }

// test1();

// // NO.4
// const test2 = () => {
//     const t = () => {
//         console.log(this);
//     }
//     t();
// }

// test2();
// new test2(); // TypeError

// JS的this指向是所有语言里面最复杂的
// 箭头函数是为了解决this指向在局部作用域中不稳定的现象
// 在对象，函数，模块化中，箭头函数this直接指向了父级作用域，让作用域稳定

// // No.5 this指向什么
// const test2 = () => {
//     test2.t = () => {
//         console.log(this);
//     }
//     test2.t();
// }

// test2(); //window

// No.6 指向什么
// const test = function() {
//     test2.t = () => {
//         console.log(this);
//     }
//     test2.t();
// }

// new test2(); // test{};

// // No.7
// const test = (...args) => {
//     console.log(args);
//     console.log(arguments);
// }
// test(1, 2, 3); // 1，2，3 referenceError

// // No.8 将下面构造函数改写为class
// ;
// (function() {
//     var c = 1;

//     function Test() {
//         console.log(c);
//     }

//     Test.prototype.a = function() {
//         Test.b();
//     }

//     Test.b = function() {
//         console.log('I am a static function of Test constructor');
//     }

//     window.Test = Test;
// })();

// // var test = new Test();

// // test.a();

// // 改造结果
// const Test = (() => {
//     var c = 1;
//     class Test {
//         constructor() {
//             console.log(c);
//         }
//         a() {
//             this.b();
//         }
//         static b = function() {
//             console.log('I am a static function of Test constructor')
//         }
//     }
// })();

// No.9
// promise 的reject 和 catch 方法的说明
// 如果断网直接只走catch,不走then

// // No.10
// // Set 函数不允许有重复值
// let s = new Set();
// s.add([1]);
// s.add([1]);
// s.add(1);
// s.add(1);
// console.log(s.size); // 3


// No.11
// for...of, for...in, for...each 的区别
// 循环，遍历，迭代
// 循环：是一种工具
// 迭代：让遍历变得可控，遍历是由多次迭代形成的程序机制。 是否遍历是由迭代器来决定的

// for...each: 是典型的遍历过程，
// for...of: 必须调用Symbol.iterator, 执行next方法， 每调用过一次就是一次迭代， 全部迭代形成一次遍历 主要拿 values
// for...in: 遍历对象，主要拿key

// // No.12 //打印的是什么
// const promise = new Promise((resolve, reject) => {
//     console.log(1);
//     resolve();
//     console.log(2);
// })

// promise.then(() => {
//     console.log(3);
// })

// console.log(4);
// // 结果1,2,4,3


// // // 异步举例
// // var data = $.ajax({
// //     url: …..,
// //     async: false // 让ajax同步执行，ajax默认异步执行
// // })

// // formatData(data);

// // console.log(1);

// // function formatData() {……..
// // }

// var p = new Promise((resolve) => {
//    $.ajax({
//    url: …..,
//    success (data) {
//       resolve(data);
//    }
// })

// p.then(res => {
//     formatData(res)
// })

// console.log(1)

// // No. 13
// // 链式操作可以解决回调地狱
// // 解决回调地狱的最好方法
// var a = test1()
// var b = test2(a);
// var c = test3(b);

// // No.14
// const obj = {
//     a: {
//         b: 1,
//         c: 2,
//         d: {
//             e: 1,
//             f: 2,
//             g: [1, 2, 3, 4]
//         }
//     }
// };
// //一条解构与一个条打印语句 打印出12121234
// var { a: { b, c, d: { e, f, g: [aa, bb, cc, dd] } } } = obj
// console.log(b, c, e, f, aa, bb, cc, dd);

// No.15
// // Object.keys和Object.getOwnPropertyNames 的区别
// Object.keys ES5的方法， 表层的， 主要用于业务层, enumreable 为false 不可以遍历
// Object.getOwnPropertyNames ES5的方法, 底层的， 主要用于底层框架, enumreable 为false 也可以遍历


// // No.16
// const arr = [1, , , 2, , , 3, 4, , 5, , , , 6, 7, 8, , , , , 9];
// arr.find(item => { // find -> 在数组中找元素
//     console.log(item);
// }); // find能访问empty项，由于是empty项，所以返回的是undefined

// arr.forEach(item => {
//     console.log(item);
// }); // forEach 不访问empty项
// // 功能上说forEach 不需要访问empty项，find由于寻找每一项或指定项，必然需要访问到empty项

// // No.17
// console.log(Array.from.length); //1
// Array.from(obj, callback, thisArg)

// No.18
// const newArr = Array.from({
//     0: 1,
//     1: 2,
//     2: 3,
//     3: 4,
//     4: 5,
//     5: 6,
//     length: 6
// }, function(item, index) {
//     console.log(this);
//     if (index % 2 === 0) {
//         return item + this.plusNum;
//     }

//     return item;
// }, {
//     plusNum: 100
// });