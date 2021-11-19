// // iterator 和 genorator

// // iterator
// // 迭代器的实现方式
// function makeIterator(arr) {
//     var nextIndex = 0;
//     return {
//         next() {
//             if (nextIndex < arr.length) {
//                 return {
//                     value: arr[nextIndex++],
//                     done: false
//                 }
//             }
//             return {
//                 value: undefined,
//                 done: true
//             }
//         }
//     }
// }

// // 处理稀疏数组
// var it = makeIterator([, , 'a', , , 'b']);
// console.log(it.next()); //{value: undefined, done: false}
// console.log(it.next()); //{value: undefined, done: false}
// console.log(it.next()); //{value: "a", done: false}
// console.log(it.next()); //{value: undefined, done: false}
// console.log(it.next()); //{value: undefined, done: false}
// console.log(it.next()); //{value: "b", done: false}
// console.log(it.next()); //{value: undefined, done: true}
// console.log(it.next()); //{value: undefined, done: true}

// 迭代器模式 -> 一种结构化模式 -> 从源以一次一个的方式抽取
// 迭代器是一种有序的，连续的，基于抽取的组织方式

// 在前端中不区分内部迭代器，和 外部迭代器
// 在类c语言中区分内部迭代器和外部迭代器

// // 内部迭代器 : 使用系统内部定义好的，一次性抽取所有元素的迭代器
// let arr = ['a', 'b', 'c'];
// for (let i of arr);

// // 外部迭代器: 自己部署的(手写的)，一次抽取(迭代)一个元素的的迭代器
// function makeIterator(arr) {
//     var nextIndex = 0;
//     return {
//         next() {
//             if (nextIndex < arr.length) {
//                 return {
//                     value: arr[nextIndex++],
//                     done: false
//                 }
//             }
//             return {
//                 value: undefined,
//                 done: true
//             }
//         }
//     }
// }

// // 给对象部署一个简单的迭代器
// let obj = {
//     start: [1, 2, 3, 4, 5],
//     end: [6, 7, 8, 9],
//     [Symbol.iterator]() {
//         let nextIndex = 0;
//         let arr = [...this.start, ...this.end];
//         let len = arr.length;
//         return {
//             next() {
//                 if (nextIndex < len) {
//                     return {
//                         value: arr[nextIndex++],
//                         done: false
//                     }
//                 } else {
//                     return {
//                         value: undefined,
//                         done: true
//                     }
//                 }
//             }
//         }
//     }
// }

// for (let i of obj) {
//     console.log(i);
// }

// 让obj像Map一样可以部署iterator
// // map 示例
// let m = new Map([
//     ['a', 1],
//     ['b', 2]
// ]);
// for (let i of m) {
//     console.log(i);
// }

// // obj 部署iterator
// 方法1
// let obj = {
//     a: 1,
//     b: 2,
//     c: 3,
//     [Symbol.iterator]() {
//         let map = new Map();
//         for (let [key, value] of Object.entries(this)) {
//             map.set(key, value);
//         }
//         let mapEntries = [...map.entries()];
//         let nextIndex = 0
//         let len = mapEntries.length;
//         return {
//             next() {
//                 if (nextIndex < len) {
//                     return {
//                         value: mapEntries[nextIndex++],
//                         done: false
//                     }
//                 } else {
//                     return {
//                         value: undefined,
//                         done: true
//                     }
//                 }
//             }
//         }
//     }
// }
// for (let i of obj) {
//     console.log(i);
// }
// 现在一般不这样写，直接用Map类型更好

// // 方法2
// let obj = {
//     a: 1,
//     b: 2,
//     c: 3,
//     [Symbol.iterator]() {
//         let arr = Object.entries(this),
//             len = arr.length,
//             index = 0;
//         return {
//             next() {
//                 if (index < len) { return { value: arr[index++], done: false } } else { return { value: undefined, done: true } }
//             }
//         }

//     }
// }

// for (let i of obj) {
//     console.log(i);
// }

// ======================================

// 默认会调用iterator 的场合
// 1. ...拓展运算符
// 2. for...of
// 3. Array.from()
// 4. map, set, Promise.all(), Promise.race()
// 5. yield

// ======================================

