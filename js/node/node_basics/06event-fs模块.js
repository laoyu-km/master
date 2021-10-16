// events (事件触发器)

// // 简单事件
// const EventEmitter = require('events');

// class CustomEvent extends EventEmitter {}

// const ce = new CustomEvent();

// // ce.on 绑定事件
// ce.on('test', (data, data1, data2) => { //'test' 事件名
//     console.log(data, data1, data2);
// })

// // 触发事件
// // 触发事件次数没有限制
// setInterval(() => {
//     // 事件参数
//     ce.emit('test', 'hello', '111', '222');
// }, 1000);
// // ce.emit('test');

//前端和后端事件的不同
// 1. 后端事件继承自 EventEmitter 的实例     前端事件来自dom 元素
// 2. 后端自定义事件名称， 前端事件名称来自于与浏览器的协议(click,mouseMove)
// 3. 前端通过 UI 操作来触发，后端通过emit('事件名称')来触发


// // 通用事件
// const EventEmitter = require('events');

// class myEvent extends EventEmitter {}

// const ce = new myEvent();

// // 定义一个ce上的error事件，error事件是通用事件，不需要手动触发，一旦出错，自动触发
// ce.on('error', (data) => {
//     console.log(data);
// });

// // 手动触发error事件
// setInterval(() => {
//     // ce.emit('error') //undefined -> 没有定义抛出的错误是什么
//     ce.emit('error', new Error('going wrong'));
// }, 500);


// // 让事件只响应一次 -> ce.once()
// const EventEmitter = require('events');

// class myEvent extends EventEmitter {}

// const ce = new myEvent();

// ce.once('test', (data, time) => {
//     console.log(data, time);
// });

// // setInterval(() => {
// //     ce.emit('test', 'jayden', Date.now());
// // }, 500);
// ce.emit('test', 'jayden', Date.now()); // jayden 1622457716784
// ce.emit('test', 'aleix', Date.now()); //不执行，once()只响应一次


// // 移除事件
// const { Certificate } = require('crypto');
// const EventEmitter = require('events');

// class myEvent extends EventEmitter {}

// const me = new myEvent();

// function fn1() {
//     console.log('fn1');
// }

// function fn2() {
//     console.log('fn2');
// }

// // 同一个事件绑定两个监听器
// me.on('test', fn1);
// me.on('test', fn2);

// setInterval(() => {
//     me.emit('test');
// }, 500);

// setInterval(() => {
//     // me.removeListener('test', fn2); //移除方法1
//     // me.off('test', fn2); //移除方法2
//     me.removeAllListeners('test'); // 移除所有
// }, 1500)


// // events 的方法
// const EventEmitter = require('events');

// class MyEvent extends EventEmitter {}

// const me = new MyEvent();

// function fn1() {
//     console.log('fn1');
// }

// function fn2() {
//     console.log('fn2');
// }

// me.on('listen1', fn1);
// me.on('listen2', fn2);

// console.log(me.getMaxListeners());
// console.log(EventEmitter.defaultMaxListeners);
// console.log(me.listenerCount('listen1'));
// console.log(me.setMaxListeners(20));
// console.log(me.getMaxListeners());
// console.log(me.listeners('listen1'))

// emitter.listenerCount(eventName) -> 获得当前事件的监听器数量
// emitter.getMaxListeners() -> 获得当前事件可绑定的监听器的数量
// emitter.setMaxListeners() -> 设置当前事件可绑定的监听器数量
// EventEmitter.defaultMaxListeners -> 所有事件默认能绑定的最大监听器数量


// 'newListener' -> 不要取这个名字， 具体看官方说明
// EventEmitter 实例在新的监听器被添加到其内部监听器数组之前，会触发自身的 'newListener' 事件。
// 为 'newListener' 事件注册的监听器将传递事件名称和对要添加的监听器的引用。
// 在添加监听器之前触发事件的事实具有微妙但重要的副作用：在 'newListener' 回调中注册到相同 name 的任何其他监听器将插入到正在添加的监听器之前。

// class MyEmitter extends EventEmitter {}

