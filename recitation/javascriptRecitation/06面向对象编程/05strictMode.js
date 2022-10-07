/**
 * strict mode
 *
 * 目的
 * * 减少JS怪异行为
 * * 增加报错场合，消除代码运行的不安全之处
 * * 提高编译器效率，增加运行速度
 * * 为新JS版本，做好铺垫
 */
'use strict';
/**
 * 显式报错
 */

// // 1. 只读属性不可写
// var obj = Object.defineProperty({}, 'a', {
//   value: 20,
//   writable: false,
// });
// obj.a = 3;

// var str = 'jayden';
// str.length = 3;

// // 2. 严格模式下，对只读属性赋值，或者删除不可配置（non-configurable）属性都会报错
// var obj = Object.defineProperty({}, 'a', {
//   value: 15,
//   configurable: false,
// });
// delete obj.a;

// // 3. 只设置了取值器的属性不可写
// var obj = {
//   get v() {
//     return 1;
//   },
// };
// obj.v = 2;

// // 4. 禁止扩展的对象不可扩展
// var obj = {};
// Object.preventExtensions(obj);
// obj.name = 'jayden';

// // 5. eval、arguments 不可用作标识名
// var arguments = 17;
// var eval = 20;
// var obj = {
//   set p(arguments) {},
// };

// try {
// } catch (arguments) {}

// function test(eval) {}
// function arguments () {}
// var y = function eval() {};
// var f = new Function('arguments', '"use strict"; return 17;');

// // 6. 函数不能有重名的参数
// // 正常模式下，如果函数有多个重名的参数，可以用arguments[i]读取。严格模式下，这属于语法错误。
// function fun(a, a, b) {
//   return a + b;
// }

// // 7. 禁止八进制的前缀0表示法
// // 0O100, 0b100, 0x100
// var n = 0100;
// console.log(n);

/**
 * 增强的安全措施
 */

// // 1. 全局变量显式声明
// test = 2;

// // 2. 禁止 this 关键字指向全局对象
// function fn() {
//   console.log(this === window);
// }
// fn(); // false

// // 3. 禁止使用 fn.callee、fn.caller
// // 函数内部不得使用fn.caller、fn.arguments，否则会报错。这意味着不能在函数内部得到调用栈了
// function fun() {
//   fun.caller;
//   // fun.arguments;
//   // fun.callee;
// }
// console.log(fun());

// // 4.  禁止使用 arguments.callee、arguments.caller
// var f = function () {
//   return arguments.callee;
// };
// console.log(f());

// // 5. 禁止delete删除变量
// // 只有对象的属性，且属性的描述对象的configurable属性设置为true，才能被delete命令删除
// var x = 5;
// // delete x; // SyntaxErro
// console.log(window.x);
// // delete window.x; // typeErro -> window对象属性的configurable为fasle
// console.log(Object.getOwnPropertyDescriptor(window, 'x')); // configurable: false

/**
 * 静态绑定
 *
 * JavaScript 语言的一个特点，就是允许“动态绑定”，即某些属性和方法到底属于哪一个对象，不是在编译时确定的，而是在运行时（runtime）确定的。
 *
 * 严格模式对动态绑定做了一些限制。某些情况下，只允许静态绑定。也就是说，属性和方法到底归属哪个对象，必须在编译阶段就确定。这样做有利于编译效率的提高，也使得代码更容易阅读，更少出现意外。
 */

// // 1. 禁止使用 with 语句
// // 严格模式下，使用with语句将报错。因为with语句无法在编译时就确定，某个属性到底归属哪个对象，从而影响了编译效果。
// var v = 1;
// var obj = {};
// with (obj) {
//   v = 2;
// }

// // 2. 创设 eval 作用域
// // 正常模式下，JavaScript 语言有两种变量作用域（scope）：全局作用域和函数作用域。严格模式创设了第三种作用域：eval作用域
// // 正常模式下，eval语句的作用域，取决于它处于全局作用域，还是函数作用域。严格模式下，eval语句本身就是一个作用域，不再能够在其所运行的作用域创设新的变量了，也就是说，eval所生成的变量只能用于eval内部。
// (function () {
//   var a = 2;
//   console.log(eval('var a = 5; a')); // 5
//   console.log(a); //2
// })();

// // eval 使用严格模式的两种方法
// // 方式1
// function f1(str) {
//   'use strict';
//   return eval(str);
// }
// f1('undeclared_variable  = 1'); // ReferenceError undeclared_variable is not defined

// // 方式2
// function f2(str) {
//   return eval(str);
// }
// f2('"use strict"; undeclared_variable = 1'); // 同上

// // 3. arguments 不再追踪参数的变化
// function fn(a) {
//   'use strict';
//   a = 2;
//   return [a, arguments[0]];
// }
// console.log(fn(1)); // [2, 1];

/**
 * 向下一个版本的 JavaScript 过渡
 */

// // 1. 非函数代码块不得声明函数
// // 注意，如果是 ES6 环境，下面的代码不会报错，因为 ES6 允许在代码块之中声明函数。
// if (true) {
//   function f1() {} // error
//   f1();
// }

// for(var i = 0; i < 5; i++) {
//   function f2() {} //error
// }

// 2. 保留字
// 严格模式新增了一些保留字
// implements、interface、let、package、private、protected、public、static、yield等
// 使用这些词作为变量名将会报错
