// 1. 数组的解构赋值

// 1.1 基本用法
// ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）
// let [a, b, c] = [1, 2, 3];

// // 本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值
// let [a, [[b], c]] = [1, [[2], 3]];
// let [, , third] = [1, 2, 3]; // third = 3
// let [x, , y] = [1, 2, 3]; // x=1, y=3
// let [head, ...tail] = [1, 2, 3]; // head=1, tail=[2,3]
// let [x1, y1, ...z] = [1]; // x1=1, y1=undefined, z=[]
// console.log(x1, y1, z);

// // 如果解构不成功，变量的值就等于undefined
// let [foo1] = []; // foo=undefined
// let [bar, foo] = [1]; // foo=undefined

// // 不完全解构 -> 即等号左边的模式，只匹配一部分的等号右边的数组
// let [x, y] = [1, 2, 3]; // x=1, y=2
// let [a, [b], d] = [1, [2, 3], 4]; // a=1, b=2, d=4

// // 如果等号的右边不是数组（或者严格地说，不是可遍历的结构，参见《Iterator》一章），那么将会报错
// // 注意：字符串是类数组，可遍历解构
// let [foo1] = 1;
// let [foo2] = true;
// let [foo3] = NaN;
// let [foo4] = undefined;
// let [foo5] = null;
// let [foo6] = {};

// // 对于 Set 结构，也可以使用数组的解构赋值
// let [x, y, z] = new Set(['a', 'b', 'c']);
// console.info(x, y, z);

// // 事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值
// // Generator 函数返回的就是iterator对象，解构赋值会依次从这个接口获取值
// function* fibs() {
//   let a = 0,
//     b = 1;

//   while (true) {
//     yield a;
//     [a, b] = [b, a + b];
//   }
// }

// let [a1, a2, a3, a4, a5, a6] = fibs();
// console.log(a1, a2, a3, a4, a5, a6);

//1.2 默认值
// 解构赋值允许指定默认值
// let [foo = true] = [];
// let [x, y = 'a'] = ['a'];
// let [x, y = 'b'] = ['a', undefined]; // x = 'a' y = 'b'
// let [x, y = 'b'] = ['a', null]; // x = 'a' y = null -> null不严格等于undefined

// 注意，ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。

// 如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值
// 下面代码因为x能取到值，所以函数f根本不会执行
// function f() {
//   // console.log('inside');
//   return 2;
// }
// let [x = f()] = [1];
// console.log(x); // 1

// let [y = f()] = [undefined];
// console.log(y); // 2

// // 上面写法等同于下面
// function fn() {
//   return 2;
// }
// let x;
// if ([1][0] === undefined) {
//   x = f();
// } else {
//   x = [1][0];
// }

// 默认值可以引用解构赋值的其他变量，但该变量必须已经声明。
// let [x = 1, y = x] = [] // x = 1; y = 1
// let [x = 1, y = x] = [2]; // x = 2; y = 2;
// let [x = 1, y = x] = [3, 5]; // x = 3; y = 5;
// let [x = y, y = 1] = [3, 5]; // x = 3; y = 5;
// let [x = y, y = 1] = []; // Reference Error Cannot access 'y' before initialization

// 2. 对象的解构赋值

// 2.1 简介

// 数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值
// let { foo, baz } = { baz: 'jayden', foo: 'alexis' };
// let { baz } = { foo: 'jayden', baz: 'alexis' };

// 如果解构失败，变量的值等于undefined
// let { baz } = { foo: 'ariella' };

// 对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量
// let { log, sin, cos } = Math;
// let { log } = console;

// let obj = {
//   fn: function () {
//     console.log(this);
//   },
// };

// let obj2 = {};

// // 解构赋值的function的context 为变量的所在context
// let { fn } = obj;
// fn(); // Window
// obj.fn(); // {fn}

// 如果变量名与属性名不一致，必须写成下面这样
// let { foo: baz} = { foo: 'jayden'}; // baz = 'jayden'
// let obj = { first: 'hello', second: 'alexis' };
// let { first: hi, second: pornname } = obj; // hi = 'hello'; pornname = 'alexis'

// 这实际上说明，对象的解构赋值是下面形式的简写
// let { foo: foo, baz: baz } = { foo: 'jayden', baz: 'aleixs'};
// 也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者

// 解构也可以用于嵌套结构的对象
// // 1 -> 变量p 要被赋值，必须写成下面这样
// let obj = {
//   p: ['hello', { y: 'Jayden' }],
// };

// let {
//   p,
//   p: [x, { y }],
// } = obj;

// // 上式等同于
// let {
//   p: p,
//   p: [x, { y: y }],
// } = obj;
// console.log(x, y, p);

// // 2
// const obj = {
//   loc: {
//     start: {
//       line: 1,
//       colum: 5,
//     },
//   },
// };

// let {
//   loc,
//   loc: {
//     start,
//     start: { line },
//   },
// } = obj;
// console.log(loc, start, line);

// //3
// let obj = {};
// let arr = [];

// ({ foo: obj.prop, bar: arr[0] } = { foo: 'jayden', bar: 'alexis' });
// console.log(obj, arr); // obj = {prop: 'jayden'}; arr = ['alexis'];

// 如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错
// let {
//   foo: { baz },
// } = { bar: { baz: 'jayden' } };
// console.log(baz);

// 对象的解构赋值可以取到继承的属性
// const obj1 = {},
//   obj2 = { foo: 'jayden' };
// Object.setPrototypeOf(obj1, obj2);
// let { foo } = obj1;
// console.log(foo); // jayden

