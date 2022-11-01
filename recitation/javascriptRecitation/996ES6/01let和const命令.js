// let

// // 1.1 let 所声明的变量，只在let命令所在的代码块内({...})有效。

// var a = [];

// for (let i = 0; i < 10; i++) {
//   a[i] = function () {
//     console.log(i);
//   };
// }

// a.forEach((item) => {
//   item();
// });

// // for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域
// for (let i = 0; i < 3; i++) {
//   // console.log(i); // 报错 -> ReferenceError
//   let i = 'abc';
//   console.log(i);
// }

// 1.2 不存在变量提升
// let命令改变了var的语法行为，它所声明的变量一定要在声明后使用，否则报错。

// //1.3 暂时性死区
// // S6 明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错
// // 在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。
// // 有些“死区”比较隐蔽，不太容易发现
// let temp = new Date();
// function fn() {
//   console.log(temp); // 只能在let之后使用
//   let temp = 'Hello Jayden';
// }
// fn(); // Reference Error

// function bar1(x = y, y = 2) {
//   // y 死区
//   return [x, y];
// }
// bar1();

// function bar2(x = 2, y = x) {
//   // 可以执行
//   return [x, y];
// }
// bar2();

// let x = x; // 死区

// // 1.4 不允许重复声明
// // let不允许在相同作用域内，重复声明同一个变量
// function func() {
//   var a = 10;
//   let a = 2;
//   console.log(a);
// }
// func(); // 报错

// // 因此，不能在函数内部重新声明参数
// function funcpara(arg) {
//   let arg = 2;
//   console.log(arg);
// }
// funcpara(5); // SyntaxError: Identifier 'arg' has already been declared

// 2. 块级作用域

// // 2.1 为什么需要块级作用域？
// // 第一种场景，内层变量可能会覆盖外层变量
// var temp = new Date();

// function f() {
//   console.log(temp);
//   if (false) {
//     var temp = 'Hello Jayden';
//   }
// }
// f(); // undefined -> f()  内 var temp 被提升， 但是因为if(false) temp 未被赋值

// // 第二种场景，用来计数的循环变量泄露为全局变量
// var s = 'Jayden';

// for (var i = 0; i < s.length; i++) {
//   console.log(s[i]);
// }
// console.log(i); // 5 -> 循环结束后 i 依然存在

// // 2.2 ES6 的块级作用域
// // let实际上为 JavaScript 新增了块级作用域
// function f1() {
//   let n = 5;
//   if (true) {
//     let n = 10;
//   }
//   console.log(n);
// }
// f1(); // 5 -> if块内 n 未作用外部 n

// ES6 允许块级作用域的任意嵌套

// // 内层作用域可以定义外层作用域的同名变量。
// {
//   {
//     {
//       {
//         let name = 'Alexis Texas';
//         {
//           let name = 'Jayden James';
//         }
//       }
//     }
//   }
// }

// 块级作用域的出现，实际上使得获得广泛应用的匿名立即执行函数表达式（匿名 IIFE）不再必要了

// 2.3 块级作用域与函数声明
// ES5 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明。
// // ES6 引入了块级作用域，明确允许在块级作用域之中声明函数。ES6 规定，块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用
// function fn() {
//   console.log('I am outside');
// }
// (function () {
//   if (false) {
//     function fn() {
//       console.log('I am inside');
//     }
//   }
//   fn(); // fn is not a function
// })();

// 原来，如果改变了块级作用域内声明的函数的处理规则，显然会对老代码产生很大影响。为了减轻因此产生的不兼容问题，ES6 在附录 B里面规定，浏览器的实现可以不遵守上面的规定，有自己的行为方式。
// a. 允许在块级作用域内声明函数。
// b. 函数声明类似于var，即会提升到全局作用域或函数作用域的头部。
// c. 同时，函数声明还会提升到所在的块级作用域的头部。
// 注意，上面三条规则只对 ES6 的浏览器实现有效，其他环境的实现不用遵守，还是将块级作用域的函数声明当作let处理
// // 根据这三条规则，浏览器的 ES6 环境中，块级作用域内声明的函数，行为类似于var声明的变量。上面的例子实际运行的代码如下。
// function fn() {
//   console.log('I am outside');
// }
// (function () {
//   var fn = undefined;
//   if (false) {
//     function fn() {
//       console.log('I am inside');
//     }
//   }
//   fn();
// })();

