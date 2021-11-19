// 学习重点
// love.jsplusplus.com

// 必学
// node typescript = TS
// express  mongo  redis  sequalize 爬虫  egg

// TS 后端 -> 重构 ->

// NODE 属于大前端

//前端必须掌握node ->前端和后端分离很难做SSR


// 学习重点：
// node ts vue ES6 koa2 eggjs

// ===================================

// 生成器 和 迭代器
// generator and iterator

// 遍历： 实际就是到一个容器里面拿东西，
// 需求的改变：只想在遍历的某几次进行程序执行，而不是全部遍历
// 类似保存log的数组, 我只想操作某几个，而不需要全部都进行

// 迭代：是在本次遍历的过程当中进行一次程序上的输出
// 要让程序执行就需要一个迭代器
// 生成器：生成迭代器的工具

//generator 生成器 生成 iterator 迭代器
// let arr = [1, 2, 3, 4, 5];

// function* test(arr) {
//         for (var item of arr) {
//             yield item;
//         }
//         // yield 1;
//         // yield 2;
//         // yield 3;
//         // yield 4;
//         // yield 5;
//     }
//     // 生成器test制造了迭代器iterator，next()一次，迭代一次，迭代完成，done = true
// let iterator = test(arr);
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());


// // ES5 写 生成器
// let arr = [1, 2, 3, 4, 5, 6];

// function generator(arr) {
//     var i = 0;
//     return {
//         next: function() {
//             var done = (i >= arr.length),
//                 value = !done ? arr[i++] : undefined;
//             return {
//                 value: value,
//                 done: done
//             }
//         }
//     }
// }

// let iterator = generator(arr);
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());


// 一次性执行多个函数
// // 遍历的截断,
// var functions = [
//     function test1() {
//         console.log('test1');
//     },

//     function test2() {
//         console.log('test2');
//     },

//     function test3() {
//         console.log('test3');
//         return 'stop'; // 让for...of 暂停的办法, 但是这种办法是建立在遍历的基础上的，并不能像迭代截断一样
//     },

//     function test4() {
//         console.log('test4');
//     },

//     function tset5() {
//         console.log('test5');
//     }
// ];

// for (let item of functions) {
//     if (item() === 'stop') {
//         break;
//     }
// }


// // 迭代的截断方法
// var functions = [
//     function test1(next) {
//         console.log('test1');
//         next(); // 在每个函数中执行一个next()的回调函数，下一个程序的执行必须要上一个程序的next()，执行成功
//     },

//     function test2(next) {
//         console.log('test2');
//         next();
//     },

//     function test3(next) {
//         console.log('test3');
//         next();
//     },

//     function test4(next) {
//         console.log('test4');
//         next();
//     },

//     function tset5(next) {
//         console.log('test5');
//         next();
//     }
// ];

// for (let item of functions) {
//     if (item() === 'stop') {
//         break;
//     }
// }

// node express 中间件   洋葱模型
// // 假如是登陆页面
// 中间件集合[test1, test2, test3, test4, ]
//           token->ctoken->empire-> 打开页面
// 在这个过程中，中间一旦有某个中间件出错就讲集合暂停，使用的就是迭代过程中的截断

// // 前端如何使用迭代的截断方法
// // 中间件的写法, 根据需要也可以写成立即执行函数
// let M = (functions) => {
//     function* generator(arr) {
//         for (let i = 0; i < arr.length; i++) {
//             yield arr[i];
//         }
//     }

//     const iterator = generator(functions);

//     // 让函数都执行
//     const init = () => {
//         nextDo(iterator.next());
//     }

//     function nextDo(n) {
//         n.value(function() {
//             const n = iterator.next();
//             if (!n.done) {
//                 nextDo(n);
//             } else {
//                 return;
//             }
//         })
//     }
//     init();
// }

// // 函数执行，程序内不执行next(),就不会执行后面的程序, 也就是程序集合被截断
// // 如果下面是登陆操作，就可以将登陆操作需要的几个操作都放入其中，进行管理
// M([
//     // 用户名密码校验
//     function test1(next) {
//         console.log('test1');
//         next();
//     },

//     // ajax 执行
//     function test2(next) {
//         console.log('test2');
//         next();
//     },

//     // 回执
//     function test3(next) {
//         console.log('test3');
//         // if (token) {
//         //     next();
//         // }
//         next();
//     },

//     function test4(next) {
//         console.log('test4');
//         next();
//     },

//     function tset5(next) {
//         console.log('test5');
//         next();
//     }
// ])


// ===================================

// 中间件的其他写法 
// 示例 -》 ./generator/*


// github 搜索 TJ holowaychuk