// const myEmitter = new MyEmitter();
// // 只处理一次，避免无限循环。
// myEmitter.once('newListener', (event, listener) => {
//     if (event === 'event') {
//         // 在前面插入一个新的监听器。
//         myEmitter.on('event', () => {
//             console.log('B');
//         });
//     }
// });
// myEmitter.on('event', () => {
//     console.log('A');
// });
// myEmitter.emit('event');
// // 打印:
// //   B
// //   A

//  =======================

// fs (文件系统)
// fs 模块使能够以一种模仿标准 POSIX 函数的方式与文件系统进行交互。
// node.js 是用异步的方式来操作文件系统
// fs的文件都有2中配对的方法，其中一种加了Sync 表示同步

// error first -> 错误优先

// const fs = require('fs');

// // 读取文件 
// // fs.readFile(path, [options], callback(err, data)); -> 异步写法
// // 第二个参数不给的话，默认是null
// // fs.readFile('./demo.html', 'utf-8', (err, data) => {
// fs.readFile('./demo.html', {
//     encoding: 'utf8' // 第二个参数optinos 使用对象
// }, (err, data) => {
//     if (err) {
//         console.log(err);
//     }
//     // console.log(data.toString()) // 没有第二个参数的情况下，按原文输出要使用toString()方法，toString()方法默认使用utf-8编码
//     console.log(data);
// });

// let res = fs.readFileSync('./demo.html', 'utf8');
// console.log(res);

// 同步方法 和 异步方法的区别
// 1. 同步会阻塞进程， 异步不会阻塞进程
// 2. 异步可以不一次性读完文件，可以读一点传输一点
// 3. 多用户情况下，用户请求会进入异步线程，不影响主进程，主进程可以处理下一个用户的请求
// 结论，在处理时，使用异步代码。


// 写方法
// // fs.writeFile();
// fs.writeFile('./index.js',
//     '//this is a test of jayden',
//     'utf8',
//     err => err ? console.log(err) : console.log('done')
// );

// // fs.writeFile() 对 buffer的处理
// const buffer = Buffer.from('this is a test 111')
// console.log(buffer);
// fs.writeFile('./index.js', buffer, 'utf8', err => err ? console.log(err) : console.log('done'));

// // 如果文件不存在，会创建该文件
// fs.writeFile('./index', buffer, 'utf8', err => err ? console.log(err) : console.log('done'));


// // fs.stat(); -> 获取当前的文件信息
// fs.stat('./index.js', (err, data) => {
//     if (err) { // 文件是否存在的判断方法，如果不存在则直接跳出，不执行后面的语句
//         console.log('文件不存在');
//         return;
//     }
//     console.log(data.atime);
//     console.log(data.isDirectory());
//     console.log(data.isFile());
//     // data 可能用到的属性
//     // data.atime .ctime .mtime .atimeMs .ctimeMs .mtimeMs
//     //data.isDirecotry(), isFile()
// })

// node.js 建议在fs.readFile(), writeFile(), open(), 不要使用fs.stat();

// // fs.rename()
// fs.rename('./testIndex', 'demo2.js', err => err ? console.log(err) : console.log('done'));

// //fs.unlink() -> 删除文件
// fs.unlink('./demo2.js', err => err ? console.log(err) : console.log('done'));


//  =======================

// 文件夹相关操作

// 读取文件夹
// fs.readdir('./xunhuanyilai', (err, files) => {
//     if (err) throw err;
//     console.log(files); // [ 'main.js', 'modA.js', 'modB.js' ]
// })

// // 创建文件夹
// fs.mkdir('./dir3', err => {
//     if (err) throw err;
//     console.log('done');
// });

// // 删除文件夹
// fs.rmdir('./dir3', err => {
//     if (err) throw err;
//     console.log('done');
// })


// // fs.watch() -> 监听所有，包括文件和文件夹
// // 构建最常使用的方法
// // 当前文件夹内的文件或者文件夹发生任何的增删改查动作都会被捕获
// fs.watch('./', {
//     recursive: true
// }, (eventType, fileName) => {
//     console.log(eventType, fileName);
// })

// console.log(11111);


// fs.watchFile() // 监听文件

//  =======================

// node 刚开始要熟悉的模块
// http, 
// http2 
// https 
// golbal
// path
// net
// readline
// stream
// string decoder

// node 高级
// process
// child_process