// // promise 抛出异常的写法
// let promise = new Promise((resolve, reject) => {
//     // 在exector 里抛出的错误，都会被reject截获
//     // 示例1
//     resolve(a); // a 未被定义，会在resolve()执行之前抛出错误，抛出的错误就会被reject()截获
//     // 示例2
//     // console.log(a);
//     // 示例1 和 示例2 结果相同
//     // 需要注意，抛出的错误要在 resolve() 或者 reject() 之前抛出，否则状态已经固化，错误不会被捕获
// })


// // promise.then(null, // 由于直接拿到错误，不会执行成功的函数，所以第一个参数直接给null 
// //     (reason) => {
// //         console.log('reject' + reason); //rejectReferenceError: a is not defined
// //     }
// // )

// // // 上面这种写法 === 以下这种
// // promise.catch(function(reason) {
// //     console.log('reject:' + reason); //reject:ReferenceError: a is not defined
// // })

// // 推荐写法, 语义明确
// promise
//     .then(function() {})
//     .catch(function() {});

// ======================================

// // 状态固化
// let promise = new Promise((resolve, reject) => {
//     resolve('ok'); //promise 状态被固化为resolve
//     // reject('no');
//     console.log(a);
// })

// promise
//     .then(function(value) {
//         console.log(value); // ok
//     })
//     .catch(function(err) { // 状态固化后，无法捕获
//         console.log(err);
//     })

// promise.catch() 的特性冒泡特性，状态固化后，无法捕获
// // 冒泡特性
// let promise = new Promise((resolve, reject) => {
//     console.log(a);
// })

// // 系统报错
// console.log(promise); // 系统报错 红字

// // reject() 捕获异常后 catch()被忽略
// promise.
// then(
//     (value) => {
//         console.log(value);
//     },
//     (reason) => {
//         console.log('alexis' + reason); // alexisReferenceError: a is not defined ->  reject() 捕获异常
//     }
// ).catch(function(err) {
//     console.log('jayden' + err);
// });

// // 如果已知有异常，使用catch()捕获，则在 promise.then()中不写失败的执行方法
// promise
//     .then(function(value) {
//         console.log(value); // ok
//     }).then((value) => {
//         console.log(value);
//     }).then(
//         (value) => { console.log(value) })
//     .catch(function(err) { // 多个then后，catch()任然可以捕获第一个异常，说明了catch的冒泡特性 -> 这个例子举的不好
//         console.log('carter' + err); //carterReferenceError: a is not defined
//     })

// // then() 如果不传参，会被直接忽略
// promise
//     .then(function(value) {
//         console.log(value);
//     }).then().then()
//     .catch(function(err) {
//         console.log('carter' + err);
//     })

// ======================================

// 多个promise嵌套的情况，如何传递状态
// 每个promise 都是一个异步

// 状态依赖
// // 示例
// // p2 的执行依赖 p1
// const p1 = new Promise((resolve, reject) => {
//     setTimeout(function() {
//         let value = Math.random() * 100;
//         value > 60 ? resolve(value) : reject('不及格');
//     }, 2000);
// })

// const p2 = new Promise((resolve, reject) => {
//     setTimeout(function() {
//         resolve(p1); // p2的执行依赖p1, 
//         // 由于p1是参数，所以p2在1秒后失效，等待p1的执行
//         // p1执行后状态固化为失败，这个状态传递到p2,此时p2的状态未固化，所以这里的resolve不会执行，p2的状态直接是失败，抛出异常
//         // 也就是说此时p2的状态由p1决定
//     }, 1000);
// })

// p1.then(result => console.log('p1 ' + result))
//     .catch(err => console.log('p1' + err));

// p2.then(result => console.log('p2 ' + result))
//     .catch(err => console.log('p2' + err));


// // resolve reject 不会终止函数运行
// const p1 = new Promise((resolve, reject) => {
//     resolve(1);
//     console.log(2)
//     console.log(a);
// })

// p1.then(res => console.log(res)).catch((err) => console.log(err));

// console.log(3);
// console.log(b);
// // 执行结果 2 3 报错 1 
// // 1. 由于resolve将p1的状态固化，所以其不抛出a is not defined的异常
// // 2. resolve 没有终止同步语句的执行

// ======================================

// // Promise 管理异步的办法
// // Promise.all()  Promise.race()

