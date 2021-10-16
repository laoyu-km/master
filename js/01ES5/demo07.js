// // 全局函数是不释放的，始终都在GO里，可以随时调用
// function test1() {
//     console.log(1);
// }

// function test2() {
//     console.log(2);
// }
// test2();

// function test3() {
//     test1();
// }

// test3();


// /**
//  * 立即执行函数：IIFE: immediately-invoked-function
//  * 功能性名称：初始化函数,特点：
//  *      1. 自动执行
//  *      2. 执行完成后自动释放
//  */

// // 两种写法，效果一样

// // 立即执行函数写法1
// (function() {
//     函数体
// })();

// // 立即执行函数写法2, W3C推荐写法
// (function() {
//     函数体
// }());



// // 由下面的3个方法推断，只有表达式才可以执行
// // **小括号括起来的函数，常量，等就成为表达式**

// // // 下面写法报错
// // function test() {
// //     var a = 1;
// //     console.log(a);
// // }();

// //可以执行
// var test1 = function() {
//     var a = 1;
//     console.log(a);
// }

// // 可以执行
// (function test2() {
//     var a = 1;
//     console.log(a);
// })();


// // 例 1
// (function() {
//     var a = 1,
//         b = 2;
//     console.log(a + b); // 3
// })();

// // 例 2 设置函数名
// // 函数名无用，因为执行完后函数就被自动释放了
// // 立即执行函数必须是个表达式，表达式会忽略函数名
// (function test() {
//     var a = 1,
//         b = 2;
//     console.log(a + b); // 3
// })();

// console.log(test); // ReferenceError: test is not defined

// // 例 3 设置参数
// (function test(a, b) {
//     console.log(a + b); // 3
// })(3, 5);

// // 例 4 返回值
// var num = (function test(a, b) {
//     return a + b;
// })(3, 9);

// console.log(num);

// // 例 5 匿名函数赋值，和被执行后赋值
// var test1 = function() {
//     console.log(1);
// }

// console.log(test1); // f(){}

// var test2 = function() {
//     console.log(2);
// }(); // 匿名函数执行完就被销毁了

// console.log(test2); // undefined

// // 例6 函数声明变表达式的方法
// // 函数声明变为表达式的方法： 加运算符
// // 函数声明转为表达式后，函数名自动被忽略掉
// ++ function test() {
//     console.log(1);
// }();

// 1 && function test() {
//     console.log(1);
// }();

// // 在后面写无用，报错
// function test() {
//     console.log(1);
// }() || 2;



// // ==============================================
// // 逗号运算符
// // 逗号运算符是为了把几个表达式放在一起，
// // 整个表达式的值为系列中最后一个表达式的值
// // 从本质上讲，逗号的作用是将一系列运算按顺序执行
// var num = (2 - 1, 6 * 5, 2 * 2);
// console.log(num); // 4

// var a = 2,
//     b = 5,
//     c = 7,
//     d,
//     e;

// d = (++a, b--, c + 3);
// e = 5 + 2, d * 3, e - 2;
// console.log('e = ' + e); // 7 逗号优先级低

// //特例： 逗号用来分割参数
// console.log(a, b, c, d);
// console.log(3 + 5, 4 * 2);
// document.write(3 + 5, 4 * 2);



// // ==============================================
// // 面试题

// // 1 下面写法报错吗？
// // 原因是JS引擎解析时，将下面的语句解析为
// // function test(a) {

// // }
// // (6); 
// // (6) -> 被当做表达式处理
// function test(a) {

// }(6); // 不报错


// // 也不报错，逗号是运算符
// function test1(a, b) {

// }(8, 9, 10);

// //报错,()内为空就不能被看作为表达式
// // 下面写法就变成函数在声明时就执行，必然报错
// function test2(a, b) {

// }();


// 2
// // 结果是10个10， 如何解决该问题
// // 原因
//     // 实际return了10 个闭包，闭包引用的是test的AO，
//     // 循环完毕后，test的AO中的 i 已经是 10 了
// function test() {
//     var arr = [];
//     for (var i = 0; i < 10; i++) {
//         arr[i] = function() {
//             document.write(i + ' ');
//         }
//     }

//     return arr;
// }

// var myArr = test();

// console.log(myArr);

// // 打印结果是10个10
// for (var j = 0; j < 10; j++) {
//     myArr[j]();
// }

// // 解决办法1, 立即执行函数
// function test() {
//     var arr = [];
//     for (var i = 0; i < 10; i++) {
//         (function() {
//             document.write(i + ' ');
//         })();
//     }
//     return arr;
// }
// test();


// // 方法2
// function test() {
//     var arr = [];
//     for (var i = 0; i < 10; i++) {
//         arr[i] = function(num) {
//             document.write(a + ' ');
//         }
//     }

//     return arr;
// }

// var myArr = test();

// for (var j = 0; j < 10; j++) {
//     myArr[j](j);
// }


// // 方法 3 立即执行函数传参
// ** 最常用的方法 **
// function test() {
//     var arr = [];
//     for (var i = 0; i < 10; i++) {
//         (function(j) {
//             arr[j] = function() {
//                 document.write(j + ' ');
//             }
//         })(i);
//     }
//     return arr;
// }

// var myArr = test();

// for (var j = 0; j < 10; j++) {
//     myArr[j](j);
// }


// 3, 查看demo.html

// // 4 逗号分隔符
// // 参考 var f = (3, 4); f == 4 
// var fn = (

//     function test1() {
//         return 1;
//     },

//     function test2() {
//         return '2';
//     }
// )();

// console.log(typeof(fn)); // 'string'


// // 5 ()表达式忽略函数名
// var a = 10;
// // if语句执行，因为function b(){} 函数声明不是false
// // (function b(){})是一个表达式，函数名b 被忽略
// if (function b() {}) {
//     a += typeof(b); // 为什么b是undefined
// }

// console.log(a); // 10 undefined


// 6 闭包AO中变量拿到另一个引用中



// ==============================================
// 作业
// 1.写一个累加器，执行一次就加1，并打印

// 2. 写一个缓存器，把一个班级的学生名字保存在数组里，写两个方法，放入函数中的一个对象中
// 第一个方法加入班级，第二个方法离开班级，每次加入或离开都要打印新的学生名单