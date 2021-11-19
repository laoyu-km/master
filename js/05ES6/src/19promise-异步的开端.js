// // 异步存在的问题

// // 1. 回调地狱
// // 回调地狱的问题
// // 1. error提示不清晰
// // 2. 难于维护
// // 3. 功能不便扩展
// let fs = require('fs');

// fs.readFile('./num.txt', 'utf-8', (err, data) => {
//     console.log(data);
//     if (data) {
//         fs.readFile(data, 'utf-8', (err, data) => {
//             console.log(data);
//             fs.readFile(data, 'utf-8', (err, data) => {
//                 if (err) {
//                     console.log(err);
//                 }
//                 console.log(data);
//             })
//         })
//     }
// })

// // 2. try...catch 不能捕获异步的异常
// let fs = require('fs');
// try {
//     fs.readFile('./nu.txt', 'utf-8', (err, data) => {
//         // throw Error('test err'); // 异步内手动抛出异常，报错
//         // if (err) {
//         //     console.log(err);
//         // }
//         console.log(data);
//     })
//     throw Error('Hello'); // 同步抛出异常 可行
// } catch (e) {
//     console.log(e);
// }

// // 3. 异步代码并发问题
// // 描述：要求多个异步都完成了在统一执行某个语句，示例如下
// let fs = require('fs');

// let arr = [];

// function show(data) {
//     console.log(data)
// }

// fs.readFile('./name.txt', 'utf-8', (err, data) => {
//     if (data) {
//         arr.push(data);
//     }
//     arr.length === 3 && show(arr); //比较笨的解决方式, 每一个异步都进行监听
// })

// fs.readFile('./num.txt', 'utf-8', (err, data) => {
//     if (data) {
//         arr.push(data);
//     }
//     arr.length === 3 && show(arr); //比较笨的解决方式, 每一个异步都进行监听
// })

// fs.readFile('./score.txt', 'utf-8', (err, data) => {
//     if (data) {
//         arr.push(data);
//     }
//     arr.length === 3 && show(arr); //比较笨的解决方式, 每一个异步都进行监听
// })


// // jQuery 中实现回调管理的工具 Callback();
// // Callback(); 工具比较老，现在很不使用，但是deferred 的底层是用Callback() 写的
// console.log('jayden');
// let cb = $.Callbacks();
// console.log(cb);

// function a(x, y) {
//     console.log('a', x, y);
// }

// function b(x, y) {
//     console.log('b', x, y);
// }

// cb.add(a, b);
// cb.fire(10, 20);

// ======================================

// 异步使用deferred的原因

// // 使用js原生存在的问题
// var wait = function() {
//     var task = function() {
//         console.log('执行完成')
//             // 存在的问题：如果新增需求，需要在这里添加需求，如果需求特别复杂，代码可能会很多，而且可能分成好几个模块。
//             // 这种做法对异步操作和拓展性都不友好, 这种方法尽量不要使用
//             // 所以选择 jquery 中的deferred
//     }
//     setTimeout(task, 2000);
// }
// wait();


// // 使用 deferred
// // deferred 详细查看jQuery 学习笔记
// // promise 的由来
// function waitHandle() {
//     var dtd = $.Deferred(); // 创建一个deferred对象

//     var wait = function(dtd) { // 传入一个deferred
//             // console.log(dtd); // 查看dtd 对象的方法
//             var task = function() {
//                 console.log('执行完成');
//                 dtd.resolve(); // 表示异步任务已经完成, 已经解决了
//                 // dtd.reject(); // 表示异步任务失败或出错，打印失败的回调 
//             }
//             setTimeout(task, 2000);
//             // return dtd; // 里层函数返回 deferred 对象
//             return dtd.promise(); // 注意，这里返回的是promise(),解决了外部直接调用deferred.reject()的问题
//         }
//         // 外层函数返回里层函数的执行结果
//     return wait(dtd);
// }
// // console.log(waitHandle());
// var w = waitHandle();

// // 使用w.done() 函数实现功能的拓展和多模块管理
// // w.done() 可以链式调用，返回的是一个deferred 对象
// w.done(function() {
//     console.log('ok1');
// }).fail(function() {
//     console.log('err1')
// })

// w.done(function() {
//     console.log('ok2');
// }).fail(function() {
//     console.log('err2')
// })

// // 使用w.then() 函数实现功能的拓展和多模块管理
// w.then(function() {
//     console.log('ok1');
// }, function() {
//     console.log('err1');
// })

// w.then(function() {
//     console.log('ok2');
// }, function() {
//     console.log('err2');
// })

