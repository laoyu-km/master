// // generator 
// // iter对象中的return() 方法
// // 任何让迭代停止的方法都会调用return
// // return 返回的是与next()同样属性的对象，但是value === return(value) 的参数， done === true, 如果不传参数，value === undefined

// // 示例1 手动调用return
// function* gen() {
//     yield 1;
//     yield 2;
//     yield 3;
// }
// let iter = gen();
// // 调用return()后, 后面的next()迭代都取不到值 value === undefined，而且done都为 true
// // 可以多次调用手动调用return(value), return 都会执行返回对应的值
// console.log(iter.next()); //{value: 1, done: false}
// console.log(iter.return(10)); //{value: 10, done: true}
// console.log(iter.return({ a: 'jayden', b: 'alexis' }));
// console.log(iter.next()); //{value: undefined, done: true}
// console.log(iter.next()); //{value: undefined, done: true}
// console.log(iter.next()); //{value: undefined, done: true}

// // 示例2， 在generator中终止迭代
// let gen = function*() {
//     yield 1;
//     return 10; // === return(10)
//     yield 2;
//     yield 3;
// }
// let iter = gen();
// console.log(iter.next()); //{value: 1, done: false}
// console.log(iter.next()); //{value: 10 , done: true} 调用的是return()
// console.log(iter.next()); //{value: undefined, done: true}
// console.log(iter.next()); //{value: undefined, done: true}
// console.log(iter.next()); //{value: undefined, done: true}

// ======================================

// iter.throw()

// 一般的throw用法
// //1.  直接抛出异常
// throw new Error('jayden');

// //2. try...catch中使用
// try {
//     throw (new Error('alexis'));
// } catch (e) {
//     console.log('jayden ' + e);
// }
// console.log('foxxx');

// // try...catch 不能捕获异步操作的异常
// try {
//     setTimeout(() => {
//         console.log(a); // a 未定义会报错
//     }, 50)
//     console.log('jayden is first');
// } catch (e) {
//     console.log(e); // 捕获不到抛出的异常
// }

// // iter 中 的 throw()
// // 1. throw() 要在try所包含的yield被迭代之后在使用才会被捕获到
// let gen = function*() {
//     yield 'alexis';
//     try {
//         yield 'jayden';
//     } catch (e) {
//         console.log('生成器的异常 ' + e)
//     }
//     yield 'foxxxf';
// }

// let iter = gen();
// // console.log(iter.throw('a')); // 在try所包含的yield以前捕获，没有捕获到异常，系统报错
// console.log(iter.next());
// // console.log(iter.throw('a')); // 在try所包含的yield以前捕获，没有捕获到异常，系统报错
// console.log(iter.next())
// console.log(iter.throw('a')); //生成器的异常 a -> 在try所包含的yield以后抛出异常就可以被捕获到
// console.log(iter.next());

// // 2. iter.throw() 具有next()的功能，在抛出异常的同时，也执行也迭代了一次iter
// let gen = function*() {
//     yield 'jayden';
//     try {
//         yield 'aleixs';
//     } catch (e) {
//         console.log('生成器抛出的错误 ' + e);
//     }
//     yield 'foxxx';
// }
// let iter = gen();
// console.log(iter.next()); // {value: "jayden", done: false}
// console.log(iter.next()); // {value: "alexis", done: false}
// console.log(iter.throw('a')); // 生成器抛出的错误 a, {value: "foxxx", done: false}
// // throw() 执行了迭代所以第三次next返回的是如下的值
// console.log(iter.next()); //{value: undefined, done: true}

// // throw() 方法，捕获异步异常
// let fs = require('fs');
// let util = require('util');
// let co = require('co');

// let readFile = util.promisify(fs.readFile);
// // let readFile = util(fs).readFileAsync;

// function* read() {
//     try {
//         let value1 = yield readFile('./num.tx', 'utf-8');
//         let value2 = yield readFile(value1, 'utf-8');
//         let value3 = yield readFile(value2, 'utf-8');
//     } catch (e) {
//         console.log('112: ' + e); // 112: Error: ENOENT: no such file or directory
//         // 异常捕获成功
//         // 需要注意的是：使用node提供的util 和 co 方法就可以正常捕获异常， 使用给自己手动写的不抛出异常
//     }
//     console.log('hello jayden'); //hello jayden
//     return value3;
// }

// let promise = co(read());
// promise.then((res) => {
//     console.log(res)
// });

