// process (进程)
// process -> 属于全局对象
// console.log(process === global.process); //true

// // process.argv 
// console.log(process.argv);
// // [
// //   'D:\\Program Files\\nodejs\\node.exe', // node命令路径
// //   'D:\\code\\javascript\\js\\node\\demo' // 执行文件路径
// // ]

// // 命令行在执行文件后传参, 可通过process.argv 获得
// console.log(process.argv);
// // $ node demo --test a=1 b=2 // 命令行中输入, 在demo 后传参
// // [
// //   'D:\\Program Files\\nodejs\\node.exe',
// //   'D:\\code\\javascript\\js\\node\\demo',
// //   '--test',
// //   'a=1',
// //   'b=2'
// // ]

// process.execArgv
// // // 命令行在执行文件前传参, 可通过process.execArgv 获得
// console.log(process.execArgv);
// // [ '--harmony', '--inspect' ]


// // process.execPath
// console.log(process.execPath); //D:\Program Files\nodejs\node.exe node执行文件的绝对路径

// //  process.env // node 的系统环境
// console.log(process.env);

// // process.cwd()
// console.log(process.cwd()); // 当前文件所在路径

//  =======================

// 难点

// // 宏任务和微任务
// // 宏任务：严格按照时间顺序压栈执行的任务 -> 主线程中按序执行 task -> task 
// // 包括：回调函数，setTimeout, setInterval, U/I rending, I/O, setImmidiate(node中独有)

// // 微任务： task完成之后，插入进来的东西
// // 包括：promise, Promise.resovle().then(), processTick(node中独有)

// new Promise((resolve, reject) => {
//     console.log(1);
// }).then((data) => { // then 中的callback 才是微任务
//     console.log(data)
// }).catch(() => {}); // cahtch 中的callback 才是微任务


// node 事件循环 -> 就是异步处理方式
// 是借助 libuv 来完成事件循环的 分为六个阶段, 每次循环就执行这6步，形成一个tick, 事件循环就是不断的tick,tick
// 1. 定时器：本阶段执行已经被 setTimeout() 和 setInterval() 的调度回调函数。
// 2. 待定回调：执行延迟到下一个循环迭代的 I/O 回调。
// 3. idle, prepare：仅系统内部使用。
// 4. 轮询：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，那些由计时器和 setImmediate() 调度的之外），其余情况 node 将在适当的时候在此阻塞。
// 5. 检测：setImmediate() 回调函数在这里执行。
// 6. 关闭的回调函数：一些关闭的回调函数，如：socket.on('close', ...)。
// 在每次运行的事件循环之间，Node.js 检查它是否在等待任何异步 I/O 或计时器，如果没有的话，则完全关闭。

// 示例
// 1. 打印顺序是什么？
// setTimeout(() => console.log(1));
// setImmediate(() => console.log(2));
// process.nextTick(() => console.log(3));
// Promise.resolve().then(() => console.log(4));
// (() => console.log(5))();
// 结果： 5 3 4 1 2 为什么
// 1. process.nextTick() 这是因为 process.nextTick() 从技术上讲不是事件循环的一部分。相反，它都将在当前操作完成后处理 nextTickQueue， 而不管事件循环的当前阶段如何。 所以它会紧跟在主线程后被处理
// 2. 而Promise.resovle().then() 处于待定回调到轮序那阶段，所以其在process.nextTick之后执行
// 3. setTimeout()计时器指定 可以执行所提供回调 的 阈值，而不是用户希望其执行的确切时间。在指定的一段时间间隔后， 计时器回调将被尽可能早地运行。但是，操作系统调度或其它正在运行的回调可能会延迟它们。
// 注意：轮询 阶段 控制何时定时器执行。
// 4. 轮询 阶段有两个重要的功能：
// (1) 计算应该阻塞和轮询 I/O 的时间。
// (2) 然后，处理 轮询 队列里的事件。
// 当事件循环进入 轮询 阶段且 没有被调度的计时器时 ，将发生以下两种情况之一：
// 1. 如果 轮询 队列 不是空的 ，事件循环将循环访问回调队列并同步执行它们，直到队列已用尽，或者达到了与系统相关的硬性限制。
// 2. 如果 轮询 队列 是空的 ，还有两件事发生：
// (1)如果脚本被 setImmediate() 调度，则事件循环将结束 轮询 阶段，并继续 检查 阶段以执行那些被调度的脚本。
// (2)如果脚本 未被 setImmediate()调度，则事件循环将等待回调被添加到队列中，然后立即执行。
// 一旦 轮询 队列为空，事件循环将检查 _已达到时间阈值的计时器_。如果一个或多个计时器已准备就绪，则事件循环将绕回计时器阶段以执行这些计时器的回调。

