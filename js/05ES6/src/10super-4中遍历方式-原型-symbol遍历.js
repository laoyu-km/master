// // ES5 对象
// function Person() {
//     this.name = 'jayden';
//     this.age = '18';
// }
// var person = new Person();
// console.log(person);
// // 原型是构造函数的一个属性
// console.log(Person.prototype);
// // 原型的终点
// console.log(Object.prototype);
// // 构造函数将原型传给构造出来的对象
// console.log(person.__proto__); // __proto__ 是系统属性，不可替代
// 通过person.__proto__来修改原型是不合理的 因为
// 1. 语义化，__proto__ 是内部属性
// 2. 访问效率慢
// 3. 所有继承自该原型的对象都会影响到

// ======================================

// // 如何通过对象来修改原型？
// Object.setPrototypeOf(obj); -> 设置原型
// Object.getPrototypeOf(obj); -> 获取原型
// Object.create(obj, ['描述符方式申明的属性']); -> 指定原型

// // Object.setPrototypeOf() 的使用
// let proto = {
//     y: 20,
//     z: 40
// }

// let obj = { x: 10 };
// Object.setPrototypeOf(obj, proto);
// console.log(obj);

// ======================================

// // Object.setPrototypeOf() 对原始值使用
// // 1. 对 数值使用
// let obj = Object.setPrototypeOf(2, { a: 1, b: 2 });
// // console.log(obj); // 1 -> 返回的还是一个原始值 
// console.log(obj); //2
// console.log(Object.getPrototypeOf(obj)); // Number {0, constructor: ƒ, toExponential: ƒ, toFixed: ƒ, toPrecision: ƒ, …}
// // Object.getPrototype(obj) 获取到了2 的包装对象，但是原型不是{a:1, b:2} -> 原因是
// // 1. 首先Object.setPrototypeOf(2,{a:1,b:2})将2进行包装类 -> Number(2);
// // 2.Object.setPrototypeOf(2,{a:1, b:2})返回的值是2 -> 还是一个原始值 -> obj === 2;
// // 3. Object.getPrototypeOf(obj) === 获取Number(2)的原型 -> Number.prototype === Number{0}
// console.log(Number.prototype); //Number {0, constructor: ƒ, toExponential: ƒ, toFixed: ƒ, toPrecision: ƒ, …}

// // 2 对 undefined 和 null 使用
// let obj = Object.setPrototypeOf(undefined, { a: 1, b: 2 });
// console.log(obj); //TypeError: Object.setPrototypeOf called on null or undefined
// console.log(Object.getPrototypeOf(obj));

// // 3 对 true 或 false 使用
// let obj = Object.setPrototypeOf(true, { a: 1, b: 2 });
// console.log(obj); //true
// console.log(Object.getPrototypeOf(obj)); // Boolean {false, constructor: ƒ, toString: ƒ, valueOf: ƒ}

// // 4 对string使用
// let obj = Object.setPrototypeOf('jayden', { a: 1, b: 2 });
// console.log(obj); // jayden
// console.log(Object.getPrototypeOf(obj)); //String {"", constructor: ƒ, anchor: ƒ, big: ƒ, blink: ƒ, …}

//总结：Object.setPrototypeOf() 对原始值使用，返回的值还是原始值，所以使用object.getPrototypeOf()来查看其返回值的原型时，还是原始值对应的原型 -> defined , null 除外，他们使用 Object.setPrototypeOf()和 Object.getPrototypeOf时直接报 TypeError
// console.log(Object.getPrototypeOf(undefined)); //TypeError: Cannot convert undefined or null to object

// ======================================

// // Object.keys();
// // Object.values();
// // Object.entries();

// const foo = {
//     a: 1,
//     b: 2,
//     c: 3
// }

// Object.defineProperties(foo, {
//         d: {
//             value: 6,
//             enumerable: true
//         },
//         e: {
//             value: 8
//         }
//     })
//     // Object.keys(foo) -> 可以遍历当前对象的所有属性描述符enumerable为true的属性的键名 (不含继承的属性)
// console.log(Object.keys(foo)); //["a", "b", "c", "d"]
// // Object.values(foo) -> 可以遍历foo 的可枚举的属性的键值(不含原型属性)
// console.log(Object.values(foo)); //  [1, 2, 3, 6]

// // Object.entries(foo) -> 可以遍历foo 的可枚举的属性的键值对数组
// console.log(Object.entries(foo)); // [Array(2), Array(2), Array(2), Array(2)] -> 如下
// //0: (2) ["a", 1]
// // 1: (2) ["b", 2]
// // 2: (2) ["c", 3]
// // 3: (2) ["d", 6]
// // length: 4

// // 示例
// let obj = {};
// console.log(Object.keys(obj)); // 空

// let obj = 1;
// console.log(Object.keys(obj)); // 空

// let obj = true;
// console.log(Object.keys(obj)); // 空

