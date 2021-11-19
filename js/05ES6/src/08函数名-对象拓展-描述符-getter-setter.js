// // 回顾
// // 表达式函数名
// var fun = function() {

// }
// console.log(fun.name); // fun -> ES6才开始, ES5 及之前，是 "" 空字符串, 因为变量后面跟的是匿名函数

// // 表达式函数名非匿名
// var fun = function app() {

// }
// console.log(fun.name); // app -> 如果声明了=号后面的函数的名称，则fun.name === 该名称, 但是该名称只能在该函数内部使用

// // // new 构造函数函数名
// // console.log(new Function.name); // . 运算级高，所以实际执行是 new (Functiono.name),会报错 -> 要么让构造函数执行，要么加小括号提高运算优先级
// console.log(new Function); // ƒ anonymous() { } 返回的是一个名称为anonymous的函数体
// console.log(new Function()); // ƒ anonymous() { }
// console.log(new Function().name); // anonymous 
// console.log((new Function).name);

// console.log(new Object); // {}
// console.log(new Object()); // {}
// console.log(new Object().name); // undefined
// console.log((new Object).name); // undefined

// console.log(new Array); // []
// console.log(new Array()); // []
// console.log(new Array().name); // undefined
// console.log((new Array).name); // undefined

// function SelfFunction() { this.sex = 'jayden' };
// console.log(new SelfFunction); //SelfFunction {sex: "jayden"} 返回的是一个对象，对象的构造函数是SelfFunction
// console.log(new SelfFunction()); //SelfFunction {sex: "jayden"}
// console.log(new SelfFunction().name); // undefined
// console.log((new SelfFunction).name); // undefined
// // 总结：只有new Function().name ===anonymous, 因为只有Function new 出的对象是一个函数体

// // bind() 函数名
// // 主动改变this 的 三种方法 call(), apply(), bind()
// function foo() {};
// console.log(foo.bind({}).name); // bound foo, 相当于foo.bind()整个函数的.name属性，所以是以bound 开头
// console.log(foo.call({}).name); // 相当于函数执行，函数执行返回undefined，undefined没有.name属性，所以报错

// // 对象的拓展
// // 1. 简写
// const foo = "bar";
// const baz = { foo }; // -> {foo: foo}
// console.log(baz); //{ foo: 'bar' }

// function foo(a = 1, b = 2) {
//     return ({ a, b }); // -> {a:a, b:b}
// }
// // 改进为箭头函数
// let foo = (a = 1, b = 2) => ({ a, b })
// console.log(foo()); //{ a: 1, b: 2 }

// let age = '12';
// const person = {
//     age, // age: age
//     say() { // -> say: function(){}
//         console.log(this.age);
//     }
// }
// person.say();

// // 复杂一点的, 只能用node demo08.js来运行，浏览器不识别require
// // const obj = require('./obj.js').obj;
// const { a, foo, bar, baz } = require('./obj.js').obj;
// console.log(a, foo(), bar(), baz()); //0 1 2 2 undefined undefined undefined


// // 属性名称都是字符串
// var arr = [1, 23, 33, 35, 56];
// console.log([arr[1]]); //23 -> 属性是经过包装的，系统自动包装为字符串
// console.log([arr['1']]); // 23

// // 拼接属性名
// 示例1
// let obj = {};

// obj.foo = true;
// obj['f' + 'o' + 'o'] = false; 
// console.log(obj); // {foo : false} -> obj['f'+'o'+'o'] === obj.foo

// 示例2
// let a = 'hello';
// let b = 'world';
// let obj = {
//     [a + b]: true, //字符串拼接属性只能用[]
//     ['hello' + b]: 123,
//     ['hello' + 'world']: undefined // 空值覆盖了123 说明系统是先覆盖了重名属性，在找值
// }

// console.log(obj); //{ helloworld: undefined }
// 总结：属性名都会通过某个方式变为字符串

// // 练习，下面打印的是什么
// var myObject = {};

// myObject[true] = 'foo';
// myObject[3] = 'bar';
// // myObject[myObject] = 'baz';
// // myObject[myObject] = myObject;
// console.log(myObject); // { '3': 'bar', true: 'foo', '[object Object]': 'baz' }
// console.log(myObject['true']); //foo
// console.log(myObject['3']) // bar
// console.log(myObject[myObject]) // baz

// // 所有属性名都被默认转换为字符串形式
// // boolean 形的转换：console.log(Boolean.prototype.toString.call(true)); // true
// // 数字转换： console.log(3 + '');
// // 对象转换： console.log(myObject.toString()); 或者 console.log(Object.prototype.toString.call(myObject));

// // 练习2 下面打印的是什么
// const a = { a: 1 };
// const b = { b: 2 };
// const obj = {
//     [a]: 'valueA',
//     [b]: 'valueB'
// }
// console.log(obj); //{[object Object]: "valueB"}


// // 对象方法中的name属性
// const person = {
//     sayName() {
//         console.log('hello');
//     }
// }
// console.log(person.sayName.name); // sayName

//=========================================

// // 属性描述符： ES5 及之前没有
// let obj = { a: 2 };

// console.log(Object.getOwnPropertyDescriptor(obj, 'a'));
// // 得到 obj 中 a 的属性描述
// //configurable: true -> 是否可配置
// //enumerable: true -> 是否可遍历
// //value: 2 -> 值
// //writable: true -> 是否可写