// // 再部署迭代器时，可以部署的方法
// // return(), throw()
// let obj = {
//     a: 1,
//     b: 2,
//     c: 3,
//     [Symbol.iterator]() {
//         let arr = Object.entries(this),
//             len = arr.length,
//             index = 0;
//         return {
//             next() {
//                 if (index < len) { return { value: arr[index++], done: false } } else { return { value: undefined, done: true } }
//             },
//             return () {
//                 console.log('return')
//                 return { value: '中断', done: true }
//             },
//             throw () {

//             }
//         }

//     }
// }

// for (let i of obj) {
//     console.log(i);

//     // 只要是终止for..of循环的方式都会调用return方法
//     // // 方式1
//     // break; // 会调用return方法 
//     // 方式2
//     throw new Error('hello');
// }

// // console.log(Object.prototype.toString.call(Object.entries(obj)));

// ======================================

// // generator -> 生成器 -> 用来返回一个迭代器对象

// // 普通返回迭代器对象的方式
// let obj = {
//     a: 1,
//     b: 2,
//     c: 3,
//     [Symbol.iterator]() {
//         let arr = Object.entries(obj),
//             len = arr.length,
//             index = 0;
//         return {
//             next() {
//                 if (index < len) {
//                     return { value: arr[index++], done: false }
//                 } else {
//                     return { value: undefined, done: true }
//                 }
//             }
//         }
//     }
// }
// let iter = obj[Symbol.iterator]();
// console.log(iter); //{next: ƒ}


// // generator 生成一个迭代器对象, 关键标记 *
// // 返回值 是迭代器对象
// // 必须和 yield 结合起来用
// // yield 产出yield后面的值, 并暂停函数运行, yield 只能在生成器当中使用
// // yield 并不产除值 undefined -> yield的产出值由next来决定 iter.next(value)
// function* test() {
//     let a = yield 'a';
//     console.log(1);
//     console.log(a); //undefined -> yield并不产出值
//     yield 'b';
//     // break;//SyntaxError: Illegal break statement -> 函数体内不允许使用break
//     console.log(2);
//     yield 'c';
//     console.log(3);
//     return 'd';

// }
// let iter = test();
// console.log(iter.next()); //{value: "a", done: false}
// // 由于yield 有暂停函数的功能，所以1在第二次调用的时候才打印出
// console.log(iter.next()); //1 {value: "b", done: false}
// console.log(iter.next()); //2 {value: "b", done: false}
// console.log(iter.next()); //3 {value: "b", done: true}
// console.log(iter.next()); // {value: undefined, done: true}

// // yield 和 return的区别
// // yield -> 暂停 -> 有记忆功能
// // return -> 结束函数运行

// ======================================
// yield 的特殊调用
// // 1. yield 不赋值 -> 可以正常调用
// function* demo() {
//     yield
// }
// let iter = demo();
// console.log(iter.next()); //{value: undefined, done: false}

// // yield 在表达式中
// //需要将yield value 用()报告，形成单独的表达式，才有效
// function* demo() {
//     // console.log('jayden' + yield 123); //SyntaxError: Unexpected identifier
//     console.log('jayden' + (yield 123)); // {value: 123, done: false}
// }
// let iter = demo();
// console.log(iter.next());

// // yield 作为参数
// // 先将generator 中的 yield 走完，才执行函数
// function* demo() {
//     foo(yield 'jayden', yield 'alexis');
// }

// function foo(a, b) {
//     console.log(a, b)
// }

// let iter = demo();
// console.log(iter.next()); //{value: "jayden", done: false}
// console.log(iter.next()); //{value: "jayden", done: false}
// console.log(iter.next()); //undefined undefined {value: undefined, done: true}

// // 迭代 generator
// function* foo() {
//     yield 1;
//     yield 2;
//     yield 3;
//     yield 4;
//     yield 5;
//     yield 6;
// }
// for (let i of foo()) {
//     console.log(i);
// }

// ======================================

// // generator 传值
// function* foo() {

