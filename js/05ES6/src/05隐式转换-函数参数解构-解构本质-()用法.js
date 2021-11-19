// // 解构赋值
// let { a } = { a: 1 };
// console.log(a);

// let a;
// // { a } = { a: 1 } // 这里 {a} 被看做了一个代码块，看做了一个作用域，所以 = 报错
// // 解决办法 加小括号，另语句成为一个表达式
// ({ a } = { a: 1 });
// console.log(a); // 1

// // 模式匹配 匹配属性
// let a1 = [1, 2, 3],
//     obj2 = {};

// [obj2.a, obj2.b, obj2.c] = a1;
// // console.log(a, b, c); // ReferenceError
// console.log(obj2.a, obj2.b, obj2.c); // 1 2 3

// 小括号怎么加？
// let [(a)] = [1]; // 语法不通过
// console.log(a);

// let { a: b } = {};
// console.log(b); // undefined, 匹配成功，但是{}里没有a:value,所以b是undefind

// let { a: (b) } = {}; //语法不通过
// console.log(b); 

// let { (a): b } = {}; //语法不通过
// console.log(b); 

// let ({ a: b }) = {};
// console.log(b); // let is not defined
// 总结 当用let 或者 var 声明赋值， 加 () 就报错

// // 函数如何加()
// function foo((z)) { // 语法不通过
//     return z;
// }
// console.log(1);

// function foo([z]) {
//     return z;
// }
// console.log(foo([1])); // 1

// function foo(([z])) { //语法不通过
//     return z;
// }
// console.log(foo([1]));
// // 总结 函数参数声明 也相当于用let z , 所以也不能乱加 ()

// // 数组匹配对象解构
// // 数组是特殊对象，依然是key:value的方式
// let arr = [1, 2, 3];
// let { 0: first, [arr.length - 1]: last } = arr;
// console.log(first, last); // 1 3

// [(b)] = [3];
// console.log(b); // 3

// ([b]) = [3]; // 左边是表达式， 右边是数组，模式不相同
// console.log(b); // SyntaxError: Invalid left-hand side in assigment
// // 总结：解构匹配要求 = 两边的模式相同，属性名相同

// // ({ a: (b) } = {});
// // ({ a: b = {} });
// ({ a: (b) = {} }) // 这里没有匹配，而是 b 初始化
// console.log(b); // {}

// var a = {};
// [(a.b)] = [3]; // 匹配的是a.b
// // [a.b] = [3]; // 匹配的是a.b
// console.log(b); // ReferenceError: b is not defined
// console.log(a.b); // 3
// // 总结： 模式匹配，模式必须一样，加()后很可能改变了原有模式，成为了表达式

// 示例1
// let a = 'x',
//     b = 'y',
//     obj = {};

// // { a: obj[a + b] } = { a: 2 }; // 语法不通过
// ({ a: obj[a + b] } = { a: 2 });
// console.log(obj); //{xy:2}

// // 示例2
// let obj = { a: 1, b: 2, c: 3 },
//     obj2 = {};
// // let ({ a: obj2.x, b: obj2.y, c: obj2.z } = obj); // let 未定义
// // var ({ a: obj2.x, b: obj2.y, c: obj2.z } = obj); // 语法不通过
// ({ a: obj2.x, b: obj2.y, c: obj2.z } = obj); 

// // console.log(x,y,z) // x y z undefined
// console.log(obj2.x, obj2.y, obj2.z);

// // 二数交换 模式匹配法
// let a = 10,
//     b = 20;
// [b, a] = [a, b];
// console.log(a, b); // 20 10
//总结: 变量的解构，本质就是变量的赋值，通过变量解构的方法进行赋值, 解构是通过模式匹配的方式进行

// // 模式匹配可以匹配同源属性
// let { a: x, a: y } = { a: 1 }; // 两个变量x,y的值都是匹配1 -> 匹配的是同一个属性，也就是同源属性
// console.log(x, y); // 1 1

// let { a: x, a: y } = { a: 1, a: 2 };
// console.log(x, y); // 2 2

//=========================================

// // 书写规范
// let person = { name: 'jayden', age: 40, daughter: { nameA: 'alexis', age: 30, daughter: { nameE: 'ella', age: 20, daughter: { nameF: 'foxxx', age: 10 } } } }
//     // let { daughter: { daughter: { daughter, nameE }, nameA }, name } = person; // 写法不规范
//     // 规范写法
// let {
//     daughter: {
//         daughter: {
//             daughter,
//             nameE
//         },
//         nameA
//     },
//     name
// } = person;
// console.log(daughter, name, nameA, nameE); //{ nameF: 'foxxx', age: 10 } jayden alexis ella

// // // // 练习1 下式打印的是什么 
// var x = 200,
//     y = 300,
//     z = 100;
// var obj1 = { x: { y: 42 }, z: { y: z } }; // {x:{y:42}, z:{y:100}};
// ({ y: x = { y: y } } = obj1); // x = {y:y} -> 默认值
// ({ z: y = { y: z } } = obj1);
// ({ x: z = { y: x } } = obj1);
// console.log(x.y, y.y, z.y);

// var x = 1,
//     y = 2,
//     z = 3;
// obj = { a: 10, b: 20, c: 30 };
// ({ a: x, b: y, c: z } = obj);
// console.log(x, y, z); // 10, 20, 30


// var test1 = 1,
//     test2 = 2,
//     test3 = 3;

// var obj = {
//     arg1: test1 = function() { return 5 },
//     arg2: test2 = { a: 3, b: 8 },
//     arg3: test3 = [1, 2, 3]
// }
// console.log(test1, test2, test3);
// console.log(obj);

// console.log(y.x); // undefined
// // console.log(x, y, z); // { y: 300 } { y: 100 } { y: 42 }
// 总结：在解构中使用对象或是数组的时候，慎用上面这种方式，因为代码可读性非常差

// // 解构的方式赋值形参
// // 正常赋值
// function test(x) {
//     console.log(x);
// }
// console.log(test(1));

// // 数组解构
// function test([x, y]) {
//     console.log(x);
//     console.log(y);
// }

// // test([1, 2]); //1, 2
// test([1]); // 解构失败
// test([1, 2, 3]); // 不完全解构

// // 对象解构赋值
// function test({ x, y }) {
//     console.log(x, y);
// }
// test({ y: 2, x: 1 });
// test({ x: 3 });
// test({ x: 3, y: 4, z: 5 });

// // 练习1 下面打印的是什么
// function foo({ x = 10 } = {}, { y } = { y: 10 }) {
//     console.log(x, y);
// }
// foo(); // 10 10
// foo({}, {}); // 10 undefined
// foo({ x: 2 }, { y: 3 }); // 2 3
// // 模式匹配，一定更要记住 = 号两边模式一样，属性名一样，ES6下，如果属性名和值一致，写一个就行

//=========================================

// // 解构的隐式转换
// // 方式1
// const [a, b, c, d, e] = 'hello';
// console.log(a, b, c, d, e);
// let { length: len } = 'hello';
// console.log(len);

// // 方式2
// // 123 被隐式转换为包装类
// let { toString: s } = 123;
// console.log(s === Number.prototype.toString); // true

// let { toString: s } = false;
// console.log(s === Boolean.prototype.toString); // true
// // 布尔值， number, string 都能进行隐式转换


// // 不能进行隐式转换的值 undefined null
// let { prop } = undefined;
// console.log(prop); //TypeError: Cannot destructure property 'prop' of 'undefined' as it is undefined.

// let { prop } = null;
// console.log(prop); //TypeError: Cannot destructure property 'prop' of 'null' as it is undefined.