// let obj = '123';
// console.log(Object.keys(obj)); // ["0", "1", "2"]

// let obj = undefined;
// console.log(Object.keys(obj)); // null 和 defined 都报错

// 总结： Object.keys(), Object.values(), Object.entries() 都是查找对象的键值对，参数有键值对才有返回值 与 Object.assign() 第二个参数相似

// ======================================

// // super --> this
// // this的原意 -> 指向对象本身
// // super的原意 -> 指向当前对象的原型

// // super 的使用
// let prot = {
//     y: 20,
//     z: 40,
//     bar: function() {
//         console.log(this.z);
//     }
// }

// let obj = {
//     x: 10,
//     // foo: super.y //  报错
//     // foo: function() { //还是报错
//     //     console.log(super.y);
//     // }
//     // foo() { //super 只能在对象的方法简写的情况下才能生效
//     //     console.log(super.y); //20
//     // }
//     bar() {
//         super.bar(); // 40
//     }
// };
// Object.setPrototypeOf(obj, prot);
// obj.bar();

// ======================================

// // Symbol
// // 是ES6新引入的一个基本数据类型 -> 为了解决对象的属性重名的问题
// // Symbol 是一个原始类型的值，
// // 原始值类型:number, boolean, string, null, undefined, Symbol
// // 引用值类型：Object, Array, Function
// // Symbol() 生成一个独一无二的值
// // Symbol 的类型是 symbol
// // Symbol 的值是 Symbol()
// // Symbol 不是构造函数

// let s1 = Symbol();
// let s2 = Symbol();
// console.log(s1 == s2); // false
// console.log(s1 === s2); // false

// console.log(s1);
// console.log(typeof(s1)); //symbol

// // 如何区分Symbol -> 传参数
// let s1 = Symbol('jayden');
// let s2 = Symbol('alexis');
// console.log(s1); //Symbol(jayden)
// console.log(s2); //Symbol(alexis)


// var obj = { a: 1 };
// let s1 = Symbol(obj);
// // Symbol中的obj自动调用Object.prototype.toString.call(obj)
// // Symbol() 中的值无论是什么值都会被转化为相应的字符串
// console.log(s1); //Symbol([object Object])
// console.log(Symbol([1, 2])); // 1,2
// console.log(Symbol(function test() { //Symbol(function test() { var a = 1; return a; })
//     var a = 1;
//     return a;
// }));
// // Symbol()中传入undefined -> undefined
// console.log(Symbol(undefined)); //Symbol()
// console.log(Symbol(null)); //Symbol(null)
// // 同理
// var a;
// console.log(Symbol(a));
// 函数传参为undefined也被认为是个空值

// ======================================

// // Symbol值的原型
// let s1 = Symbol(null);
// console.log(Object.getPrototypeOf(s1)); //Symbol {Symbol(Symbol.toStringTag): "Symbol", constructor: ƒ, toString: ƒ, valueOf: ƒ, …}
// //console.log(Symbol.prototype); // 与上面相同

// //Symbol 值的转换
// let s1 = Symbol(null);
// console.log(Boolean(s1)); //true //
// console.log(!s1); // false
// console.log(String(s1)); // 'Symbol(null)'
// console.log(s1 + ''); //TypeError: Cannot convert a Symbol value to a string
// console.log(Number(s1)); // TypeError: Cannot convert a Symbol value to a number
// console.log(s1.toString()); //'Symbol(null)'
// // 总结： Symbol 只能显示转换，隐式转换只能是boolean -> !s1

// // Symbol值做属性名
// let name = Symbol();
// let person = {};
// // person.name = 'jayden'; // 为person添加一个属性名为name的属性
// // console.log(person); //{name: "jayden"}

// // 将变量Symbol()作为person的属性名的方法
// 1
// // 将变量作为属性名引入对象只能是用person[变量]的方法，
// // person.变量名 === person["变量名"]
// person[name] = 'alexis';
// console.log(person);

// //2
// let name = Symbol();
// let person = {
//     [name]: 'jayden'
// }
// console.log(person); //{ Symbol(): "alexis" }

// //3
// let name = Symbol();
// let person = {};
// Object.defineProperty(person, name, {
//     value: 'jayden'
// })
// console.log(person);
// console.log(Object.getOwnPropertyDescriptors(person)); // Symbol(): {value: "jayden", writable: false, enumerable: false, configurable: false} 

// // console.log(person.Symbol()); // TypeError: person.Symbol is not a function -> 这种方式得不到Symbol()为键值的属性值
// console.log(person['Symbol()']); // undefiend

// person[name.toString()] = 'elle';
// console.log(person['Symbol()']); //elle

// console.log(person.name); // undefied

// // . 运算符 和 [] 的使用
// let name = Symbol();
// let eat = Symbol();

// const person = {
//     [name]: 'jayden',
//     [eat]() {
//         console.log([name]);
//     }
// };
// person[eat](); // [Symbol()]

