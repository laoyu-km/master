/**
 * 原型：
 */

// prototype
// prototype其实是function对象的一个属性
// prtotype 也是一个对象

// // 示例 1
// function Handphone(color, brand) {
//     this.color = color;
//     this.brand = brand;
//     // this.screen = '18:9';
//     // this.system = 'Android'
// }
// // 为什么把方法和不需传参的属性写入prototype，部分需要传参的属性才写到构造函数里
// // 因为写入prototype的属性和方法能被这个构造函数的所有实例继承；
// Handphone.prototype.rom = '64G';
// Handphone.prototype.ram = '6G';
// Handphone.prototype.screen = '16:9';
// Handphone.system = 'Android'

// // prototype其实是定义构造函数构造出的每个对象的公共祖先 -> 原型
// // 所有被同一构造函数构造出的对象都可以继承原型上的属性和方法
// // this上面有的属性是不会去找原型的同名属性的；
// var hp1 = new Handphone('red', '小米');
// var hp2 = new Handphone('black', '化为');
// console.log(hp1.rom);
// console.log(hp2.ram);
// console.log(h1.screen);
// console.log(h2.screen);


// // 示例 2
// function Test() {}

// Test.prototype.name = 'prototype';
// Test.prototype.age = '29';

// var test = new Test();
// test.num = 1;
// // 实例对象是无法增删改查prototype的属性或方法；
// //test.prototype.numa = 2; // TypeError: Cannot set property 'numa' of undefined
// delete test.name; // 删除不了prototype的name
// test.age = 18;
// console.log(Test.prototype, test);


// // 示例3
// function Handphone(color, brand, system) {
//     this.color = color;
//     this.brand = brand;
//     this.system = system;
// }
// // 对象方式写prototype,推荐写法
// Handphone.prototype = {
//     rom: '65G',
//     ram: '6G',
//     screen: '16:9',
//     call: function() {
//         console.log('I am calling somebody');
//     }
// }

// var hp1 = new Handphone('black', 'iPhone', 'IOS')
// console.log(hp1);
// // 原型上的constructor指向构造函数本身
// console.log(Handphone.prototype);


// // 示例4  
// function Telephone() {}

// function Handphone(color, brand, system) {
//     this.color = color;
//     this.brand = brand;
//     this.system = system;
// }

// // 原型上的constructor可以改变指向，
// // 本例改为指向Telelphone
// Handphone.prototype = {
//     constructor: Telephone
// }
// console.log(Handphone.prototype); // {constructor: ƒ}


// // 示例 5 __proto__
// function Car() {
//     /**
//      * __proto__
//      * 1. __proto__ 是健名，是实例对象用来存储prototype的容器
//      * 2. __proto__ 这种前后双下划线的写法说明这个键名是JS内置元素，不要改
//      * 3. __proto__ 在创建对象(实例化)时创建，是对象的一个属性
//      * 4. __proto__ 属性属于JS内置属性，不需要显示写出
//      * 5. __proto__ 属于对象， prototype属于构造函数
//      * 6. 示例：模拟写proto -> broto
//      */
//     this.__broto__ = Car.prototype
// }

// Car.prototype.name = 'Benz';
// Car.prototype.age = 18;
// Car.prototype.eat = function() {
//     console.log('eat');
// }

// var car = new Car();
// console.log(car.__broto__); // __broto__: {name: "Benz", age: 18, eat: ƒ, constructor: ƒ}
// console.log(car.__broto__ === car.__proto__); //true
// // __proto__当中的constructor默认指向的是构造函数本身
// // 告诉实例构造器构造的实例是用的哪个构造函数
// console.log(car.__broto__.constructor);


// // 示例 6 修改 __proto__ 的值
// function Person() {
//     // __proto__ = Person.prototype;
// }
// Person.prototype.name = '张三';

// var p1 = {
//     name: '李四'
// }

// var person = new Person();

// console.log(person.name); //张三
// person.__proto__ = p1;
// console.log(person.name); //李四
// console.log(person.__proto__);


// // 考题1 问结果是什么？
// function Car() {}
// Car.prototype.name = 'Benz';
// var car = new Car();

// // __proto__ = Car.prototype 是引用赋值
// // 所以当prototype内的值改变时，__proto__内的值也跟着改变
// // 所以car.name == toyota
// Car.prototype.name = 'Toyota';
// console.log(car.name); //Toyota


// // 考题2 问结果是什么？
// Car.prototype.name = 'Benz';

// function Car() {}
// var car = new Car();

// Car.prototype.name = 'Toyota';
// console.log(car.name); //Toyota


// // 考题3 问结果是什么？
// Car.prototype.name = 'Benz';

// function Car() {}
// var car = new Car();

// // 实例化后重写prototype 相当于Car.prototype被另一个对象引用赋值
// // car.__proto__指向的prototype 与 重写的prototype 已经不是同一个引用
// // 所以这题中 car.name == 'Benz', 而不是 'Toyota'

// Car.prototype = {
//     name: 'Toyota'
// }

// console.log(car); // 'Benz'

// // 考题3扩展 -> JS 的属性修改和对象重写
// // 原理：我认为属性修改实在原有引用内进行的，a也指向原有引用，所以a也会跟着变
// //       对象重写，直接让obj指向了另外一个引用，而a还指向原来的引用，所以对象重写不影响a
// var obj = {
//     name: "obj123"
// }

// var a = obj;

// console.log(a.name); // obj123
// // 属性修改
// obj.name = '1122'
// console.log(a.name); // 1122 属性修改影响a.name

// //对象重写
// obj = {
//     name: '2233'
// }
// console.log(a.name); // obj123 对象重写后，a.name还是原来的值，没有变


// //window return
// // window.a 把 a 显示提升为了全局变量
// function abc() {
//     window.a = 30;
// }

// abc();

// console.log(a);


// // window return 实现闭包
// function test() {
//     var a = 1;

//     function add() {
//         a++;
//         console.log(a);
//     }
//     window.add = add;
// }

// test();
// add();
// add();
// add();

// // 闭包立即执行函数 1
// var add = (function() {
//     var a = 1;

//     function add() {
//         a++;
//         console.log(a);
//     }
//     return add;
// })();

// add();
// add();
// add();

// //闭包立即执行函数2
// (function() {
//     var a = 1;

//     function add() {
//         a++;
//         console.log(a);
//     }
//     window.add = add;
// })();

// add();
// add();
// add();

// // JS插件的写法 -> 闭包执行函数
// // 为什么这样写：防止变量污染
// (function() {

//     function Test() {

//     }

//     window.Test = Test;
// })();

// var test = new Test();



// // 为什么在立即执行函数前面加 ';'
// // 连续的两个立即执行函数不用分号分割会报错
// // 为了防止报错，所以在前面加分号

// (function() {})() //报错
// (function() {})() // 报错


//作业
// 写一个插件，任意传两个数字 ，调用插件内部方法可以进行加减乘除