// // Promise.all() 参数是一个数组，数组元素都是promise实例, 在所有promise 都成功的情况下 返回一个iterator 元素,本例中是一个数组,其中的元素是每一个promise成功返回的值
// //示例
// const fs = require('fs');

// let promise1 = new Promise((resolve, reject) => {
//     fs.readFile('./num.txt', 'utf-8', function(err, data) {
//         if (err) {
//             reject(err)
//         }
//         resolve(data);
//     })
// })

// let promise2 = new Promise((resolve, reject) => {
//     fs.readFile('./name.txt', 'utf-8', function(err, data) {
//         if (err) {
//             reject(err);
//         }
//         resolve(data);
//     });
// })

// let promise3 = new Promise((resolve, reject) => {
//     fs.readFile('./score.tx', 'utf-8', function(err, data) {
//         if (err) {
//             reject(err);
//         }
//         resolve(data);
//     })
// })

// const p = Promise.all([promise1, promise2, promise3]);

// // // Promise.all() 中的promise 全部成功的情况
// // p.then(res => console.log(res)); //[ './name.txt', './score.txt', '100 fen' ]

// // // Promise.all() 中有错误的情况, 但是在出错的promise中没有使用reject()的情况
// // p.then(res => console.log(res))
// //     .catch(err => console.log(err)); //[ './name.txt', './score.txt', undefined ]
// // // fs.readFile有异常，data值为undefined

// // Promise.all() 中有错误的情况, 在出错的promise中使用reject()
// p.then(res => console.log(res))
//     .catch(err => console.log(err));
// // 结果
// //  errno: -4058,
// //  code: 'ENOENT',
// //  syscall: 'open',
// //  path: 'D:\\code\\javascript\\js\\ES6\\src\\score.tx'
// //存在的问题: 上面这种写法获取到错误时，不能准确判断是哪一个promise出错，怎么办

// function test(a, b, callback) {
//     let data,
//         err;
//     if (a + b > 10) {
//         data = a + b;
//     } else {
//         err = new Error('aleixs is wrong');
//     }
//     return callback(err, data);
// }

// let promise1 = new Promise((resolve, reject) => {
//     setTimeout(function() {
//         test(2, 88, (err, data) => {
//             if (err) {
//                 reject('promise1' + err);
//             }
//             resolve(data);
//         })
//     }, 1000)
// })
// let promise2 = new Promise((resolve, reject) => {
//     setTimeout(function() {
//         test(2, 1, (err, data) => {
//             if (err) {
//                 reject('promise2' + err);
//             }
//             resolve(data);
//         })
//     }, 2000)
// })
// let promise3 = new Promise((resolve, reject) => {
//     setTimeout(function() {
//         test(5, 1, (err, data) => {
//             if (err) {
//                 reject('promise' + err);
//             }
//             resolve(data);
//             // reject('promise2 ' + err)
//         })
//     }, 3000)
// })

// let p = Promise.all([promise1, promise2, promise3]);

// // // 都成功的情况
// // p.then(res => console.log(res)) // (3) ["promise1: 1000ms", "promise1: 2000", "promise1: 3000ms"]
// //     .catch(err => console.log('reject ' + err));

// // // 都reject的情况, 输出的是第一个错误信息
// // p.then(res => console.log(res))
// //     .catch(err => console.log('reject ' + err)); //reject jayden1: 1000

// // // 只有一个reject的情况
// // p.then(res => console.log(res))
// //     .catch(err => console.log(err)); // jayden2: 2000

// // // 没有reject的情况, 但是有错误的情况
// p.then(res => console.log(res))
//     .catch(err => console.log(err)); // [undefined, undefined, undefined]

// // 总结 Promise.all() 的使用
// // 1. 参数：一个元素是promise实例的iterator对象
// // 2. 所有元素都成功后的返回值是一个有iterator属性的元素，一般是数组
// // 3. 如果参数的每一个promise中没有调用reject(), 如果任何一个失败，或者都失败，会返回[undefined, undefined, undefined]这样的数组
// // 4. 都有reject, 如果全都错，只打印第一个错误
// // 5. 都有reject, 如果错一个，打印错的那个，如果多个错，打印第一个

// ======================================

// //Promise.race() 
// // 返回第一个成功或失败的promise，就返回这个
// let test = function(a, b, call) {
//     let data,
//         err;
//     if (a + b > 10) {
//         data = a + b;
//     } else {
//         err = new Error('aleixs is wrong');
//     }

