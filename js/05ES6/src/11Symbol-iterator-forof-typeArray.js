// // 回顾，箭头函数的this 指向
// function foo() {
//     return () => {
//         return () => {
//             return () => {
//                 console.log('id', this.id);
//             }
//         }
//     }
// }

// var f = foo.call({ id: 1 });
// f.call({ id: 2 })()(); // id: 1
// f().call({ id: 3 })(); // id: 1
// f()().call({ id: 4 }); // id: 1

// // 传统方式
// function foo() {
//     return function() {
//         return function() {
//             return function() {
//                 console.log('id: ', this.id)
//             }
//         }
//     }
// }
// var f = foo.call({ id: 1 });
// f.call({ id: 2 })()(); // undefined
// f().call({ id: 3 })(); // undefined
// f()().call({ id: 4 }); // 4

// ======================================

// // 拓展符rest ...
// // 在ES2017 得到了加强

// var obj = {
//     a: 1,
//     b: 2,
//     c: 3
// }

// var obj1 = {
//     a: 4,
//     d: 5,
//     e: 6

// }

// var obj2 = {
//     ...obj,
//     ...obj1,
// };

// console.log(obj2); //demo.js:55 {a: 4, b: 2, c: 3, d: 5, e: 6}


// // Object.assign(obj2, obj, obj1);

// // console.log(obj2) //{a: 4, b: 2, c: 3, d: 5, e: 6}

// // 学习ES6的一种方法：使用babel将ES6语法转变为ES5语法，然后查看ES5源码

// ======================================

// // foo instanceof Foo -> 实际调用的是 Foo[Symbol.hasInstance](foo)
// function Foo() {};

// var foo = new Foo();

// console.log(foo instanceof Foo); //true
// console.log(Foo[Symbol.hasInstance](foo)); //true
// console.log(Foo[Symbol.hasInstance]); //ƒ [Symbol.hasInstance]() { [native code] }
// console.log(Symbol.hasInstance); // Symbol(Symbol.hasInstance) -> 在chrome的consle中是用红色显示的 -> 红色表示系统内置

// ======================================

// Symbol.isConcatSpreadable

// ======================================

// // 迭代器 iterator -> Symbol.iterator
// let arr = [1, 2, 3, 4, 5];

// console.log(arr); // 原型中有Symbol.iterator接口（接口也是方法）

// ES6 迭代器就是隐式的提供一个Symbol接口 -> Symbol.iterator
// let iter = arr[Symbol.iterator]();

// // 迭代器是一种,有序的,连续的, 基于拉取,的一种消耗数据的组织方式
// // 是对数据结构的一种读取方式
// // 迭代器对数据源无影响
// console.log(iter.next()); // {value: 1, done: false} -> done: 遍历是否结束
// console.log(iter.next()); // {value: 2, done: false}
// console.log(iter.next()); // {value: 3, done: false}
// console.log(iter.next()); // {value: 4, done: false}
// console.log(iter.next()); // {value: 5, done: false}
// console.log(iter.next()); // {value: undefined, done: true}
// console.log(iter.next()); // {value: undefined, done: true}

// // 数据结构：
// // 有序：数组
// // 无序：对象
// // 类数组：arguments, nodeList, Map, Set, weakMap, weakSet
// // 类型数组: TypeArray: 二进制数据的缓存区
// // 给有序的连续的数据结构提供一种统一的迭代方法 -> Symbol.iterator -> 对数据进行抽取

// // 示例: 在没有部署iterator的对象上迭代
// let obj = {
//     a: 'jayden',
//     b: 30,
//     c: [1, 2, 3, 4],
//     d: 66
// }
// for (let i of obj) {
//     console.log(i); // TypeError: obj is not iterable
// }

// // 示例2: 在没有部署iterator的对象上迭代
// let obj = {
//     start: [1, 2, 3, 4],
//     end: [5, 6, 7]
// }

// for (let i of obj) {
//     console.log(i); // 报错，不可以在没有部署iterator迭代器的对象上进行迭代
// }