// ======================================

// // Symbol.for() 和 Symbol.keyFor();

// // Symbol() -> 独一无二的值
// let s1 = Symbol();
// let s2 = Symbol();
// console.log(s1 === s2); //false

// let s1 = Symbol('jayden');
// let s2 = Symbol('jayden');
// console.log(s1 === s2); // false


// // Symbol.for() -> 可以获取相同的值
// // Symbol.for('value') -> 登记了一个key = 'value', 当在有相同的Symbol.for('value')调用时，就赋值这个key对应的key值
// let s = Symbol('alexis');
// let s1 = Symbol.for('jayden');
// let s2 = Symbol.for('jayden');
// console.log(s1 === s2); //true
// console.log(s === s1); //false

// // Symbol.keyFor() 就是可以拿到登记的这个key值
// console.log(Symbol.keyFor(s1)); // jayden
// console.log(Symbol.keyFor(s2)); // jayden

// // s 中的'alexis'是一个标识符，但是并没有在系统登记, 所以下式打印的是undefined
// console.log(Symbol.keyFor(s)); // undefined

// ======================================

// // 遍历对象的Symbol属性
// const obj = {};
// let a = Symbol('a');
// let b = Symbol('b');

// obj[a] = 'jayden';
// obj[b] = 'alexis';
// obj.c = 'elle';

// // 专为遍历Symbol属性的API -> Object.getOwnPropertySymbols();
// // Object.getOwnPropertySymbols(obj);
// // 只传一个参数 obj, 返回一个数组，该数组只包含obj 的 Symbol() 属性, 无论该属性是否可枚举 -> enumerable : false || true

// const objSymbols = Object.getOwnPropertySymbols(obj);
// console.log(objSymbols); //[Symbol(a), Symbol(b)]

// // for (let i in obj) {
// //     console.log(i); // c -> for..in 不能遍历Symbol属性对象
// // }

// // for (let i of obj) {
// //     console.log(i); //TypeError: obj is not iterable
// // }

// // var obj1 = {};
// // Object.assign(obj1, obj);
// // console.log(obj1); //{c: "elle", Symbol(a): "jayden", Symbol(b): "alexis"}


// ======================================

// 要调用Symbol必须执行 -> Symbol()
// let s1 = Symbol;
// console.log(s1); //ƒ Symbol() { [native code] }

// // Symbol 不能使用new关键字
// let s1 = new Symbol();
// console.log(s1); // TypeError: Symbol is not a constructor

// ======================================

// // 构造函数不打括号，系统会默认执行,因为有new关键字
// function Test() {
//     this.name = 'jayden';
//     this.age = 28;
// }

// let a = Test;
// console.log(a); //ƒ Test() { this.name = 'jayden'; this.age = 28; }

// let b = new Test;
// console.log(b); //Test {name: "jayden", age: 28}

// let c = new Test();
// console.log(c); //Test {name: "jayden", age: 28}

// ======================================

// 四种属性遍历的区别
// const obj = { c: 1, d: 2 };
// let a = Symbol('a');
// let b = Symbol('b');
// let _a = Symbol('_a');
// let _b = Symbol('_b');

// obj[a] = 'jayden';
// obj[b] = 'aleixs';

// Object.defineProperties(obj, {
//     e: {
//         value: 5,
//         enumerable: true
//     },
//     f: {
//         value: 6,
//         enumerable: false
//     },
//     [_a]: {
//         value: -1,
//         enumerable: true
//     },
//     [_b]: {
//         value: -2,
//         enumerable: false
//     }
// })

// let h = Symbol('h');
// let i = Symbol('i');
// let j = Symbol('j');

// const obj1 = {
//     g: 7,
//     [h]: 8
// }

// Object.defineProperties(obj1, {
//     [i]: {
//         value: 9,
//         enumerable: true
//     },
//     [j]: {
//         value: 10
//     },
//     k: {
//         value: 11
//     }
// })

// Object.setPrototypeOf(obj, obj1);
// console.log(obj);

// // 第一种遍历
// for (let i in obj) { //for..in 遍历自身和继承的可枚举属性(不包含Symbol类型的值)
//     console.log(i);
// }

// // 第二种遍历
// console.log(Object.keys(obj)); //遍历自身的不包含Symbol的可枚举属性

// // 第三种遍历
// console.log(Object.getOwnPropertySymbols(obj)); //遍历自身的Symbol属性，无论是否可枚举

// console.log(Object.getOwnPropertyDescriptors(obj)); //返回对象自身的包含Symbol的所有属性，无论是否可枚举，但是不包含原型属性

// // 第四种遍历
// var obj3 = {};
// Object.assign(obj3, obj); // 遍历自身可枚举且包含Symbol类型的属性
// console.log(obj3);

// // 第5中遍历
// JSON.stringify(); // 遍历自身的可枚举的属性

// ?Object.getOwnPropertyDescriptors(obj);不算遍历吗