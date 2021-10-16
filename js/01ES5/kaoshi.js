// // 题 01 打印的是什么
// function test (a, b) {
//   arguments[2] = 3; // arguments是类数组，类数组改变长度使用的数组函数push,pop,shift,unshfit等,这样直接赋值对类数组的length属性没有作用
//   console.log(arguments.length);
//   console.log(arguments[2]);
// }

// test(1, 2);

// console.log(test.length); // 2,3,2


// 题 2 打印的是什么,类数组不一定有length
// const obj = {
//   '2': 3,
//   '3': 4,
//   lenght: '3'
//   push: Array.prototype.push
// }

// obj.push(1);

// console.log(obj.length);
// console.log(obj);

// // 变化
// const obj = {
//   '2': 3,
//   '3': 4,
//   length: 2,
//   push: Array.prototype.push
// }

// obj.push(1);

// console.log(obj.length);
// console.log(obj);


// //题3 打印什么？
// // 无序集合不可以转化为有序字符串, 对象就是无序集合
// // {} 参与运算没有意义，只能toString
// console.log(({} + {}).length) // 30
// console.log(({} - {}).length) // undefined NaN.length
// console.log(([] - []).length) // undefined 0.length
// console.log((function(){}).length) //0 ,形参长度

// console.log((function test () {}).toString().length) // 19

// // 函数一定有返回值，如果没有手动返回，又不是构造函数那么返回undefined
// console.log(({} + (function () {console.log(123)})()).length); // 123 24

// // 有序集合可以转化为有序的字符串，可以进一步处理，由编译器决定
// console.log([1,2,3].toString) // 1,2,3

// // 题4 null 和 undefined无意义，js3引擎会往上找，找到window
// function Test () {}
// Test.prototype.a = function () {
//   console.log(this);
// }

// new Test().a.call(null); //window
// new Test().a.call(undefined); // window
// new Test().a.call(123); // 

// // 题4 变形，加'use strict'
// 'use strict'
// function Test () {}
// Test.prototype.a = function () {
//   console.log(this);
// }

// new Test().a.call(null); // null
// new Test().a.call(undefined); // undefined
// new Test().a.call(123); // 

// // 题4 变形2，加'use strict'
// // use strict 必须写在一个作用域的最顶端
// function Test () {}
// 'use strict'
// Test.prototype.a = function () {
//   console.log(this);
// }

// new Test().a.call(null); // window
// new Test().a.call(undefined); // window
// new Test().a.call(123);  

// // 题5， class 内部就是按照严格模式来执行
// class Test {
//   a () {
//     console.log(this);
//   }
// }

// new Test().a.call(null);
// new Test().a.call(undefined);

// // const Test = class{} // 类表达式
// // const Test = class A {} // 含名类表达式，名只能自身调用
// // class Test{} // 类定义
// // function test(){} // 函数定义
// // var test = function(){} // 函数表达式
// // var test = function a(){} // 函数含名表达式，名只能自身调用

// // class Test == function Test 都是基于原型继承的
// // JavaScript 的类也是基于原型继承的，JavaScript不存在任何类机制，一切基于原型继承，任何数据都是函数构造出来的，一切基于函数
// // JavaScript广义上说不是一门语言，是一门由js引擎解析的技术
// // JavaScript 的 DOM分支与HTML没有关系，实际操作的是DOM树，由DOM树来对网页重绘，重排。
// // HTML 加载完后，形成DOM树


// // 题6 实现 if (a == 1 && a == 2 && a == 3) { console.log('you win');}
// var a = {
//     count: 1,
//     toString: function() {
//         return this.count++;
//     }
// }

// if (a == 1 && a == 2 && a == 3) {
//     console.log('you win');
// }


// //题 7 
// // Object.prototype 不允许重新引用(一切内置的prototype都不允许重写)，否则其他引用全错
// Object.prototype = {
//     b: 2
// };

// var obj = {
//     a: 1
// }

// console.log(obj.b); // undefined


// 题8 抄10遍数组的所有方法

// 题9 重写map方法