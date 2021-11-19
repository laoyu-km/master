```javascript
// // 形参问题
// 1 函数参数给了默认值，形参length受到影响，只能计到有默认值的形参之前，如果第一个形参就给了默认值，length为0
// function test(a, b, c = 1, d, e) {}
// test();
// console.log(test.length); // 2 -> length 因为参数给了默认值受到了影响

// // 2 形参给了默认值，就取消了于实参的映射关系
// function test(a, b, c = 1, d, e) {
//     arguments[1] = 7;
//     console.log(b); // 2
//     console.log(arguments); // [Arguments] { '0': 1, '1': 7, '2': 3, '3': 4, '4': 5, '5': 6 }
// }
// test(1, 2, 3, 4, 5, 6);

//=========================================

// // undefined 没有包装类的解决
// // 问题描述：下式中 foo() 报错 ,如何解决
// function foo({ x, y = 5 }) {
//     console.log(x, y);
// }
// foo({}) // undefined 5
// foo({ x: 1 }) // 1 5
// foo({ x: 1, y: 2 }) //1 2
// foo() // 报错
// // 问题原因：undefined 没有包装类，转换不了，解构匹配时 = 号两边模式不一样
// // 解决办法， 给参数默认值
// function foo({ x, y = 5 } = {}) {
//     console.log(x, y);
// }
// foo(); // undefined 5

// // Ajax 请求的解构赋值, 报错
// function fetch(url, { body = "", method = "GET", header = {} }) {
//     console.log(method);
// }
// fetch('http://www.baidu.com'); // 报错， undefined 没有包装类
// // 解决办法
// function fetch(url, { body = "", method = "GET", header = {} } = {}) {
//     console.log(method);
// }
// fetch('https://www.baidu.com');

//=========================================

// // 默认值作用域问题
// // 全局下情况
// // 1 var
// // var x = x;
// // console.log(x); // undefined

// // 2 let
// // 报错原因：
// // let 定义的变量 预编译时不提升，直接在执行时执行 let x = x
// // 语句执行时从右到左，所以 先执行 x = x, 此时 = 号右边的x还没有声明，就被使用，所以报错
// // undefined 与ReferenceError的区别，undefined 声明了未赋值，后一个连声明都没做
// let x = x;
// console.log(x); //ReferenceError: Cannot access 'x' before initialization 

// // 函数形参出现let x = x 
// var x = 1;

// function foo(x = x) {

// }
// foo(); //ReferenceError: Cannot access 'x' before initialization

// 参数默认值如果是函数 会多出一个作用域
// 调用栈：函数在执行的前一刻，会创建一个活动记录，记录当前函数式在哪个地方被调用搞得，这个记录是一个栈 -> Call Stack
// 如何查看调用栈：google chrome 调试工具，在foo(); 处打断点
// 使用调试工具还可以实时查看AO和GO 
// 参数是单独作用域Local, 函数体作用域是Block

// // 下式打印的是什么
// var x = 1;

// function foo(x, y = function() { //y函数的作用域应该与函数体作用域是同级
//     x = 2; // 
//     console.log(x) // 2 这里的 x 是形参x, 因为参数小括号内，是单独的一个作用域
// }) {
//     var x = 3;
//     y();
//     console.log(x); // 3
// }
// foo();
// console.log(x) //1

// // 证明形参是一个函数的时候，这个函数与函数体是同级
// var x = 1;
// function foo(x, y = function() { x = 2; console.log(x) }) {
//     y(); //2
//     console.log(x); //2
// }
// foo();
// console.log(x); //1

// // 变为 var x = 2 后
// var x = 1;

// function foo(x, y = function() {
//     var x = 2;
//     console.log(x)
// }) {
//     y(); //2
//     console.log(x); // undefined
// }
// foo();
// console.log(x); // 1

// // 函数体内在对x 赋值，改变的是形参x
// var x = 1

// function foo(x, y = function() {
//     x = 2;
//     console.log(x)
// }) {
//     y();
//     x = 3;
//     console.log(x);
// }
// foo(); // 2 3
// console.log(x); // 1


// // this 指向
// // 1. 默认绑定规则：function 中的this 默认指向最顶层对象，如果用'use strict' 则指向为undefined
// function foo() {
//     console.log(this);
// }
// foo(); // window -> 浏览器下

// function foo() {
//     'use strict'
//     console.log(this);
// }
// foo(); // undefined

// // 2. 隐式绑定， 谁调用 指向谁
// function foo() {
//     console.log(this.a);
// }
// var obj = {
//     a: 2,
//     foo: foo
// }
// obj.foo(); // 2

// function foo() {
//     console.log(this.a);
// }
// var obj = {
//     a: 2,
//     foo
// }

// var bar = obj.foo;
// //window.bar() 下面是window来调用bar,所以this指向了window
// bar(); // undefined

// 3 显示绑定： call(obj,a,b,c), apply(obj,[a,b,c]), bind(obj,a,b,c)->bind 是函数体本身

// 4 new 方式

// new > 显示绑定 > 隐式绑定 > 默认绑定

//=========================================

// // 箭头函数 =>
// // 使用
// // 基本形式 () => {}, 当参数只有一个时 () 可以省掉，当语句只有return一句时，{} 可以省掉
// var f = a => a;
// // 上式相当于下式
// var f = function(a) {
//     return a;
// }

// // 参数不是一个的时候
// // 只有一个参数
// var f = () => 5 // 无参，return 5

// // 参数不是一个的情况
// let f = (a, b) => a + b;
// console.log(f(1, 2)); // 3

// // 执行语句多条时
// let f = (a, b) => {
//         var a = 3;
//         var b = 4;
//         console.log(a + b);
//     }
//     // 箭头函数默认return也是undefined
// console.log(f(5, 6)) // 7 undefined

// // // 箭头函数能和变量的解构赋值相使用
// // const full = ({ first, last } = {}) => first + ' ' + last;
// // console.log(full({ first: "jayden", last: 'alexis' })); //jayden alexis

// var arr = [12321, 31, 23, 1, 4, 124, 32, 5, 3456, 3];

// var arr1 = arr.sort((a, b) => a - b);
// console.log(arr1) //(10) [1, 3, 4, 5, 23, 31, 32, 124, 3456, 12321]


// // 箭头函数, 不是用fucntion定义的函数，所以没有arguments属性
// // 箭头函数 和 function 是两种不同的函数声明方法，有很多区别
// // 箭头函数声明函数用的是胖箭头
// var sum = (a, b) => {
//         console.log(arguments);
//         return a + b;

//     }
//     // 没有arguments
// console.log(sum()); //ReferenceError: arguments is not defined


// // ... -> rest 运算符 -> 也叫 spread 运算符 用来展开或是收集
// // rest 运算符的使用
// var sum = (...args) => {
//     console.log(args);
//     console.log(args[0] + args[1]);
// }

// sum(1, 2); //[1,2] 3

// // rest 运算符的本质是展开和收集
// function foo(x, y, z) {
//     console.log(x, y, z)
// }
// foo(...[1, 2, 3]); // 1 2 3 -> rest运算符展开了数组[1,2,3]
// foo(...[1, 2, 3, 4, 5]); // 1 2 3
// foo(...[1, 2]); // 1 2 undefined
// // ES5 实现 rest运算符的效果
// null 和 undefined 能使call 和 apply 改变this 指向功能失效
// foo.apply(null, [1, 2, 3]); // 1 2 3
// foo.apply(undefined, [1,2,3,4,5]); // 1 2 3

// // 在别的上下文中 reset运算符的展开
// let a = [1, 3, 4];
// let b = [1, ...a, 5];
// console.log(b); //[ 1, 1, 3, 4, 5 ]
// console.log([1].concat(a, [5])); //[ 1, 1, 3, 4, 5 ]


// // reset运算符的收集
// let = fn = (a, b, ...c) => { // rest运算符收集必须是最后一个参数, 收集为数组
//     console.log(a, b, c);
// }
// fn(1, 2, 3, 4, 5, 6, 7); // 1 2 [ 3, 4, 5, 6, 7 ]

// let fn = (a, ...b, c) => {
//     console.log(a, b, c);
// }
// fn(1, 2, 3, 4, 5, 6); // SyntaxError: Rest parameter must be last formal parameter


// // 箭头函数排序
// // ES 5 方法
// function sortNum() {
//     return Array.prototype.slice.call(arguments).sort(function(a, b) {
//         return a - b;
//     })
// }
// console.log(sortNum(12, 34, 5556, 8878, 434, 99, 9988)); //(7) [12, 34, 99, 434, 5556, 8878, 9988]

// // ES6 方法
// const sortNum = (...args) => args.sort((a, b) => a - b);
// console.log(sortNum(12, 34, 5556, 8878, 434, 99, 9988)); //(7) [12, 34, 99, 434, 5556, 8878, 9988]

// // rest运算符 能够返回length吗
// console.log((function(a) {}).length); //1
// // reset运算符不能影响形参，形参还是按照function的方式，一有初始化形参的length就不准确了,并且与实参之间没有了关联
// console.log((function(b, c, d = 10, ...a) {}).length); //2
// console.log((function(b = 5, c, d = 10, ...a) {}).length); //0

// // 练习 下面打印的是什么
// function e(num) {
//     var num;
//     console.log(num);
//     num = 10;
// }
// e(100);

//=========================================

// // js function 形参解析
// // 通过Chrome的开发者工具进行
// // 1 无参数
// function foo() {
//     var x = 1;
//     var y = 2;
//     console.log(x, y);
// }
// foo();
// //foo 开始执行时 AO情况
// Local {
// this: Window
// x: undefined
// y: undefined
// }
// Global

// // 2 有参数无初始化
// function foo(x, y) {
//     var x = 1;
//     var y = 2;
//     console.log(x, y);
// }
// foo();
// //foo 开始执行时 AO情况, 无变化
// Local {
// this: Window
// x: undefined
// y: undefined
// }
// Global


// // 3 有参数且初始化(任何一个都行)
// function foo(x = 3, y = 4) {
//     var x = 1;
//     var y = 2;
//     console.log(x, y);
// }
// foo();
// // //foo 开始执行时 AO情况
// Block {
//     x: 3
//     y: 4
// }
// Local {
//     this: Window
//     x: 3
//     y: 4
// }
// Global

// // //foo 执行到var y = 2 时的 AO情况
// Block {
//     x: 1
//     y: 2
// }
// Local {
//     this: Window
//     x: 3
//     y: 4
// }
// Global


// // 4 函数有形参，且初始化，函数体内无 var
// function foo(x = 3, y = 5) {
//     x = 1;
//     y = 2;
//     console.log(x, y);
// }
// foo();
// //foo 开始执行时 AO情况
// Local {
//     this: Window
//     x: 3
//     y: 5
// }
// Global

// // foo 执行到y = 2时的 AO情况
// Local {
//     this: Window
//     x: 1
//     y: 2
// }
// Global

// // 5 函数有形参且初始化，函数体内声明了其他变量
// function foo(x = 3, y = 5) {
//     var z = 10;

//     function i() {
//         console.log(z);
//     }
//     i();
//     console.log(x, y, z);
// }
// foo();
// // //foo 开始执行时 AO情况
// Block {
//     z: undefined
// }
// Local {
//     this: Window
//     x: 3
//     y: 5
// }
// Global
/**
 * 总结
 * 1. 函数无参数 || 有参数无初始化 || 有参数且初始化但是函数体内部没有声明重名变量 -> AO 只创建一个作用域local
 * 2. 如果函数有参数且初始化，且函数体内有变量声明(无论重不重名) -> 函数执行时就会多个作用域 block，此时block内是函数体内声明的变量，如果与参数重名则等于函数参数初始化值，参数还是在local内
 * 3. 也就是说只要参数初始化，且函数体内有变量声明，就会多一个作用域，放函数体内声明的变量
 */


// // 函数内部函数声明的提升
// 1 函数体内没调用或返回x
// function foo() {
//     var a = 'alexis'

//     function x() {
//         console.log('a')
//     }
// }
// foo();
// // foo() 调用是的AO
// Local{
// a: undefined
// this: Window
// }
// Global

// 2 函数体内调用或返回了x
// function foo() {
//     x();
//     var a = 'alexis'
//     function x() {
//         console.log('a')
//     }
// }
// foo();
// // foo() 调用是的AO
// Local{
// a: undefined
// this: Window
// x: f(){}
// }
// Global
/**
 * 总结
 * 1. 在函数体内声明的函数，如果不调用，在AO里不体现
 * 2. 在Global下声明的函数，在Global加载时就出现在GO里了
 */
```