// // function co(iter) {
// //     return new Promise((resolve, reject) => {
// //         let next = (data) => {
// //             let { value, done } = iter.next(data);
// //             if (done) {
// //                 resolve(value);
// //             } else {
// //                 value.then(res => next(res), err => reject(err));
// //             }
// //         }
// //         next();
// //     })
// // }

// // function util(obj) {
// //     for (let [key, value] of Object.entries(obj)) {
// //         obj[key + 'Async'] = function(...args) {
// //             return new Promise((resolve, reject) => {
// //                 value(...args, (err, data) => {
// //                     if (err) {
// //                         reject(err);
// //                     } else {
// //                         resolve(data);
// //                     }
// //                 });
// //             });
// //         }
// //     }
// //     return obj;
// // }

// ======================================

// // async and await
// // async 其实就是generator 的 语法糖, 
// // 1. 内置执行器 co
// // 2. 更好的语义
// // 3. 更广的实用性 -> await
// // 4. 返回值一定是Promise对象
// let fs = require('fs');
// let util = require('util');
// let readfile = util.promisify(fs.readFile);

// async function gen() {
//     let value1 = await readfile('./num.tx', 'utf-8'); // 抛出错误

//     console.log('jayden ' + value1); // jayden ./name.txt

//     // async 隐式将字符串包装成promise对象进行返回
//     return value1; // === Promise.resolve(value1)
// }
// let promise = gen();
// promise.then(
//     res => console.log('aleixs ' + res),
//     // async 捕获异常
//     err => console.log('foxxx ' + err) //foxxx Error: ENOENT: no such file or directory, open 'D:\code\javascript\js\ES6\src\num.tx'
// ); //aleixs ./name.txt

// // async对错误的捕获
// let fs = require('fs');
// let util = require('util');
// let readfile = util.promisify(fs.readFile);

// async function gen() {
//     // async 函数同样可以在函数体中使用try...catch来捕获异常
//     try {
//         let value1 = await readfile('./num.tx', 'utf-8'); //异步中抛出错误
//         // await 后面的更的异步操作返回的错误或者异常，可以被处理后放入return的promise对象中，通过返回对象的reject()方法进行处理
//         let value2 = await readfile(value1, 'utf-8');
//         let value3 = await readfile(value2, 'utf-8');
//     } catch (e) {
//         console.log('jayden ' + e);
//     }

//     return value3; // return如果不写返回的是undefined
// }

// let promise = gen();
// promise.then(
//     res => console.log(res),

//     //异步的错误被捕获并放入了返回值的reject()中
//     err => console.log('aleixs ' + err) //aleixs Error: ENOENT: no such file or directory, open 'D:\code\javascript\js\ES6\src\num.tx'
// );
// // 总结： 在捕获异常中，try...catch能更精准的捕获哪一行出错


// // async 不限制 await后面的所跟数据是否是promise类型，它的返回值肯定是promise
// let gen = async() => {
//     value = await 1;
//     return value;
// }
// let promise = gen();
// promise.then(res => console.log(res)); //1


// // Promise.all() 只有传入的所有promise都是完成才能返回值，其中一个错误就直接抛出错误，正常处理是哪个出错，就改哪个，直到全部正确 

// // 如何能够不管错误的，直接拿到其他正确的 -> 只为练习，实用性不打
// let fs = require('fs');
// let util = require('util');
// let readfile = util.promisify(fs.readFile);
// // 1. 三个promise没有依赖关系时, 职位说明

// async function readAll() {
//     let val1,
//         val2,
//         val3,
//         set = new Set();

//     try {
//         val1 = await readfile('./num.txt', 'utf-8');
//     } catch (e) {
//         console.log('239 ' + e);
//     }

//     try {
//         val2 = await readfile('./name.tx', 'utf-8');
//     } catch (e) {
//         console.log('245' + e);
//     }


//     try {
//         val3 = await readfile('./score.txt', 'utf-8');
//     } catch (e) {
//         console.log('252' + e);
//     }

//     set.add(val1);
//     set.add(val2);
//     set.add(val3);

//     return set;
// }

// let promise = readAll();
// promise.then(res => console.log(res));
// // 结果
// // 245Error: ENOENT: no such file or directory, open 'D:\code\javascript\js\ES6\src\name.tx' ,  Set(3) { './name.txt', undefined, '100 fen' }