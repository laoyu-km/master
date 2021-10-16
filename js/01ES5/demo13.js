// // 链式操作
// var sched = {
//     wakeup: function() {
//         console.log('Running');
//         return this;
//     },
//     morning: function() {
//         console.log('shopping');
//         return this;
//     },
//     noon: function() {
//         console.log("Having a rest");
//         return this;
//     },
//     afternoon: function() {
//         console.log('Studying');
//         return this;
//     },
//     evening: function() {
//         console.log('Walking');
//         return this;
//     },
//     night: function() {
//         console.log('Sleeping');
//         return this;
//     }
// }

// // 如何一次将sched的方法都执行
// // 在每个方法中加入return this

// sched.wakeup().morning().noon().afternoon().evening().night();


// =================================================
// // 对象的属性访问的 [] 方式
// // obj.name -> 实际是 obj['name'], JS自动转化
// var myLang = {
//     No1: 'Html',
//     No2: 'CSS',
//     No3: 'javascript',
//     myStudyingLang: function(num) {
//         console.log(this['No' + num]);

//     }
// }

// myLang.myStudyingLang(1);



// // =================================================
// // 对象枚举
// // js 没有真正意义的枚举
// // 有枚举 -> 就有遍历， 在JS中，有遍历就有枚举。

// var car = {
//     'brand': 'benz',
//     color: 'pink',
//     displacement: '3.0',
//     width: '2.5',
//     long: '5'
// }

// for (var key in car) {
//     console.log(key + ':' + car[key]);

//     // 报错原理
//     // car.key -> car['key']; car没有key这个属性
//     //console.log(car.key); // 报错, undefined
// }

// var arr = [1, 2, 3, 4, 5];
// for (var i in arr) {
//     console.log(i + ' : ' + arr[i])
// }

// var jay = {
//     // 键值加不加引号都不影响
//     'No1': 'Html',
//     'No2': 'CSSl',
//     'No3': 'javascript',
// }
// for (var key in jay) {
//     console.log(key + ' : ' + jay[key]);
// }



// // =================================================
// // hasOwnProperty 判断对象是否有某属性, 排除原型链属性

// // 示例 1
// var obj = {
//     name: 'jay',
//     age: 32
// }

// console.log(obj.hasOwnProperty(obj.name));

// // 示例 2
// function Car() {
//     this.brand = 'Benz';
//     this.color = 'red';
//     this.displacement = '3.0';
// }

// Car.prototype = {
//     lang: 5,
//     width: 2.5,
//     goFront: function() {
//         console.log('goFront');
//     }
// }

// Object.prototype.name = 'Object';

// var car = new Car();

// for (var key in car) {
//     // 会把原型链内的属性全部打印出来
//     //console.log(key + ':' + car[key]);

//     //使用hasOwnProperty() 就可以避免将全部原型链属性打印
//     if (car.hasOwnProperty(key)) {
//         console.log(key + ' : ' + car[key]);
//     }
// }


// // 判断对象是否有某属性的另一种方式
// var car = {
//     brand: 'Benz',
//     color: 'red'
// }

// // 实际是判断car['displacement'], 其中displacement必须打引号
// console.log('displacement' in car); //false

// // in 方法不排除原型链的上级属性
// function Car() {
//     this.brand = 'Benz';
//     this.color = 'red';
// }

// Car.prototype = {
//     displacement: '3.0'
// }

// var car = new Car();
// console.log('displacement' in car); // true



// // =================================================
// // instanceof -> A instanceof B
// // A 对象的原型里到底有没有B构造函数的原型

// function Car() {}
// var car = new Car();
// console.log(car instanceof Car);

// function Person() {}
// var p = new Person();

// console.log(p instanceof Car) // false
// console.log(car instanceof Object) // true
// console.log([] instanceof Array); // true
// console.log([] instanceof Object); // true



// =================================================
// // 判断a是数组还是对象的 3 中方法
// var a = [] || {};

// // 方法1
// console.log(a.constructor);

// // 方法 2
// console.log(a instanceof Array);

// // 方法 3 推荐使用
// // 在JS中，函数是对象的方法，如果一个函数不属于任何对象，那么它就是全局对象的方法
// // call 是属于函数的方法，call(a)的作用就是将下式中的this指向了a 
// Object.prototype = {
//     toString: function() {
//         console.log(typeof this);
//     }
// }

// // 接收数据时，判断数据的类型，尽可能用这种方法判断
// var str = Object.prototype.toString.call(a);
// if (str === '[object Array]') {
//     console.log('是数组');
// } else {
//     console.log('不是数组');
// }

// // 方法 3 变种
// var str = Object.prototype.toString;
// var trueTip = '[object Array]';
// if (str.call(a) === trueTip) {
//     console.log('是数组');
// } else {
//     console.log('不是数组');
// }


// // arr toString 方法的演示
// var arr = new Array(1, 2, 3);
// console.log(arr); // 1,2,3
// console.log(arr.toString()); // 1,2,3
// console.log(Object.prototype.toString.call(arr)); //[objec Array]