// 5. 为什么这里setTimeout会在setImmediate之前被调用
// setImmediate() 设计为一旦在当前 轮询 阶段完成， 就执行脚本。
// setTimeout() 在最小阈值（ms 单位）过后运行脚本。
// 执行计时器的顺序将根据调用它们的上下文而异。如果二者都从主模块内调用，则计时器将受进程性能的约束（这可能会受到计算机上其他正在运行应用程序的影响）。
// 例如本例中，运行在不在 I/O 周期（即主模块）内的脚本，则执行两个计时器的顺序是非确定性的，因为它受进程性能的约束：所以先执行了setTimeout,才执行了setImmediate()

// 6. 但是，如果你把这两个函数放入一个 I/O 循环内调用，setImmediate 总是被优先调用：
// 使用 setImmediate() 相对于setTimeout() 的主要优势是，如果setImmediate()是在 I/O 周期内被调度的，那它将会在其中任何的定时器之前执行，跟这里存在多少个定时器无关

// // 示例2， 打印顺序是什么
// const fs = require('fs');

// fs.readFile('index.js', 'utf8', (err, data) => {
//     setTimeout(() => {
//         console.log(1);
//     });

//     setImmediate(() => console.log(2));

//     process.nextTick(() => {
//         console.log(3);
//     });
//     Promise.resolve().then(() => {
//         console.log(4);
//     });
//     (() => {
//         console.log(5);
//     })();
// });
// // 结果 5 3 4 2 1

// 示例3

// // 在浏览器中执行
// setTimeout(() => {
//     console.log('timer1');
//     Promise.resolve().then(() => {
//         console.log('promises1');
//     });
// });

// setTimeout(() => {
//     console.log('timer2');
//     Promise.resolve().then(() => {
//         console.log('promise2')
//     });
// });
// // 结果是 timer1 promise1 timer2 promise2
// // 原因是浏览器引擎在处理异步队列时， 会将微任务插队到异步队列之前，让其先执行，所以当第一个setTimeout被执行时，执行到第一个Promise.resolve().then()时，由于其是一个微任务，所以在被插入到异步队列时，插入到了第二个setTime之前, 所以先打印了timer1,promise1

// // 在node中执行
// // 打印会有歧义，因为定时器没有定时，不确定哪个定时器超前执行
// // 如何解决呢？给定时器加时间
// setTimeout(() => {
//     console.log('timer1');
//     Promise.resolve().then(() => {
//         console.log('promises1');
//     });
// });

// setTimeout(() => {
//     console.log('timer2');
//     Promise.resolve().then(() => {
//         console.log('promise2')
//     });
// });


// node.js异步的运用
// 插入代码时，不要使用process.nextTick() -> 会造成阻塞
// 插入代码时，最好使用setImmediate();

// //示例process.nextTick()造成堵塞
// process.nextTick(() => {
//     process.nextTick(() => {
//         let i = 0
//         while (1) {
//             console.log(10)
//             if (i === 10) {
//                 break;
//             }
//             i++;
//         }
//     })
// })

// Promise.resolve().then(() => {
//     console.log('promise2')
// });

// // 示例 setImmediate() 适合用于插入代码
// setImmediate(() => {
//     setImmediate(() => {
//         let i = 0;
//         while (1) {
//             console.log(10);
//             if (i === 10) {
//                 break;
//             }
//             i++
//         }
//     })
// })

// Promise.resolve().then(() => {
//     console.log('promise');
// });


const path = require('path');
console.log(path.dirname('/d/code/javascript/js/node'));
console.log(path.basename('/d/code/javascript/js/node'));
console.log(path.extname('name.txt'));
console.log(path.sep);
console.log(path.delimiter);

let arr = process.env.PATH.split(path.delimiter);
console.log(arr.length);

const fs = require('fs');

fs.readdir('./', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data.length);
})

fs.readdir()