// // class
// // ES5 定义构造函数
// function Person(name, age) {
//     this.name = name;
//     this.age = age;
// }

// Person.prototype.say = function() {
//     console.log(`my name is ${this.name}, my age is ${this.age}`);
// }

// // 新的定义方法
// Object.assign(Person.prototype, {
//     eat: function() {
//         console.log('I can eat');
//     },
//     drink: function() {
//         console.log('I can drink');
//     }
// });

// // ES5 的定义方法是可枚举的
// console.log(Object.keys(Person.prototype)); //["say", "eat", "drink"]

// new Person('jayden', 30).say();
// // 打印原型
// var person = new Person('jayden', 30);
// console.log(Object.getPrototypeOf(person))

// // 原型中的构造器就是构造函数本身
// console.log(Object.getPrototypeOf(person).constructor === Person); //true

// // 原型的两种获取方式
// console.log(Person.prototype === Object.getPrototypeOf(person)); //true

// ======================================

// ES6 的构造函数 class
// class: 类，在 js 中 class 是一个语法糖，不是真正的类 , 是模拟了构造函数

// // class 创建的类,默认有一个constructor，什么都不写也能new成功
// // 示例
// class Person {};
// console.log(new Person()); //Person {}

// // class this 指向
// // 与构造函数相同
// class Person1 {
//     constructor() {}
// }
// console.log(new Person1() instanceof Person1); //true

// class Person2 {
//     constructor() {
//         return Object.create(null);
//     }
// }
// console.log(new Person2() instanceof Person2); //false

// // 表达式声明class
// let Person = class {
//     say() {
//         console.log(1);
//     }
// }
// new Person().say(); //1

// // 立即执行 class
// // 必须通过 new 的方式执行 class
// let Person = new(class { // 不写new 就报错
//     say() {
//         console.log(1);
//     }
// })();
// Person.say(); //1

// // class 是否提升, 否， 存在暂时性死区
// console.log(new Person());
// class Person {} // 报错

// // 属性
// const eat = Symbol();
// class Person {
//     constructor() {}
//     say() {
//         console.log(1);
//     }
//     a = 1; // ES2017新规，在constructor()外定义的属性也被当做私有属性处理, 也就是说通过class可以定义共有方法，不可以定义共有属性

//     // 设置私有方法 1
//     [eat]() {
//         console.log(2);
//     }

//     drink(baz) {
//         children.call(this, baz);
//     }
// }
// // 设置私有方法2
// function children(baz) {
//     return this.bar = baz;
// }
// console.log(new Person); //Person {a: 1}

// // 静态方法, 静态属性
// // static 只在class内有效
// class Person {
//     static a = 'jayden'; // 静态属性，建议不要这样用
//     static b() {
//         console.log(1);
//     }
// }

// console.log(Person.a); // jayden -> ES7后才支持，ES6时是不支持静态属性的
// console.log(Person.b()); // 1
// console.log(new Person().b()); //TypeError: (intermediate value).b is not a function

// // class 的存值函数和取值函数
// // // 对象的取值函数和存值函数
// // var obj = {
// //     get a(){
// //         console.log(1);
// //     },
// //     set b(value){
// //         console.log(2);
// //     }
// // }

// // class 也有取值函数和存值函数
// class Person {
//     constructor() {}
//     get a() {
//         console.log(1);
//     }
//     set b(value) {
//         console.log(2);
//     }
// }
// let person = new Person();
// person.a; //1
// person.b = 5; //2

// class内部默认就是严格模式

// //
// class Person {
//     constructor(name = 'jayden', age = 30) {
//             // 实例化的属性配置： 私有属性
//             this.name = name;
//             this.age = age;
//         }
//         //
//     say() {
//         console.log(`my name is ${this.name}, my age is ${this.age}`);
//     }

//     eat() {
//         console.log('I can eat');
//     }

//     drink() {
//         console.log('I can drink');
//     }
// }

// // 类内部的方法是不可枚举的
// console.log(Object.keys(Person.prototype));

// console.log(new Person().say());
// console.log(new Person().eat());
// console.log(new Person().drink());
// console.log(typeof(Person));

// 总结
// 私有属性：
// 共有属性：1,公有的最好是方法，不要有属性; 2. 公有方法私有化的两个办法：Symbol方法， class外定义函数，class内部调用
// 静态属性：static，只有类名可以访问
// class 与 let, 不能提升 tDZ
// 公有属性的方法，不可枚举，ES5的方法可枚举
// 默认严格模式
// 类中会有一个默认的constructor, 不会报错
// 必须使用 new 的方式来执行class

// ======================================

// class的继承 -> extends
// class Parent {
//     constructor(name = 'jayden') {
//         this.name = name;
//     }
//     say() {
//         console.log(1);
//     }
//     static a() {
//         console.log('alexis');
//         return 'yui';
//     }
// }

// class Child extends Parent {}
// console.log(new Child()); // Child {name: "jayden"} -> 属性被继承

// new Child().say(); //1 -> 公有方法被继承
// Child.a(); // alexis -> 静态方法被继承

// // 派生类中实现属性自定义传值
// class Parent {
//     constructor(name = 'jayden') {
//         this.name = name;
//     }
// }

// // 2个注意事项
// // 1. class中，super必须在constructor中使用
// // 2. super 必须写在constructor内的第一行，因为constructor中需要调用this, 就必须先将父级的constructor拿到，在调用this才会指向派生类
// class Child extends Parent {
//     constructor(name = 'foxxx', age = 39) {
//         super(name);
//         this.sex = 'female';
//         this.age = age;
//     }
// }
// console.log(new Child()); //Child {name: "foxxx", sex: "female", age: 39}

// ======================================

// // super 的用法

// //1. super指向原型对象
// let proto = {
//     y: 20,
//     z: 60
// }

// let obj = {
//     x: 10,
//     foo() {
//         console.log(super.y)
//     }
// }

// Object.setPrototypeOf(obj, proto);
// obj.foo(); //20

// // 2.super 在静态方法中，指向自己的父类

// // 3. class 的派生类的constructor中以函数执行
// class Parent {
//     constructor(name = 'foxxx') {
//         this.name = name;
//     }
// }

// class Child extends Parent {
//     constructor(name = 'alexis', age = 29) {
//         super(name);
//         this.age = age;
//     }
// }