// ======================================

// //迭代器的实现方式 -> 手写：

// let arr = [1, 2, 3];

// function makeIterator(array) {
//     var nextIndex = 0;
//     return {
//         next: function() {
//             return nextIndex < array.length ? { value: array[nextIndex++], done: false } : { value: undefined, done: true } // nextIndex++ , 现参与运算在自加
//         }
//     }
// }

// var iter = makeIterator(arr);
// console.log(iter.next());

// ======================================

// // TypeArray
// // console.log(TypeArray); // JS中没有TypeArray

// const tArray = new Int8Array(8);

// tArray[0] = 100;
// console.log(tArray); //原型是TypeArray

// ======================================

// // C++, Java, C#, Python, ES6 参考了以上语言，为能够部署过iterator接口的类型提供了更加遍历的接口 -> for...of -> 实际调用的就是Symbol.iterator()
// // for...of
// let arr = [1, 2, 3, 4];

// for (let i of arr) {
//     console.log(i); // 1 2 3 4
// }

// for...in -> 遍历对象
// for...of -> 用来遍历部署过Symbol.iterator迭代器的数据类型
// 迭代器需求数据类型是有序的，连续的

// 在没有部署过迭代器的数据类型上要想使用迭代器，必须手动实现Symbol.iterator, 
// 首先将数据变得有序并且连续 -> 数组
// 其次设置指针和迭代范围 -> index 数组.length
// 最后返回一个对象，对象中必须有个next方法


// // 示例: 手动部署迭代器在没有部署迭代器的对象上, 才可以使用for...of
// // 所部署的迭代器名必须是：Symbol.iterator
// let obj = {
//     start: [1, 3, 2, 4],
//     end: [5, 6, 7],
//     len: 'jayden',
//     // iterator() { // TypeError: obj is not iterable
//     [Symbol.iterator]() {
//         let index = 0;
//         arr = [...this.start, ...this.end];
//         len = arr.length; // 在这里len和arr都成了全局变量，会对全局变量造成污染，应该单独申明
//         // arr 和 len 没有用this修饰，则与对象obj无关
//         // 方法中没有修饰符的变量，不属于方法，属于window
//         // let arr = [...this.start, ...this.end];
//         // let = arr.length;

//         return {
//             next() {
//                 if (index < len) {
//                     return {
//                         value: arr[index++],
//                         done: false
//                     }
//                 } else {
//                     return {
//                         value: undefined,
//                         done: true
//                     }
//                 }
//             }
//         }

//     }
// }

// // for (let i of obj) {
// //     console.log(i);
// // }
// var iter = obj[Symbol.iterator]();
// iter.next();
// console.log(Symbol.iterator) //Symbol(Symbol.iterator) 红色
// console.log(obj.len); //jayden
// console.log(window.arr); //[1, 3, 2, 4, 5, 6, 7]
// console.log(window.len); // 7

// 到此 ES6 对象的新增结束

// ======================================

// getter 和 setter 的应用
// var obj = {};
// Object.defineProperty(obj, 'a', {
//     value: 10
// })

// console.log(Object.getOwnPropertyDescriptor(obj, 'a'));

// Object.defineProperties(obj, {
//     a: {
//         get b() {
//             return this.a;
//         },

//         set b(value) {
//             this.a = value;
//         }
//     },

//     c: {
//         get d() {
//             return this.c + ' hi jayden'
//         },
//         set d(value) {
//             this.c = value
//         }
//     }
// })

// obj.b = 100;
// console.log(obj.b);

// obj.d = 500;
// console.log(obj.d);


// var obj = {
//     a: { // 不能这样写，obj.a = 110 会将a的值覆盖
//         get a() {
//             return this.a;
//         },

//         set a(value) {
//             this.a = value + ' hi jayden';
//         }
//     }
// }

// var obj = {
//     b: 30,
//     get a() {
//         return this.b
//     },
//     set a(value) {
//         this.b = value + 'hi jayden';

//     }
// }

// obj.a = 110;
// console.log(obj);