// // 模块化开发和插件开发
// // 模块化开发
// // 模块化开发做到：各模块有自己的独立空间，防止变量被污染，并且能够被随时调用
// // 模块化开发调用示例-》加载就调用
// // window.onload 让也在时就能调用函数
// window.onload = function() {
//     init();
// }

// function init() {
//     console.log(iniFb(10));
//     console.log(iniDiv(100));
// }
// // 模块化开发
// var iniFb = (function() {
//     function fb(n) {
//         if (n == 0) {
//             return 0;
//         }
//         if (n <= 2) {
//             return 1;
//         }
//         return fb(n - 1) + fb(n - 2);
//     }
//     return fb;
// })();

// var iniDiv = (function() {
//     function div(n) {
//         var arr = [];
//         for (var i = 0; i <= n; i++) {
//             if (i % 3 == 0 || i % 5 == 0 || i % 7 == 0) {
//                 arr.push(i);
//             }
//         }
//         return arr;
//     }
//     return div;
// })();

// // 插件開發: 启动立即执行，不需要手动调用
// // 插件开发同样开辟一个独立空间
// // 模塊化開發其實就是插件的異類
// ;
// (function() {
//     var Test = function() {

//     }

//     Test.prototype = {

//     }
//     window.Test = Test;
// })();

// // 插件开发的手动调用
// // 这种写法，chajian函数至少需要被调用一次
// var chajian = (function() {
//     var Test1 = function() {

//     }
//     Test1.prototype = {

//     }
//     return Test1;
// })();

// ================================================================

// 三目运算符
// 第一种写法
// var a = 5;
// //a > 0 ? console.log('大于0') : console.log('小于等于0');
// // 分段写法 , 方便写注释
// a > 0 ? console.log('大于0') :
//     console.log('小于等于0');

// // 第二种写法, 三木运算带return
// var a = 5;
// // var str = '';
// // a > 0 ? str = '> 0' :
// //     str = '< 0';
// var str = a > 0 ? '> 0' : '< 0'; //return '>0'

// // 第三种写法
// // 嵌套写法
// var a = 5;
// str = a > 0 ? (a > 3 ? '> 3' : '< 3') : '< 0';

// console.log(str);

// // 笔试题 
// // No.1 请问str打印的时什么
// var str = 89 > 9 ? ('89' > '9' ? '通过了' : '内层未通过') :
//     '外层通过了';

// console.log(str); //'内层未通过'

// // No.2 下面打印的是什么
// function bar() {
//     console.log(myName)
// }
// function foo() {
//     var myName = "长歌"
//     bar()
// }
// var myName = "月落"
// foo()

// // No.3 下面打印的是什么
// function bar() {
//     console.log(this.myName)
// }

// function foo() {
//     var myName = "长歌"
//     this.myName = 'test';
//     bar()
//     return myName;
// }
// bar(); // undefined
// var myName = "月落"
// bar.call(); // 月落
// bar.call(foo); // undefined
// foo() // test

// ================================================================
// 深拷贝 / 浅拷贝

// // 多变量指向同一个地址, 不是clone
// var person1 = {
//     name: 'jayden',
//     age: 18,
//     sex: 'male',
//     height: 180,
//     weight: 140
// }

// var person2 = person1;
// person2.name = 'alexis';
// console.log(person1, person2); // person1.name 被改变, 因为person1 和 person2 存储的时同一个引用类型的地址

// //浅拷贝
// var person1 = {
//     name: 'jayden',
//     age: 18,
//     sex: 'male',
//     height: 180,
//     weight: 140
// }

// var person2 = {}; // 新建空对象，通过循环将person1 的属性和值clone到person2
// person2 = clone(person1, person2);

// person2.name = 'alexis';
// console.log(person1, person2);

// function clone(origin, target) {
//     var tar = target || {};
//     for (var key in origin) {
//         if (origin.hasOwnProperty(key)) {
//             tar[key] = origin[key];
//         }
//     }
//     return tar;
// }

// // 浅拷贝存在的问题, 对象内的对象还是地址复制
// Object.prototype.number = 1;
// var person1 = {
//     name: 'jayden',
//     age: 18,
//     sex: 'male',
//     height: 180,
//     weight: 140,
//     daughter: {
//         first: 'foxxx',
//         second: 'wicky',
//         third: 'white'
//     }
// }

// var person2 = {};
// person2 = clone(person1, person2);

// person2.name = 'alexis';
// person2.daughter.first = 'ella';
// console.log(person1, person2); //当前对象拷贝成功，但是内部对象daughter存在相同地址指向的问题

// function clone(origin, target) {
//     var tar = target || {};
//     for (var key in origin) {
//         if (origin.hasOwnProperty(key)) { // 不使用hasOwnProperty会把自定义的所有原型属性都打印出来
//             tar[key] = origin[key];
//         }
//     }
//     return tar;
// }