// 结论: 考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。

// // ES6 的块级作用域必须有大括号，如果没有大括号，JavaScript 引擎就认为不存在块级作用域。
// // if (true) let x = 1; // 报错, 没有大括号，语句直接跟在if后面无法判断作用域
// // 函数声明也有同样问题, 严格模式下，函数只能声明在当前作用域的顶层。
// ('use strict');
// if (true)
//   function fn() {
//     console.log('lust');
//   }

// fn();

// 3. const 命令

// 3.1 基本用法
// const声明一个只读的常量。一旦声明，常量的值就不能改变
// const 声明时必须赋值， 否则报错
// const的作用域与let命令相同：只在声明所在的块级作用域内有效

// // 3.2 本质
// // const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，const只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心
// // 如果真的想将对象冻结，应该使用Object.freeze方法
// // 除了将对象本身冻结，对象的属性也应该冻结。下面是一个将对象彻底冻结的函数
// let constantize = (obj) => {
//   Object.freeze(obj);
//   Object.keys(obj).forEach((key, k) => {
//     if (typeof obj[key] === 'object' && obj[key] !== null) {
//       constantize(obj[key]);
//     }
//   });
// };

// 3.3 ES6 声明变量的六种方法
// var, function, let, const, class, import

// 4. 顶层对象的属性
// 顶层对象，在浏览器环境指的是window对象，在 Node 指的是global对象
// ES5 之中，顶层对象的属性与全局变量是等价的。
// 顶层对象的属性与全局变量挂钩，被认为是 JavaScript 语言最大的设计败笔之一
// ES6 为了改变这一点，一方面规定，为了保持兼容性，var命令和function命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩

// 5. globalThis 对象
// JavaScript 语言存在一个顶层对象，它提供全局环境（即全局作用域），所有代码都是在这个环境中运行。但是，顶层对象在各种实现里面是不统一的。
// a. 浏览器里面，顶层对象是window，但 Node 和 Web Worker 没有window。
// b. 浏览器和 Web Worker 里面，self也指向顶层对象，但是 Node 没有self
// c. Node 里面，顶层对象是global，但其他环境都不支持。

// 同一段代码为了能够在各种环境，都能取到顶层对象，现在一般是使用this关键字，但是有局限性。
// a. 全局环境中，this会返回顶层对象。但是，Node.js 模块中this返回的是当前模块，ES6 模块中this返回的是undefined。
// b. 函数里面的this，如果函数不是作为对象的方法运行，而是单纯作为函数运行，this会指向顶层对象。但是，严格模式下，这时this会返回undefined。
// c. 不管是严格模式，还是普通模式，new Function('return this')()，总是会返回全局对象。但是，如果浏览器用了 CSP（Content Security Policy，内容安全策略），那么eval、new Function这些方法都可能无法使用

// // 下面是两种勉强可以使用的在所有情况下，都取到顶层对象的方法
// // a.
// typeof window !== 'undefined'
//   ? window
//   : typeof global === 'object' &&
//     typeof process === 'object' &&
//     typeof require === 'function'
//   ? global
//   : this;

// // b
// var getGlobal = function () {
//   if (typeof self !== 'undefined') {
//     return self;
//   }
//   if (typeof window !== 'undefined') {
//     return window;
//   }
//   if (typeof global !== 'undefined') {
//     return global;
//   }
//   throw new Error('unable to locate global object');
// };

// for (let i = 0; i < 1; i++) {
//   console.log(i);

//   fn();

//   // if (true)
//   function fn() {
//     console.log('fn');
//   }
// }

// if (true) {
//   fn();

//   // if (true)
//   function fn() {
//     console.log('fn');
//   }
// }

(function () {
  console.info(a);

  if (false) {
    let a = 5;
    function fn() {
      console.log('fn inside');
    }
  }
})();

// console.log(a);

// (var a = 1);
