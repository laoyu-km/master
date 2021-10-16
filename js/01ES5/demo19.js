// 垃圾回收机制
// java c# javascript 都有自己的垃圾回收机制, c 和 c++要自己写

// js 垃圾回收原理
// 1. 找出不再使用的变量
// 2. 释放其占用的内存
// 3. 固定的时间 间隔运行

// // 变量生命周期
// // 全局变量 逻辑上说要在页面关闭，浏览器关闭，页面卸载时才结束
// // 所以主要讨论函数内的变量 局部变量
// // 函数内变量生命周期
// function test1() {
//     var a = 1

//     function test2() {
//         a++;
//         console.log(a);
//     }
//     test2();
// }
// // 函数变量执行后就释放，再调用时重新声明
// test1(); //2
// test1(); //2

// // 闭包函数生命周期
// function test1() {
//     var a = 1;
//     return function() {
//         a++;
//         console.log(a);
//     }
// }
// test = test1();
// test(); //2
// test(); //3
// test(); //4 test1 的AO引用 会被持续到浏览器关闭或者页面卸载
// // 解除test对test1的AO的引用
// test = null;
// test(); // TypeError: test is not a function

// // 垃圾回收机制 标记清除法
// // 垃圾回收间隔运行时
// // 1. 首先排除全局变量和闭包产生的再AO里的变量
// // 2. 排出后再检查离开环境标记
// // 3. 有离开环境标记的变量就被清除，释放其占有的内存
// // 标记清除的方式几乎所有浏览器都在用，只是具体方法不同，间隔时间不同
// function test() {
//     var a = 0; // 标记进入环境
// }
// test(); // 函数执行后，标记离开环境

// var b = 0
// var c = 1;

// function e() {}

// // 垃圾回收机制 引用计数法 (低版本浏览器可能使用)
// // 记录每个引用值被记录的次数，为0就清除
// // 容易造成浏览器内存泄露而崩溃
// function test() {
//     var a = new Object(); // a的引用 -> ayy = 1
//     var b = new Object(); // b的引用 -> byy = 1

//     // var c = a; // ayy++
//     // var c = b; // ayy-- byy++

//     // 循环应用
//     a.prop = b; // byy =2
//     b.prop = a; // ayy = 2

//     // 低版本浏览器释放循环引用的做法
//     a = null;
//     b = null;
// }