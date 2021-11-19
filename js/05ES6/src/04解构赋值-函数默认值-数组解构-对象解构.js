// // 补充
// // TDZ -> Temporam Dead Zone -> 暂时性死区
// var i = 1; {
//     let i = i; // i 没有赋值之前就被引用，所以报错
//     console.log(i); // Reference: cannot access 'i' before initialzation
// }

// // 参数默认值问题
// function foo(x, y) {
//     x = x || 1;
//     y = y || 2;
//     console.log(x + y);
// }

// foo(); //3
// foo(5, 6); //11
// foo(5); //7
// foo(null, 6); //7
// foo(0, 5); //6  应该是5，程序有误
// // falsy -> 虚值 -> 在boolean转换时被转换为false的值，上面0作为参数就是虚值

// // 上式如何改进 ES5 的
// function foo(x, y) {
//     var a = typeof(arguments[0]) !== 'undefined' ? arguments[0] : 1;
//     var b = typeof(arguments[1]) !== 'undefined' ? arguments[1] : 2;
//     console.log(a + b);
// }
// foo(); //3
// foo(5, 6); //11
// foo(5); //7
// foo(null, 6); //6 
// foo(0, 5); //5

// // ES6 的改进方法
// // 传默认值的方式
// function foo(x = 1, y = 2) {
//     console.log(x + y);
// }
// foo(); //3
// foo(5, 6); //11
// foo(5); //7
// foo(null, 6); //6 
// foo(0, 5); //5

// ES6 形参 
// // 举例 1
// let x = 1;

// function foo(y = x) { // 这里的x找的是父级作用域中的x
//     let x = 2;
//     console.log(y);
// }
// foo(); //1

// // 示例 2

// ES6 手册说 -> 形参(x = 2) 是一个单独的作用域
// 但是下式证明 (x = 2) 也是在函数作用域之内，参数提升，参数赋值时执行了let x  = 2,所以在函数中用let x = 3 时报错
// function foo(x = 2) {
//     let x = 3;
//     console.log(x); //SyntaxError: Identifier 'x' has already declard, 报错原因是因为形参x 与 let x 重名
// }
// foo(); //报错
// foo(1); //报错

// // //示例3
// let x = 1;

// function foo(x = x) { // 由报错推断，形参x是使用let x来声明的
//     console.log(x); // RenferenceError: cannot access 'x' before initialization
// }
// foo();

// // 练习：下面打印的是什么
// var w = 1,
//     z = 2;

// function foo(x = w + 1, y = x + 1, z = z + 1) {
//     console.log(x, y, z);
// }
// foo(); // 报错

// // let 和 var 的报错区别
// let i = 3; {
//     var i = i;
//     console.log(i); //SyntaxError: Identifier already been declared
// }

// var i = 3; {
//     let i = i;
//     console.log(i); // ReferenceError: cannot access 'i' before initialization
// }

// // 惰性求值 -> 每一次都需要重新计算表达式的值，不缓存
// let a = 99;

// function foo(b = a + 1) {
//     console.log(b);
// }
// foo(); // 100
// a = 100;
// foo(); // 101

//=========================================

// // // 解构赋值
// // // 结构化赋值 -> 模式匹配
// // let [a, b, c] = [1, 2, 3];
// // console.log(a, b, c);
// let [a, [b, c], [d, [e, f, [g]]] ] = [1, [2, 3], [4, [5, 6, [7]]]];
// console.log(a, b, c, d, e, f, g); //1 2 3 4 5 6 7

// //解构失败 -> 变量多了，值少了
// let [a, [b, c], [d, [e, f, [g]]] ] = [1, [2, 3], [, [, , [7]]]];
// console.log(a, b, c, d, e, f, g); //1 2 3 undefined undefined undefined 7

// // 不完全解构 -> 变量少了，值多了
// let [a, [b, c], [, [, , [g]]] ] = [1, [2, 3], [4, [5, 6, [7]]]];
// console.log(a, b, c, g); // 1 2 3 7

// // 解构的默认值
// let [a = 6] = [1];
// console.log(a); // 1

// let [b = 6] = [];
// console.log(b); // 6

// let [a, b = 2] = [1];
// console.log(a, b); // 1 2

// let [a, b = 2] = [1, null];
// console.log(a, b); // 1 null

// let [a, b = 2] = [1, undefined];
// console.log(a, b); // 1 2