// // 深拷贝
// Object.prototype.number = 1;
// var person1 = {
//     name: 'jayden',
//     age: 18,
//     sex: 'male',
//     height: 180,
//     weight: 140,
//     daughter: {
//         first: {
//             name: 'foxxx',
//             age: 17
//         },
//         second: {
//             name: 'wicky',
//             age: 18
//         },
//         third: {
//             name: 'white',
//             age: 19
//         }
//     },
//     car: ['Benz', 'toyota']
// }

// var person2 = {};
// person2 = deepClone(person1, person2);

// person2.name = 'alexis';
// person2.daughter.first.name = 'ella';
// person2.daughter.fouth = {
//     name: 'febra',
//     age: 17
// }
// person2.car[1] = 'bmw';
// console.log(person1, person2);

// function deepClone(origin, target) {
//     var tar = target || {},
//         toStr = Object.prototype.toString;
//     arrType = '[object Array]';

//     for (var key in origin) {
//         if (origin.hasOwnProperty(key)) {
//             if (typeof(origin[key]) === 'object' && origin[key] !== null) {
//                 if (toStr.call(origin[key] === arrType)) {
//                     tar[key] = [];
//                 } else {
//                     tar[key] = {};
//                 }
//                 deepClone(origin[key], tar[key]);
//             } else {
//                 tar[key] = origin[key];
//             }
//         }
//     }
//     return tar;
// }

// // 深拷贝第二种方法, JSON 方法
// var person1 = {
//     name: 'jayden',
//     age: 18,
//     sex: 'male',
//     height: 180,
//     weight: 140,
//     daughter: {
//         first: {
//             name: 'foxxx',
//             age: 17
//         },
//         second: {
//             name: 'wicky',
//             age: 18
//         },
//         third: {
//             name: 'white',
//             age: 19
//         }
//     },
//     car: ['Benz', 'toyota']
// }

// var str = JSON.stringify(person1); // JSON.stringify 将person1 转化位json格式的字符串
// var person2 = JSON.parse(str); // 再通过JSON.parse 方法将字符串转换为对象，这时的对象是一个新的对象。

// person2.name = 'alexis';
// person2.daughter.first.name = 'ella';
// person2.daughter.fouth = {
//     name: 'febra',
//     age: 17
// }
// person2.car[1] = 'bmw';
// console.log(person1, person2);

// ================================================================

// // 笔试题
// // No.1 打印什么
// // type of a , 对象底下没有的属性才报undefined
// function test() {
//     console.log(foo); // undefined
//     var foo = 2;
//     console.log(foo); //2
//     console.log(a); // referenceError 不是报undefined，只有type of a 或者对象底下没有的属性才报undefined
// }
// test();

// // No.2 打印什么
// function a() {
//     var test;
//     test();

//     function test() {
//         console.log(1);
//     }
// }
// a();

// // No.3 打印的是什么
// var name = '222';
// var a = {
//     name: '111',
//     say: function() {
//         console.log(this.name);
//     }
// }
// var fun = a.say;
// fun(); //222
// a.say(); //111
// var b = {
//     name: '333',
//     say: function(fun) {
//         fun();
//     }
// }
// b.say(a.say);
// b.say = a.say;
// b.say();

// // No.4
// function test() {
//     var marty = {
//         name: 'marty',
//         printName: function() {
//             console.log(this.name);
//         }
//     }

//     var test1 = {
//         name: 'test1'
//     }
//     var test2 = {
//         name: 'test2'
//     }
//     var test3 = {
//         name: 'test3'
//     }

//     test3.printName = marty.printName;
//     marty.printName.call(test1); // test1
//     marty.printName.apply(test2); //test2
//     marty.printName(); //marty
//     test3.printName(); // marty
// }
// test();

// // No.5
// var bar = {
//     a: '1'
// };

// function test() {
//     bar.a = 'a';
//     Object.prototype.b = 'b';
//     return function inner() {
//         console.log(bar.a);
//         console.log(bar.b);
//     }
// }
// test()(); //a ,b

// ================================================================
// // 作业
// // No.2 打印出的结果是什么
// function Foo() {
//     getName = function() {
//         console.log(1);
//     }
//     return this;
// }

// Foo.getName = function() {
//     console.log(2);
// }

// Foo.prototype.getName = function() {
//     console.log(3);
// }

// var getName = function() {
//     console.log(4);
// }

// function getName() {
//     console.log(5);
// }

// Foo.getName(); //2
// getName(); //4
// Foo().getName(); //1
// getName(); //1
// new Foo.getName(); //2 .的优先级比new大 new 了一个数字没意义
// new Foo().getName(); // 3 带()时，new Foo()先执行
// new new Foo().getName(); //3 //第一个new没意义

// // No.2 请用window.prompt 接收用户输入的年份，判断是否是闰年，请用三目运算来做