//2.2 默认值
// 对象的解构也可以指定默认值
// let { x = 3} = {}; // x = 3
// let {x, y = 5} = { x: 1 }; // x = 1; y = 5;
// let { x: y = 3} = {}; // y = 3;
// let { x: y = 3} = { x: 5 }; // y = 5;
// let { message: msg = 'Jayden is good' } = {}; // msg = 'Jayden is good'

// 默认值生效的条件是，对象的属性值严格等于undefined
// let { x: y = 3 } = { x: undefined }; // y = 3
// let { x: y = 3 } = { x: null }; // y = null

// 2.3 注意点
// a. 如果要将一个已经声明的变量用于解构赋值，必须非常小心
// let y;
// { x: y } = { x: 1 }; // Syntax Error
//  JavaScript 引擎会将{x: y}理解成一个代码块，从而发生语法错误。只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题
// 最好用小括号将整行语句包裹住
// ({ x: y }) = { x: 1 }; // Invalid left-hand side in assignment
// +{x: y} = { x: 1}; // Invalid left-hand side in assignment
// ({ x: y } = { x: 1 }); // y = 1

// // 案例, 同理，不要括号包裹就会报错
// const obj = {};
// const arr = {};
// ({ foo: obj.prop, baz: arr[0] } = { foo: 'jayden', baz: 'alexis' });

// // b. 解构赋值允许等号左边的模式之中，不放置任何变量名。因此，可以写出非常古怪的赋值表达式 ({} = [true, false]);
// ({} = 'abc');
// ({} = []);

// c. 由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构
// let arr = [1, 2, 3];
// let { 0: first, [arr.length - 1]: last } = arr;
// console.log(first, last); // first: 1; last: 3

//3. 字符串的解构赋值
// 字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象
// const [a, b, c] = 'jay'; // a = j; b = a; c = y;

// 类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值
// let { length } = 'jayden james';
// console.log(length); // 12

// let { length: len} = 'jayden james';
// console.info(len); // 12

//4. 数值和布尔值的解构赋值
// 解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
// let [s] = 123; // TypeError: 123 is not iterable
// let { s } = 123; // s = undefined
// let { toString: s } = 123; // s = toString() { [native code]}
// console.log(s === Number.prototype.toString); // true
// let { toString: s } = true;
// console.log(s === Boolean.prototype.toString);

// 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错
// let { prop: s } = undefined; // TypeError
// let { prop: s } = null; // TypeError

// 5. 函数参数的解构赋值
// 函数的参数也可以使用解构赋值
// a.
// function fn([x, y]) {
//   return x + y;
// }
// console.log(fn([2, 5])); // 7

// b.
// let arr = [
//   [1, 2],
//   [3, 5],
// ].map(([x, y]) => x + y);
// console.info(arr); //[3, 8]

// 函数参数的解构也可以使用默认值

// 下面代码中，函数fn1的参数是一个对象，通过对这个对象进行解构，得到变量x和y的值。如果解构失败，x和y等于默认值
// 参数解构时如果函数参数没有默认值(也就是下式中的{}), 函数中使用x, y, 函数调用不传参时会报错
// function fn1({ x = 0, y = 0 } = {}) {
//   console.info([x, y]);
// }
// fn1({ x: 1, y: 2 }); // [1, 2]
// fn1({ y: 2 }); //[0, 2]
// fn1({}); // [0, 0]
// fn1(); // [0, 0]
// fn1(1);

// // 下面代码是为函数fn2的参数指定默认值，而不是为变量x和y指定默认值，所以会得到与前一种写法不同的结果
// function fn2({ x, y } = { x: 1, y: 2 }) {
//   console.log([x, y]);
// }
// fn2({ x: 5, y: 6 }); // [5, 6]
// fn2({ x: 5 }); // [5, undefined]
// fn2({}); // [undefined, undefined]
// fn2(); //[1, 2]

// // 下面代码, 即为fn3参数指定默认值，页尾x和y指定默认值
// function fn3({ x = 0, y = 0 } = { x: 1, y: 2 }) {
//   console.log([x, y]);
// }
// fn3({ x: 5, y: 6 }); // [5, 6]
// fn3({ x: 5 }); // [5, 0]
// fn3({}); // [0, 0]
// fn3({ z: 10 }); // [0, 0]
// fn3(1); //[0, 0];
// fn3(); //[1, 2];
// // fn3(null); // TypeError
// fn3(undefined); // TypeError

// // 函数参数默认值的触发条件也是所给的值严格等于undefined
// [1, undefined, 3].map((item = 'jayden') => console.log(item)); // 1, jayden, 3
// [1, null, 3].map((item = 'jayden') => console.log(item)); // 1, null, 3

// 6 圆括号问题
// ES6 的规则是，只要有可能导致解构的歧义，就不得使用圆括号
// 建议: 只要有可能，就不要在模式中放置圆括号

// 6.1 不能使用圆括号的情况
// a. 变量声明语句不能用 -> let [(a)] = 1; let {(x): c} = {}; let {(x: c)} = {}; let {x:(c)} = {}
// b. 函数参数不能用 -> 函数参数也属于变量声明，因此不能带有圆括号
// c. 赋值语句的模式部分 -> ({p: a}) = {p: 2}; ([a]) = [5]; [({p:a}), {x:c}] = [{p:1}, {x:2}]

// 6.2 可以使用圆括号的情况
// 可以使用圆括号的情况只有一种：赋值语句的非模式部分，可以使用圆括号。
// [(b)] = [3];
// ({ p: (d) } = { p: 3 });
// [(parseInt.prop)] = [1];
//({ p: d } = { p: 3 });
