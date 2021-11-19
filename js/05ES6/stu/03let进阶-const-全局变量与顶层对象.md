```javascript
// // let 的三大特性再说明
// console.log(i); {
//     let i = "a"; {
//         var i = "b"; // SyntaxError i has already been declared
//     }
//     console.log(i);
// }

// for (let j = 0; j < 10; j++) {
//     let j = 'a';
//     console.log(j); // 10个a
// }

// ==================================

// // 立即执行函数不会被预编译
// // 下式打印的顺序是 jayden alexis  -> 说明立即执行函数不会被预编译，因为加了小括号后，函数声明变为了表达式
// var a = 'jayden';
// console.log(a);
// (function() {
//     a = 'alexis';
//     console.log(a);
// })();


// // 闭包形参缓存 -> 形参也在函数的AO中, 与外部同名变量无关系
// var arr = [];
// var loop = function(i) { //形参 i 是在function作用于当中的
//     arr[i] = function() {
//         console.log(i);
//     }
// }

// for (var i = 0; i < 10; i++) {
//     loop(i);
// }

// for (var i = 0; i < 10; i++) {
//     arr[i]();
// }

// ==================================

// // 问题： let 会被放到AO 或者 GO 中吗？
// function test() {
//     console.log(a);
// }
// test(); //ReferenceError
// let a = 'jayden';

// var arr = [];
// for (let i = 0; i < 10; i++) {
//     arr[i] = function() {
//         console.log(i);
//     }
// }

// for (var k = 0; k < 10; k++) { arr[k](); }

// 函数声明提升是在当前的块级作用域下提升, 不会超过当前作用域

// // 情况, 同级声明报错
// {
//     let a = 1;

//     function a() { // syntaxError 'a' has already been declared
//         console.log(10);
//     }
//     console.log(a);
// }

// // 函数声明提升只在当前作用域下
// let a = 1; { //不会因重名报错
//     function a() {
//         console.log(10); // 10
//     }
// }
// console.log(a); // 1

// (
//     function test() {
//         console.log('a');
//     }
// )
// test(); // ReferenceError test is note defined

// // 如何解决函数只在当前作用域下提升的问题 -> 函数表达式
// {
//     var test = function() {
//         console.log('a');
//     }
// }
// test(); // a

// ==================================

// // const 定义常量 -> 不可变的量
// // const 定义常量时必须赋值,否则报错
// const a; // 报错

// // const 定义常量值不能更改

// // const 有块级作用域，不能够提升，也存在暂时性死区
// {
//     const a = 12;
//     console.log(a); // 12
// }
// console.log(a); //error

// // const 与 let 一样不能重复声明
// {
//     const a = 12;
//     let a = 10; //error
// }

// // const 存取引用值
// // 只能保证存取的地址(指针)不变， 不能保证指针所指向的堆内的数据不变
// const obj = {};
// obj.name = 'zhangsan';
// console.log(obj.name);

// ==================================

// // 如何解决const存取引用值的问题 
// // 方式1 冻结 Object.freeze();
// // freeze() 是Object的constrator的一个方法，查看方法console.log(Object.prototype);
// // freeze() 的使用方法 -> Object.freeze(要冻结的对象)
// // 浅冻结
// const arr = [];
// Object.freeze(arr);
// arr[2] = 'zhangsan';
// console.log(arr[2]);

// // 深冻结
// function myFreeze(obj) {
//     Object.freeze(obj);
//     for (var key in obj) {
//         if (typeof(obj[key]) === 'object' && obj[key] !== null) {
//             Object.freeze(obj[key]);
//         }
//     }
// }

// const person = {
//     son: {
//         age: 18,
//         name: 'jayden'
//     },
//     car: ['benz', 'toyota', 'audi']
// }
// myFreeze(person);
// person.son.sex = 'female';
// person.car[3] = 'BMW';

// console.log(person);

// 方法2 在定义模块时，在最后一步 return出一个构造器实例化出来的对象
// 方法1 很少使用，主要使用方法2

// ==================================

// // ES5的败笔 未申明的变量不报错，而是被顶层对象默认列为自己的属性
// b = 1;
// console.log(b);
// console.log(window.b);

// //ES6 规定  -> 为解决上面的问题
// //function var 定义的变量和函数可以成为顶层对象的属性
// //let const class 定义的变量和函数不能成为顶层对象的属性
// let a = 'b';
// console.log('a = ' + window.a); // undefined

// 不同环境下，顶层对象不同
// 浏览器环境下 -> 顶层对象 -> window
// node环境下 -> 顶层对象 -> global
//console.log(global);
```