// console.log(object.prototype); 
// 在构造器中有getOwnPorpertyDescriptor()方法-> 获取属性描述
// defineProperty() -> 修改一个自有属性，或者添加一个新的属性

//=========================================

// // 属性描述符的作用
// // 1. configurable 
// let obj = {};
// // 第一个参数是需要修改或添加属性的对象
// // 第二个参数是修改或添加的属性名
// // 第三个参数是个对象，记录了属性的描述
// Object.defineProperty(obj, 'a', {
//     value: 2,
//     enumerable: true,
//     writable: true,
//     // configurable: true
//     configurable: false // 为false的话，后面就不能修改a的描述符
// })

// Object.defineProperty(obj, 'a', { // TypeError: Cannot redefine property: a
//     value: 6,
//     enumerable: true,
//     writable: true,
//     configurable: true
// })
// console.log(Object.getOwnPropertyDescriptor(obj, 'a'))

// //2. writable -> 可读
// // 'use strict'
// let obj = {};
// Object.defineProperty(obj, 'a', {
//     value: 6,
//     writable: false,
//     enumerable: true,
//     configurable: true
// });
// console.log(obj.a); //6
// obj.a = 30; // 静默失败 -> 值不能改，但是不报错 -> 严格模式下报错
// console.log(obj.a); //6 -> writable false 后，值不可改 
// delete obj.a
// console.log(obj); // {} -> writable false 时，属性仍能被删除, 严格模式下也能被删，-> 不能写却能删除. 如果configurable也为false才不能被删除
// // 总结 
// // 属性不能修改 -> writable: false
// // 属性不能删除 -> configurable: false
// // 属性不能修改又不能删除 -> writable: false && configurable: false

//=========================================

// // getter, setter;
// // 任然属于属性描述符的一种，但是需要配置
// // get 操作 -> 读取属性
// // put 操作 -> 设置，修改属性
// let obj = { a: 1 };
// obj.a; // 属性获取，底层使用的是 [[Get]] 默认操作；查找当前属性， 如果没有，查找原型，都没有 返回 undefined

// obj.a = 3;
// // 属性的赋值，底层使用的是 [[Put]] 默认操作，如何操作如下
// // 1. 首先找属性描述符getter, setter;
// // 2. 查看属性的描述符writable: false, 不让改
// // 3. 赋值

// getter,setter 覆盖掉默认操作的[[Get]]和[[Put]]
// // 示例
// var obj = {
//     log: ['example', 'test', ],
//     get latest() { // 通过get重写了默认的[[Get]],  
//         if (this.log.length === 0) {
//             return undefined;
//         }
//         return this.log[this.log.length - 1];
//     },
// }

// console.log(obj.latest); // test -> 获取伪属性latest

// latest:3 在 latest(){} 之下
// var obj = {
//     log: ['example', 'test'],
//     get latest() {
//         if (log.length === 0) {
//             return undefined;
//         }
//         return this.log[this.log.length - 1];
//     },
//     latest: 3
// }
// console.log(obj.latest); // 3

// // 示例2 通过defineProperty 定义一个getter
// var obj = {
//     get a() {
//         return 2;
//     }
// }

// Object.defineProperty(obj, 'b', {
//     get: function() {
//         return this.a * 2;
//     },
//     enumerable: true,
//     // 使用了getter 或setter后，value 和 writable 这两个描述都不能用，enumberable, configurable 还能用
//     // value: 6 // 设置后报错
//     // writable: true // 不能设置，无论是true还是false都报错
// })

// console.log(obj);
// //{}
// // a: 2
// // b: 4
// // get a: ƒ a()
// // get b: ƒ ()


// setter 示例
// var language = {
//         set current(name) {
//             this.log.push(name)
//         },
//         log: []
//     }
//     // 通过set方式设置language.log
// language.current = 'EN'; //相当于调用set current() 函数
// console.log(language.log); // ["EN"]

// var obj = {
//     get a() {
//         return 2;
//     },
//     set a(v) {
//         return v
//     }
// }

// console.log(obj.a = 3); //3 虽然这里是3， 但是get里return2已经写死，所以下式永远只会是2, getter 和 setter 没有联系
// console.log(obj.a); // 2 -> getter 的属性，需要setter来设置
// // 总结： getter 和 setter 一般是成对出现, 是覆盖了原本的[[Get]]和[[Put]]操
// getter 和 setter 主要用于隐藏属性

// // 让getter和setter关联示例 -> 就是对非同名属性执行方法,例如下式中的_a
// var obj = {
//     get a() {
//         return this._a
//     },
//     set a(val) {
//         this._a = val * 2
//     }
// }
// console.log(obj._a); // undefiend
// obj.a = 3;
// console.log(obj._a); // 6

//=========================================

// // 特例，空值不覆盖默认值
// function fun(a = 10, b = 12) {
//     var a;
//     var b;
//     console.log(a, b);
// }
// fun(); // 10 12 -> 函数体内虽然声明了a,b 但是未赋值，值为空时，不能覆盖形参值

// // Object 问题
// var myObject = {
//     myObject: myObject
// };
// myObject[myObject] = myObject;
// console.log(myObject[myObject]); // {myObject: undefined, [object Object]: {…}}
// console.log(myObject.myObject); // undefined