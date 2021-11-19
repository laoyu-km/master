// // 获取get set 取值函数和存值函数属性的名称
// // 取值函数和存值函数是属性的描述符
// const obj = {
//         get foo() {

//         },

//         set foo(x) {

//         }
//     }
//     //console.log(obj.foo.name); //获取失败
// var descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');
// console.log(Object.getOwnPropertyDescriptor(obj, 'foo')); //{enumerable: true, configurable: true, get: ƒ, set: ƒ}
// console.log(descriptor.get.name); // foo
// console.log(descriptor.set.name);

//=========================================

// var obj = { a: 2 };

// // 对象常量：常量 -> 不可修改，不可删除 -> configurable：false; writable: false;
// // Object.preventExtensions() -> 禁止对象进行拓展 -> 对象无法增加属性
// var test = Object.preventExtensions(obj);
// // console.log(test === obj); // true, Object.preventExtensions 返回的是对象本身。
// // Object.preventExtensions(obj);
// // obj.b = 3;
// Object.defineProperty(obj, 'b', {
//     value: 6
// })
// console.log(Object.isExtensible(obj)) //true , Object.isExtensible与Object.preventExtensions() 是成对出现，用于判断对象是否可拓展
// console.log(obj); // 报错，Cannot define property b, object is not extensible

// // 两种添加属性的方法，属性的描述符情况
// var obj = {};
// obj.a = 2; // 属性描述符全都是true
// console.log(Object.getOwnPropertyDescriptor(obj, 'a')); // {value: 2, writable: true, enumerable: true, configurable: true}

// Object.defineProperty(obj, 'b', {
//         value: 6
//     }) // 属性描述符全都是false
// console.log(Object.getOwnPropertyDescriptor(obj, 'b')); //{value: 6, writable: false, enumerable: false, configurable: false}


// // Object.seal() -> 让对象密封 -> 本质是调用Object.preventExtenstions, 让对象的configuable: false
// // Object.isSeal() -> 判断对象是否密封
// var obj = {};

// obj.a = 2

// Object.seal(obj);
// console.log(Object.isSealed(obj)); // true 密封的
// console.log(Object.getOwnPropertyDescriptor(obj, 'a')); //{value: 2, writable: true, enumerable: true, configurable: false}

// // Object.freeze(); -> 冻结对象
// // Object.isFrozen(); -> 判断对象是否被冻结
// var obj = {};
// obj.a = 2;
// Object.freeze(obj);
// console.log(Object.isFrozen(obj)); // true
// console.log(Object.getOwnPropertyDescriptor(obj, 'a')); // {value: 2, writable: false, enumerable: true, configurable: false}

// // 深度冻结
// function myFreeze(obj) {
//     Object.freeze(obj);
//     for (var key in obj) {
//         if (typeof(obj[key]) === 'object' && obj[key] !== null) {
//             myFreeze(obj[key]);
//         }
//     }
// }

// // 总结： 让对象冻结的四种方式
// Object.preventExtensions(); -> Object.isExtensible();
// Object.seal(); -> Object.isSealed();
// Object.freeze(); ->  Object.isFrozen();
// 利用Object.freeze()实现深度冻结


//=========================================
// // ES5 时判断的方法
// // === 会调用 sameValue 算法
// console.log(NaN === NaN); // false
// console.log(+0 === -0); // true
// console.log({} === {}); // false
// console.log(false === 0); // false

// // ES6 的新方法 -> Object.is() -> 本质调用的是sameValue算法
// // 与ES5 最大的不同就是NaN,NaN为true, +0和-0为false
// console.log(Object.is(NaN, NaN)); // true
// console.log(Object.is(+0, -0)); // false
// console.log(Object.is({}, {})); // false
// console.log(Object.is(false, 0)); // false

//=========================================

// //Object.assign(target, ...sources) 返回target; -> 用于合并对象
// let obj = { a: 1 };
// let tar = { b: 2 };
// Object.assign(tar, obj);
// console.log(tar); // {b: 2, a: 1}

// // 示例 01 同名属性后面的覆盖前面的
// const tar = { a: 1 };
// const tar2 = { a: 2 };
// const tar3 = { a: 3 };
// Object.assign(tar, tar2, tar3);
// console.log(tar); // {a: 3}

// // 示例 02
// const tar = { a: 1, b: 3 }
// const tar1 = { b: 2, c: 6 }
// const tar2 = { c: 3 }
// Object.assign(tar, tar1, tar2);
// console.log(tar); //{a: 1, b: 2, c: 3}

// 示例 03, 第一个参数传特殊值
// Object.assign(undefined, { a: 1 }); // 报错，undefined没有包装类，无法合并
// Object.assign(null, { a: 1 }); // 报错，null没有包装类，无法合并
// var test = Object.assign(1, { a: 1 }); //
// console.log(test); //Number {1, a: 1}

// var test = Object.assign(false, { a: 1 }); //
// console.log(test); // Boolean {false, a: 1}

// var test = Object.assign("1", { a: 1 }); //
// console.log(test); // String {"1", a: 1}

// 示例 04, 第二个参数传特殊值
// var test = Object.assign({ a: 1 }, undefined);
// console.log(test); //{a: 1}

// var test = Object.assign({ a: 1 }, 1);
// console.log(test); //{a: 1}

// var test = Object.assign({ a: 1 }, "1");
// console.log(test); //{0: "1", a: 1}

// var test = Object.assign({ a: 1 }, true);
// console.log(test); //{a: 1}

// // 对象要有可枚举性，有 -> 才能被循环 -> 才有下标 -> 才能作为对象被assign操作合并
// // 基本类型被转换为包装类后，要看是否具有枚举性
// var test = Object.assign({ a: 1 }, '123');
// console.log(test); //{0: "1", 1: "2", 2: "3", a: 1}

