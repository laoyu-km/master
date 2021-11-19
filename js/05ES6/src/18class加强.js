// class 特点
// 1. TDZ
// 2. 默认 'use strict'
// 3. 不可枚举
// 4. new
// 5. 默认constructor, 无参不报错

// class Person {
//     constructor(name = 'jayden', age = '28') {
//         this.name = name;
//         this.age = age;
//     };
//     say() {
//         console.log('hello jayden');
//     }

//     drink() {
//         console.log('drink');
//     }

//     static est() {
//         console.log('eat');
//     }
// }

// console.log(Person);

// ======================================

// 手写class转换为ES5

// ======================================

// // 修饰器模式：为对象添加新的功能，而不改变对象原有的解构和功能

// // 修饰器语法 -> @ -> 修饰器语法不是ES6语法，但是在babel中实现了这种语法
// // 使用修饰符语法需要安装babel插件
// // npm i babel-plugin-transform-decorators-legacy

// // @ 修饰符修饰的是紧接在@下的属性
// // @ 修饰符要有对应的修饰方法
// // @ 修饰符让业务和逻辑分离的更清晰

// //@testable // 在类上使用修饰符
// class Person {
//     constructor(name = 'jayden', age = '28') {
//         this.name = name;
//         this.age = age;
//     }

//     @readonly // 在属性上使用readonly
//     say() {
//         console.log('Hello Jayden');
//     }

//     static eat() {
//         console.log('eat');
//     }
// }

// let person = new Person();

// // 在属性上使用修饰符 @readonly -> 定义readonly方法，要传入三个参数
// function readonly(target, name, descriptor) {
//     descriptor.writable = false;
//     // console.log(target); //{constructor: ƒ, say: ƒ}
//     // console.log(name); // say
//     // console.log(descriptor); //{writable: true, enumerable: false, configurable: true, value: ƒ}
// }

// // 类中的属性修饰符修改成功
// person.say = function() {
//         console.log('更改'); // Cannot assign to read only property 'say' of object '#<Person>
//     }
// // 在类上使用修饰符@testable,定义testable的方法,只能作用类的属性和方法，不能作用属性的修饰符
// function testable(target) {
//     console.log(target);
//     // target.isTestable = true; //为target 增加了isTestable 属性
//     target.prop1 = ['foxxx', 'alexis'];
// }
// console.log(Person.prop1); //['foxxx', 'alexis'];

// // @ 使用场景
// // 埋点分析

// let log = (type) => {
//     return function(target, name, descriptor) {
//         let src_method = descriptor.value;
//         descriptor.value = (...arg) => {
//             src_method.apply(target, arg);
//             console.log(type); // 在这里埋点
//         }
//     }
// }

// class AD {
//     @log('show')
//     show() {
//         console.log('ad is show');
//     }
//     @log('click')
//     click() {
//         console.log('ad is click');
//     }
// }

// let ad = new AD();
// ad.click();
// ad.show();

// // 设计模式总原则 -> 开放 封闭原则
// // 对拓展开放，对修改封闭