// =================================================
// // this
// // 函数内部的this指向
// /**
//  * AO = {
//  *   arguments: [1,2,3]
//  *   this:window
//  *   b: 123,
//  *   a: undefined
//  *   c: function c(){}
//  * }
//  */
// function test(b){
//     this.d = 3; // this.d =3  ==== d = 3 === window.d = 3
//     var a = 1;
//     function c (){}
// }

// test(123)

// console.log(this.d); // 此处this 是指向window


// // 构造函数的this
// function Test(){
//     this.name = '123';
// }

// /**

//  * GO = {
//  *   Test: function Test(){...}
//  *   test: {}
//  * }
//  * 
//  * 当执行 var test = new Test()时，在Test()中 var this
//  * var this = {
//  *   __proto__ : Test.prototype,
//  *   name = '123'
//  * }
//  * 所以构造函数Test调用时的AO如下
//  * 
//  * AO = {
//  *   this: {
//  *     name: '123',
//  *     __proto__: Test.prototype 
//  *   }
//  * }
//  * 最后将this 赋值给了全局的test
//  */
// var test = new Test();


// // call / apply 的 this 指向
// function Person(){
//     this.name = '张三';
//     this.age = 18
// }

// // 将Person的 this 指向了 Programmer
// function Programmer(){
//     Person.apply(this);
//     this.work = 'Programming'
// }

// var p = new Programmer();
// console.log(p);

/**
 * this总结
 * 全局this -> window
 * 预编译函数this -> window
 * apply / call 改变this指向
 * 构造函数的this指向实例化对象
 */


// ===================================================
// // callee / caller
// callee 是实参列表的一个属性
// function test(a, b, c) {
//     // callee 返回的是实参列表所对应的那个函数
//     console.log(arguments.callee); // 实参列表所对应的函数是 test, 所以返回test
//     console.log(arguments.callee.length); // 返回实参列表所对应的函数的形参长度
//     console.log(test.length); // 返回test的形参长度
//     console.log(arguments.length); // 返回 test 的实参长度
// }

// // callee 再哪个函数里调用就显示哪个函数
// function test1() {
//     console.log(arguments.callee);

//     function test2() {
//         console.log(arguments.callee);
//     }
//     test2();
// }
// test1();

// // 累加n位数
// // 普通递归
// function sum(n) {
//     if (n <= 1) {
//         return 1;
//     }
//     return n + sum(n - 1);
// }

// var res = sum(10);
// console.log(res);

// // callee 方法实现递归，立即执行函数
// var sum = (function(n) {
//     if (n <= 1) {
//         return 1;
//     }
//     return n + arguments.callee(n - 1);
// })(10);
// console.log(sum);

// // caller
// // caller 是function的一个属性，返回的是调用该函数的函数引用
// // 不常用
// test1();

// function test1() {
//     test2();
// }

// function test2() {
//     console.log(test2.caller);
// }

// test2();

// ============================================

// // 笔试面试题

// //1. 下面打印的是什么
// function foo() {
//     bar.apply(null, arguments);
// }

// function bar() {
//     console.log(arguments);
// }
// foo(1, 2, 3, 4, 5);

//2. JS的typeof可能返回的值有哪些
// object(null 也返回object) / boolean / function / undefined / number / string

// //3. 下面打印的是什么
// function b(x, y, a) {
//     arguments[2] = 10;
//     alert(a);
// }
// //4 下面打印的是什么
// b(1, 2, 3);

// function b(x, y, a) {
//     a = 10;
//     console.log(arguments[2]);
// }
// b(1, 2, 3);

// //5 下面打印的是什么
// var f = (
//     function f() {
//         return '1';
//     },
//     function g() {
//         return '2';
//     }
// );
// console.log(typeof(f)); // function

// //6 下面打印的是什么
// var f = (
//     function f() {
//         return '1';
//     },
//     function g() {
//         return '2';
//     }
// )();
// console.log(typeof(f)) //number

// //7 下面打印几个true
// console.log(undefined == null); //true 
// console.log(undefined === null); // false
// console.log(isNaN('100')); // false
// console.log(parseInt('1a') == 1); // true

// //8. 手写isNaN()
// function isNaN1(num) {
//     var res = Number(num) + ''; // NaN 不等于NaN
//     if (res == 'NaN') {
//         return true;
//     } else {
//         return false;
//     }
// }

// console.log(isNaN1('123'));


// //9. 空对象等于空对象吗，为什么不等，如何让其相等
// console.log({} == {});

// var obj = {};
// var obj1 = obj;
// console.log(obj == obj1)

// //10. 下面代码最终打印什么
// var a = '1';

// function test() {
//     var a = '2';
//     this.a = '3';
//     console.log(this.a);
//     console.log(a);
// }
// test(); //2
// new test(); //2
// console.log(a); //3


// //11 打印的是什么
// var a = 5;

// function test() {
//     a = 0;
//     console.log(a);
//     console.log(this.a);
//     var a;
//     console.log(a);
// }
// test();
// new test();

// 12 构造函数this的理解