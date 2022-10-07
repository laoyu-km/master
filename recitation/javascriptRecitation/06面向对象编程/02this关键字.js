// this

/**
 * 涵义
 *
 * 1. 但不管是什么场合，this都有一个共同点：它总是返回一个对象。
 * 2. this就是属性或方法“当前”所在的对象。
 * 3. 由于对象的属性可以赋给另一个对象，所以属性所在的当前对象是可变的，即this的指向是可变的
 *
 * 总结： JavaScript 语言之中，一切皆对象，运行环境也是对象，所以函数都是在某个对象之中运行，this就是函数运行时所在的对象（环境）
 *
 */

/**
 * 实质
 * 1. var obj = { foo: 5 } JavaScript 引擎会先在内存里面，生成一个对象{ foo: 5 }，然后把这个对象的内存地址赋值给变量obj。也就是说，变量obj是一个地址（reference）
 * 2. 原始的对象以字典结构保存，每一个属性名都对应一个属性描述对象, foo属性的值保存在属性描述对象的value属性里面
 * 3. 如果属性值是一个函数 -> 引擎会将函数单独保存在内存中，然后再将函数的地址赋值给foo属性的value属性。
 * 4. 由于函数是一个单独的值，所以它可以在不同的环境（上下文）执行
 * 5. 由于函数可以在不同的运行环境执行，所以需要有一种机制，能够在函数体内部获得当前的运行环境（context）。所以，this就出现了
 * 6. this的设计目的就是在函数体内部，指代函数当前的运行环境
 *
 */

/**
 * this 的指向
 *
 * 1. 默认： 全局对象
 * 2. 对象方法的this: 当前对象
 * 3. 构造函数： this指向构造函数实例
 * 4. this改变方法： call, apply, bind
 */

// call
// 1. 函数实例的call方法，可以指定函数内部this的指向（即函数执行时所在的作用域），然后在所指定的作用域中，调用该函数。
// 2. call方法的参数，应该是一个对象。如果参数为空、null和undefined，则默认传入全局对象。
// 3. 如果call方法的参数是一个原始值，那么这个原始值会自动转成对应的包装对象，然后传入call方法
// 4. call的第一个参数就是this所要指向的那个对象，后面的参数则是函数调用时所需的参数。

// apply
// 1. apply方法的作用与call方法类似,唯一的区别就是，它接收一个数组作为函数执行时的参数
// 2. 应用

// // 找出数组最大元素
// var a = [10, 2, 4, 15, 9];
// Math.max.apply(null, a);

// // 将数组的空元素变为undefined
// Array.apply(null, ['a', , 'b']);

// // 转换类似数组的对象, 对象必须有length属性
// Array.prototype.slice.apply({ 0: 1, length: 1 }); // [1]
// Array.prototype.slice.apply({ 0: 1 }); // []

// // 绑定回调函数的对象
// var o = {
//   f: function () {
//     console.log(this === o);
//   },
// };

// function fun() {
//   // o.f.apply(o);
//   o.f.call(o);
// }
// document.querySelector('.fonttest').onclick = fun;

// bind
// 1. bind()方法用于将函数体内的this绑定到某个对象，然后返回一个新函数。
// 2. 如果bind()方法的第一个参数是null或undefined，等于将this绑定到全局对象，函数运行时this指向顶层对象（浏览器为window）
// 3. 每一次返回一个新函数
// 4. 结合回调函数使用 -> oDiv.addEventListener('click', clickHandler.bind(null, ...args));
// var counter = {
//   count: 0,
//   inc: function () {
//     // 'use strict';
//     this.count++;
//   },
// };

// function callIt(callback) {
//   callback();
// }

// var count = 100;

// callIt(counter.inc);

// console.log(counter.count); // 0
// console.log(count); // 101

// callIt(counter.inc.bind(counter));
// console.log(counter.count); // 1
// console.log(count); // 101

// var obj = {
//   name: 'jayden',
//   times: [1, 2, 3],
//   print: function () {
//     this.times.forEach(
//       function (n) {
//         console.log(this.name);
//       }.bind(this)
//     );
//   },
// };

// obj.print();

// 结合call()方法使用
// var slice = Function.prototype.call.bind(Array.prototype.slice);
// console.log(slice([1, 2, 3], 0, 1));

// function f() {
//   console.log(this.v);
// }

// var o = { v: 123 };
// var bind = Function.prototype.call.bind(Function.prototype.bind);
// bind(f, o)(); // 123