//     return call(err, data);
// }

// promise1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         test(5, 4, (err, data) => {
//             if (err) {
//                 reject('promise1 ' + err);
//             }
//             resolve('promise1 ' + data);
//         })
//     }, 1000);
// })

// promise2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         test(5, 6, (err, data) => {
//             if (err) {
//                 reject('promise2 ' + err);
//             }
//             resolve('promise2 ' + data);
//         })
//     }, 200);
// })

// promise3 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         test(5, 6, (err, data) => {
//             if (err) {
//                 reject('promise3 ' + err);
//             }
//             resolve('promise3 ' + data);
//         })
//     }, 30);
// })

// let p = Promise.race([promise1, promise2, promise3]);

// p.then(res => console.log(res))
//     .catch(err => console.log(err));
// // 当time(promise1 < promise2 < promise 3) -> promise1
// // 当time(promise2 < promise1 < promise 3) -> promise2
// // 当time(promise3 < promise2 < promise 1) -> promise3

// ======================================

// // thenable 转 Promise
// let thenable = {
//     then: function(resolve, reject) { //then必须是一个exector方法，必须要有resolve 和 reject 两个参数
//         resolve(52);
//     }
// }

// // 通过resolve的方法来部署值, 参数要是thenable类型
// let p1 = Promise.resolve(thenable);
// p1.then(value => console.log(value)); //52


// // 字符串传参转Promise对象
// let p = Promise.resolve('jayden');
// p.then(res => console.log(res)); //jayden


// // 主线任务，异步微任务，异步宏任务的优先级
// setTimeout(function() { console.log(3) })
// Promise.resolve().then(function() { console.log(2) });
// console.log(1);
// // 结果： 1, 2, 3

// ======================================

// 示例 回调地狱的解决
// // 回调地狱
// const fs = require('fs');
// fs.readFile('./num.txt', 'utf-8', (err, data) => {
//     if (data) {
//         fs.readFile(data, 'utf-8', (err, data) => {
//             if (data) {
//                 fs.readFile(data, 'utf-8', (err, data) => {
//                     console.log(data);
//                 })
//             }
//         })
//     }
// })

// // promise 对回调地狱的优化
// // 让回调函数promise化
// const fs = require('fs');

// function readfile(path) {
//     return new Promise((resolve, reject) => {
//         fs.readFile(path, 'utf-8', (err, data) => {
//             if (data) {
//                 resolve(data);
//             }
//         })
//     })
// }

// readfile('./num.txt').then((data) =>
//     readfile(data)
// ).then(data =>
//     readfile(data)
// ).then(data =>
//     console.log(data)
// );


// // 一个函数，让所有传入的函数都promise化
// // 在node当中也是使用了这个方法
// let fs = require('fs');

// function promisify(func) {

//     return function(...arg) {
//         return new Promise((resolve, reject) => {
//             func(...arg, (err, data) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(data);
//                 }
//             })
//         })
//     }
// }

// let readFile = promisify(fs.readFile);

// readFile('./num.txt', 'utf-8')
//     .then(data => readFile(data, 'utf-8'))
//     .then(data => readFile(data, 'utf-8'))
//     .then(data => console.log(data));

// // 使用node中定义好的promise化函数
// const fs = require('fs');
// const util = require('util');
// let readFile = util.promisify(fs.readFile);

// readFile('./num.txt', 'utf-8')
//     .then(data => readFile(data, 'utf-8'))
//     .then(data => readFile(data, 'utf-8'))
//     .then(data => console.log(data));


// // 如果一个一个的去将js.中的方法进行promise化，还是态麻烦，如何优化
// // 手写 promisifyAll()
// const fs = require('fs');

// function promisify(func) {
//     return function(...args) {
//         return new Promise((resolve, reject) => {
//             func(...args, (err, data) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(data);
//                 }
//             })
//         })
//     }
// }

// function promisifyAll(obj) {
//     for (let [key, fn] of Object.entries(obj)) {
//         if (typeof(fn) === 'function') {
//             obj[key + 'Async'] = promisify(fn);
//         }
//     }
// }

// promisifyAll(fs);
// let rf = fs.readFileAsync;
// rf('./num.txt', 'utf-8')
//     .then(data => rf(data, 'utf-8'))
//     .then(data => rf(data, 'utf-8'))
//     .then(data => console.log(data));