// let [a, b = 2] = [1, false];
// console.log(a, b); // 1 false

// let [a, b = 2] = [1, '1'];
// console.log(a, b); // 1 '1'

// // 默认值为函数
// function test() {
//     console.log(10);
// }
// let [x = test()] = [1];
// console.log(x); // 1 -> 有值打印值，无值打印默认值

// let [x = test()] = []; // 解构失败
// console.log(x); // 10 undefined -> 函数默认返回值是undefined

// let [x = 1, y = x] = [];
// console.log(x, y); // 1 1

// let [x = 1, y = x] = [2];
// console.log(x, y); // 2 2

// let [x = 1, y = x] = [1, 2];
// console.log(x, y); // 1 2

// let [x = y, y = 1] = [];
// console.log(x, y); // ReferenceError: cannot access 'y' before initialization

//=========================================

// 对象解构
// // ES5 定义对象
// let obj = {};
// // let obj1 = new Object();
// // let obj2 = Object.create(原型);
// // 对象增删改查
// obj.name = 'jayden';
// obj['name'] = 'alexis';
// delete obj.name;

// var name = 'jayden';
// var age = 30;
// var person = {
//     name: name,
//     age: age,
//     sex: 'female',
//     eat: function(){
//         console.log(1);
//     }
// }
// console.log(person);

// // ES6 对象的书写形式
// var name = 'jayden';
// var age = 30;
// var person = {
//     name,
//     age,
//     sex: 'female',
//     eat() {
//         console.log(1)
//     }

// }
// console.log(person);
// person.eat();

// // ES6 属性拼接
// let firstName = 'jay';
// let secondName = 'den';
// let name = 'jayden';
// let person = {
//     [firstName + secondName]: name,
//     [firstName + 'den']: name,
//     ['jay' + 'den']: name,
// }
// console.log(person); //{ jayden: 'jayden' }

// // ES6 对象解构
// // 1. 结构要完全一致
// // 2. 属性名要一致
// let { a: a, b: b, c: c } = { a: 1, b: 2, c: 3 }
// console.log(a, b, c); //1 2 3

// // 变量和属性名一致，可以简写
// let { a, b, c } = { a: 1, b: 2, c: 3 };
// console.log(a, b, c); //1 2 3

// // 对象解构失败
// let { a, b, c, d, e, f } = { a: 1, b: 2, c: 3 };
// console.log(a, b, c, d, e, f); // 1 2 3 undefined undefined undefined
// // 对象不完全解构
// let { a = 2, b, c } = { b: 2, c: 3, e: 4, f: 5 };
// console.log(a, c); // 2 3

// // 数组解构存在顺序，对象解构不存在顺序，因为有属性名
// let { a = 2, b, c } = { c: 3, a: 1, b: 2 };
// console.log(a, b, c);

// // 练习
// //1  拿到所有course
// var data = [{
//         "id": "1",
//         "course": "course 1",
//         "teacher": "jayden",
//         "tech": "hand"
//     },
//     {
//         "id": "2",
//         "course": "course 2",
//         "teacher": "alexis",
//         "tech": "hand"
//     },
//     {
//         "id": "3",
//         "course": "course 3",
//         "teacher": "ella",
//         "tech": "hand"
//     },
// ];
// let [{ "course": course1 }, { "course": course2 }, { "course": course3 }] = data;

// console.log(course1, course2, course3);

// // 2 对象解构
// var person = {
//     name: 'jayden',
//     age: 40,
//     daughter: {
//         name: 'alexis',
//         age: 30,
//         daughter: {
//             name: 'ella',
//             age: 20
//         }
//     }
// }
// var { daughter: { daughter: dg2 } } = person;
// //var { daughter: { daughter: dg2 } } = person; // var 也一样
// console.log(dg2); //{ name: 'ella', age: 20 }
// //     let { name: name1, daughter: { name: name2, daughter: { name: name3, age: age3 } } } = person;
// //     console.log(name1, name2, name3, age3); //jayden alexis ella 20

//=========================================

// //解构定义变量的运用
// // 在node.js 中就这样用，
// // 模拟
// var person = {
//     name: 'jayden',
//     age: '30',
//     doughter: {
//         name: 'alexis',
//         age: 20,
//         sex: 'female'
//     }
// }
// const { doughter } = person;
// console.log(doughter); //{ name: 'alexis', age: 20, sex: 'female' }