// // 示例05
// const test1 = 'abc';
// const test2 = true;
// const test3 = 10;

// const obj = Object.assign({}, test1, test2, test3); // {0: "a", 1: "b", 2: "c"}
// console.log(obj);

// 示例06
// var obj = { a: 3 };
// Object.defineProperty(obj, 'b', {
//     value: 4,
//     // enumerable: true
// })
// console.log(Object.getOwnPropertyDescriptor(obj, 'b')); // {value: 4, writable: false, enumerable: false, configurable: false}

// for (var key in obj) {
//     console.log(obj[key]); // 3 , b不能被遍历
// }

// // 示例 07
// // create() 的第二个参数是配置obj的属性，通过配置属性的描述符的方式进行配置
// var obj = Object.create({ foo: 1 }, {
//     bar: {
//         value: 2
//     },
//     baz: {
//         value: 3,
//         enumerable: true
//     }
// });
// console.log(obj) //{baz: 3, bar: 2}

// var copy = Object.assign({}, obj);
// console.log(copy); //{baz: 3} -> baz 的 enumerable 为 true。但是原型也没拷贝
// // 总结： 继承属性和不可枚举属性，不能被Object.assign()拷贝

//=========================================

// // Symbol() -> ES6 新增的一个原始类型
// // 通过Symbol 生成一个完全不一样，不可重复的原始类型

// var a = Symbol('a');
// var b = Symbol('a');
// console.log(a === b); // false
// console.log(a == b); //false

// console.log(a); //Symbol(a)
// console.log(b); //Symbol(a)

// // 示例08 Object.assign 能拷贝Symbol吗
// // var test = Object.assign({ a: 'b' }, { [Symbol('c')]: 'd' });
// // console.log(test); //{a: "b", Symbol(c): "d"}

// var test = Object.assign({ a: 'b' }, Symbol('c'));
// console.log(test); //{a: "b"}

// console.log(new Object(Symbol('c'))); //Symbol -> {Symbol(c)} -> [[PrimitiveValue]]: Symbol(c)

// // assign 是浅拷贝
// const obj1 = { a: { b: 1 } };
// const obj2 = Object.assign({}, obj1);

// obj1.a.b = 2;
// console.log(obj2); //2 证明assign 是浅拷贝对象

// // Object.assign() 同名属性替换
// const target = { a: { b: 'c', d: 'e' } };
// const sourse = { a: { b: 'hello' } };
// Object.assign(target, sourse);
// console.log(target); //a: {b: "hello"} -> 同名属性替换是整个替换

// // Object.assign() 数组替换
// // 还是基于下标(属性名)进行替换
// var a = Object.assign([1, 2, 3], [4, 5]);
// console.log(a); // [4, 5, 3]

// // 取值属性拷贝 -> 直接拷贝值，而不是拷贝foo()这个函数
// // 这种拷贝是不合适的
// const source = {
//     get foo() {
//         return 1;
//     }
// }

// const target = {};
// Object.assign(target, source);
// console.log(target); //{foo: 1}

// // 在原型上扩充方法和属性 -> 不推荐使用
// function Person() {}

// var age = 1;
// Object.assign(Person.prototype, {
//     eat() {

//     },
//     age
// })

// console.log(Person.prototype) //{age: 1, eat: ƒ, constructor: ƒ}


// // Object.assign 对默认值的处理
// const defaults = {
//     url: {
//         host: 'www.puba.com',
//         port: 7070
//     }
// }

// // 如果没有设置用户的option, 则使用默认的defaults
// function test(option) {
//     option = Object.assign({}, defaults, option);
//     console.log(option);
// }

// test({ url: { port: 8080 } }); //url: {port: 8080}


// // assign 不能正确拷贝取值和赋值函数的解决办法
// // 下式使用Object.assign()不能正确拷贝foo() 这个赋值函数
// const source = {
//     set foo(value) {
//         console.log(value);
//     }
// }

// const target = {};
// Object.assign(target, source);
// console.log(target); //{foo: undefined}

// // 解决办法
// // 使用Object.defineProperties() 和 Object.getOwnPropertyDescriptors() 来解决
// // 以上两个API就是用于解决对象拷贝获取set 和 get 函数描述符的赋值方法的唯一办法
// const source = {
//     set foo(value) {
//         console.log(value);
//     }
// }

// const tar = {};
// Object.defineProperties(tar, Object.getOwnPropertyDescriptors(source));
// console.log(Object.getOwnPropertyDescriptor(tar, 'foo')); //{get: undefined, enumerable: true, configurable: true, set: ƒ}

// // 浅拷贝的另一种实现办法
// // Object.getPrototypeOf(obj) -> 获取obj的原型
// var obj = { a: 1, b: 2, c: 3 };
// // const clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
// // console.log(clone);
// // 箭头函数写法
// const clone = (obj) => Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj))

// console.log(clone(obj)); // {a: 1, b: 2, c: 3}


// // 对象的部署方式
// // 方式1
// const obj = { a: 1 };

// // 方式2
// const obj = Object.create(prot);
// obj.foo = 123;

// // 方式3
// const obj = Object.assign(Object.create(prot), {
//     foo: 123
// })

// // 方式4
// const obj = Object.create(prot, Object.getOwnPropertyDescriptors({
//     foo: 123
// }))

//=========================================

// // 通过Object.defineProperties() 来定义多个属性
// // 通过Object.getOwnPropertyDescriptors() 来获取多个属性的描述符
// var obj = {};

// Object.defineProperties(obj, {
//     a: {
//         value: true,
//         writable: true,
//     },
//     b: {
//         value: 'hello',
//         writable: false
//     }
// })
// console.log(obj);
// console.log(Object.getOwnPropertyDescriptors(obj));