// w.then(function() {
//     console.log('ok3');
// }, function() {
//     console.log('err3');
// })

// // 存在的问题，由于waithandle() 返回的是一个deferred对象，我们可以手动调用deferred的reject方法让返回结果直接报错
// // 如何解决这个问题 -> 就是让waitHandle() 不返回deferred对象，而是返回deferred.pomise对象
// // 这就是promise的由来
// w.reject(); // err1 err2 err1 err2 err3 执行完成// 返回的结果全部是err

// promise A+ 规范 -> bluebird 自行查阅

// ======================================

// Promise ES6
// Promise(executor(resolve, reject))
// console.log(new Promise(function(resolve, reject) {})) // 查看promise

// let promise = new Promise(function(resolve, reject) {
//     // // console.log('promise');
//     // resolve(); //通过调用resolve 来改变当前的状态为成功
//     // // reject(); //通过调用reject 来改变当前的状态为失败
//     // 示例
//     setInterval(function() {
//         Math.random() * 100 > 60 ? resolve('ok') : reject('no');
//     }, 1000);
// })

// // promise.then(), 第一个参数表示成功后执行的方法，第二个参数表示失败后执行的方法
// promise.then((val) => {
//     console.log(val);
// }, (reason) => { console.log(reason) })

// 异步操作的特征
// 1. 三个状态： 进行中，成功，失败
// 2. 状态的不可逆：只可能 进心中 -> 失败， 或者 进行中 -> 成功, 不可能 进行中 -> 失败 -> 成功

// promise 对异步特征的对应
// 1. 三个状态的对应：pending(进行中)->就是promise本身，fufilled(resolve)(成功)， reject(失效) , 这三个状态不受外界的影响
// 三个状态： promise 本身就表示进行中这个过程， resolve表示成功， reject表示失败
// 所以promise 就表示异步

// 2. promise 固化以后再对promise对象添加回调， 是可以直接拿到结果的; 如果是事件的话，一旦错过，就是真的错过

// ======================================

// // js 异步的规律：将异步代码放到队列进程中，等主线代码执行完后就执行异步代码
// // promise 内部不写异步方法， 直接调用resolve
// // 示例
// setTimeout(function() {
//     console.log('setTime');
// }, 30); // 由于微任务优先级更高，在执行完主线任务后，promise的resolve()执行在setTimeout之前

// let promise = new Promise(function(resolve, reject) {
//     console.log(0);
//     resolve(1); // 没有异步方法，一样可以调用resolve, 和reject
// });

// promise.then((val) => {
//     console.log(val);
// }, (reason) => {
//     console.log(reason);
// })

// console.log(2);

// ======================================

// // JS 代码中将任务分为： 宏任务， 微任务
// // 在任务队列中： 宏任务 -> 宏任务队列， 微任务 -> 微任务队列
// // 微任务：promise , process.nextTick(); 只有这两种微任务
// // 宏任务：除了两种微任务以外的其他任务

// // 在执行队列中，主线任务完成后，进行异步任务分配时，微任务的优先权更高

// // 事件轮询：宏任务与微任务的嵌套
// Promise.resolve().then(() => { //轮询1
//     console.log('promise1');
//     setTimeout(() => { // 轮询2
//         console.log('setTimeout1');
//     }, ); // setTimeout()不写第二个参数，会有一个默认的间隔，大概4毫秒
//     // 如何设置了时间，且这里的时间比下式的时间短，轮询顺序被打乱
// });

// setTimeout(() => { // 轮询1
//     console.log('setTimeout2');
//     Promise.resolve().then(() => { // 轮询2
//         console.log('promise2');
//     });
// }, );

// ======================================

// // 链式调用存在的问题
// let promise = new Promise(function(resolve, reject) {
//     let num = Math.random() * 100;
//     console.log(num);
//     num > 60 ? resolve('ok') : reject('no')
// });
// console.log(promise);

// // 第一次then的返回值作为下一次then的执行参数
// // 所以可以在第一次的返回中new一个Promise
// // 示例
// promise.then(
//     (val) => {
//         console.log(val);
//         // return 3;
//         return new Promise(function(resolve, reject) {
//             resolve('yes promise');
//         });
//     },
//     (reason) => {
//         console.log(reason);
//         // return 2;
//         return new Promise(function(resolve, reject) {
//             reject('no pormise')
//         })
//     }
// ).then(
//     (val) => { console.log('jayden ' + val) }, //jayden newPromise ok
//     (reason) => { console.log('alexis' + reason) }
// );