//     let value1 = yield 1;
//     console.log('value1 ' + value1);
//     let value2 = yield 2;
//     console.log('value2 ' + value2);
//     let value3 = yield 3;
//     console.log('value3 ' + value3);
//     let value4 = yield 4;
//     console.log('value4 ' + value4);
// }
// let iter = foo();
// // yield 传值依赖的是next()
// // 下一个next(value) 传值给上一个 变量
// console.log(iter.next()); //value1 jayden2
// console.log(iter.next('jayden2')); //value2 jayden3
// console.log(iter.next('jayden3')); //value3 jayden4
// console.log(iter.next('jayden4')); //value4 jayden5
// console.log(iter.next('jayden5'));

// 优化obj增加迭代器
// 1.
// let obj = {
//     start: [1, 2, 3],
//     end: [5, 6, 8],
//     // generator 做法
//     [Symbol.iterator]: function*() {
//         let arr = [...this.start, ...this.end],
//             len = arr.length,
//             index = 0
//         while (index < len) {
//             yield arr[index++];
//         }
//     }

//     // 原来的做法
//     // [Symbol.iterator]() {
//     //     let arr = [...this.start, ...this.end],
//     //         len = arr.length,
//     //         index = 0;
//     // return {
//     //     next() {
//     //         if (index < len) {
//     //             return { value: arr[index++], done: false };
//     //         } else {
//     //             return { value: undefined, done: true }
//     //         }
//     //     }
//     // }
// }
// for (let i of obj) {
//     console.log(i);
// }

// // 2
// let obj = {
//     a: 1,
//     b: 2,
//     c: 3,
//     [Symbol.iterator]: function*() {
//         let map = new Map();
//         for (let [key, value] of Object.entries(this)) {
//             map.set(key, value);
//         }
//         let arr = [...map.entries()],
//             len = arr.length,
//             index = 0;
//         while (index < len) {
//             yield arr[index++];
//         }

//         // // 原来的写法
//         // return {
//         //     next() {
//         //         if (index < len) {
//         //             return { value: arr[index++], done: false };
//         //         } else {
//         //             return { value: undefined, done: true };
//         //         }
//         //     }
//         // }
//     }
// }

// for (let i of obj) {
//     console.log(i);
// }

// ======================================

// // generator 优化fs调用
// // genrator 的写法
// let fs = require('fs');

// let promisify = function(func) {
//     return function(...args) {
//         return new Promise((resolve, reject) => {
//             func(...args, (err, data) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(data);
//                 }
//             })
//         });
//     }
// }

// let readfile = promisify(fs.readFile);
// // generator
// function* gen() {
//     let value1 = yield readfile('./num.txt', 'utf-8');
//     let value2 = yield readfile(value1, 'utf-8');
//     let value3 = yield readfile(value2, 'utf-8');
//     return value3;
// }


// // // 安装co 进行优化
// // // npm i co -D // -D 安装到本地
// // // co 坐着 TJ，他写了 Koa co express jade mocha
// // let co = require('co');

// // // let iter = gen();
// // let pro = co(gen());
// // pro.then(res => console.log(res));


// // 自定义Co进行代码优化
// function Co(iter) {
//     return new Promise((resolve, reject) => {
//         let next = (data) => {
//             let { value, done } = iter.next(data);
//             if (done) {
//                 resolve(value)
//             } else {
//                 value.then((data) => {
//                     next(data);
//                 });
//             }
//         }
//         next();
//     })
// }
// let promise = Co(gen());
// promise.then(res => console.log(res));

// // // 重复代码太多，进一步优化
// // let { value, done } = iter.next();
// // value.then(data => {
// //     let { value, done } = iter.next(data);
// //     value.then(data => {
// //         let { value, done } = iter.next(data);
// //         value.then(data => {
// //             console.log(data);
// //         })
// //     })
// // })


// // // promise 的写法
// // let fs = require('fs');
// // function readFile(path) {
// //     return new Promise((resolve, reject) => {
// //         fs.readFile(path, 'utf-8', (err, data) => {
// //             if (err) {
// //                 reject(err);
// //             } else {
// //                 resolve(data);
// //             }
// //         })
// //     });
// // }
// // readFile('./num.txt')
// //     .then(res => readFile(res))
// //     .then(res => readFile(res))
// //     .then(data => console.log(data));

// // ======================================
// // generator 的理解方式
// // 1. 将generator 看做一个状态机 , 经常将其与异步操作相结合

// // 2. 将generator 看做一个生成函数