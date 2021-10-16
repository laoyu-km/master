// 初始化函数 -> 默认值
// 如果不设置，参数的默认值是undefined

// // 形参内初始化
// // 这种写法是ES6才开始能形参内初始化
// // 需要支持ES6的浏览器产能解释
// function test(a = 1, b = 1) { // 参数初始化
//     console.log(a);
//     console.log(b);
// }

// test(); // 1 1

// 参数初始化, 传参
// 情况1. 如下
// function test(a = 1, b) { // 形参b未初始化，默认值为undefined
//     console.log(a);
//     console.log(b);
// }
// // 形参与实参有映射关系，那边不为undefined,就取那边的值
// test(undefined, 2); // 1 ,2
// test(null, 5); // null 5 -> null不会被当做undefined处理
// test(9, NaN); // 9 NaN -> NaN不会被当做undefined处理

// // 情况2
// function test(a = 1, b) {
//     console.log(a, b);
//     console.log(arguments[1] === b);
//     arguments[1] = 10;
//     console.log(a, b);
//     console.log(arguments[1] === b);
// }
// // test(arguments[0] = 10, 3);//ReferenceError: arguments is not defined
// // 从结果可看到，实参传入后，实参与形参映射结束，修改实参不影响形参值
// test(3, 2); // 3 2 true 32 false

// ES5 初始化方法
// ** ES5 中形参和实参一直保持映射关系**
// // 方法1；
// function test(a, b) {
//     var a = arguments[0] || 1;
//     var b = arguments[1] || 2;
//     console.log(a, b);
// }

// // 方法2
// function test(a, b) {
//     var a,
//         b;
//     // if (typeof(arguments[0]) !== 'undefined') {
//     //     a = arguments[0];
//     // } else {
//     //     a = 1;
//     // }

//     // if (typeof(arguments[1]) !== 'undefined') {
//     //     b = arguments[1];
//     // } else {
//     //     b = 3;
//     // }

//     a = typeof(arguments[0]) !== 'undefined' ? arguemnts[0] : 1;
//     b = typeof(arguments[1]) !== 'undefined' ? arguemnts[1] : 3;

//     console.log(a, b);
// }
// test(3, 4);


// // 递归
// // 函数自己调用自己，必须设定结束条件
// // 递归要慎用

// // 递归求阶乘
// function jiec(n) {
//     if (n == 1) {
//         return 1
//     } else {
//         return n * jiec(n - 1);
//     }
// }

// console.log(jiec(5));
// // 递归求菲波那切数列
// function fblc(n) {
//     if (n <= 0) {
//         return 'n 有误';
//     } else if (n <= 2) {
//         return 1;
//     } else {
//         return fblc(n - 1) + fblc(n - 2);
//     }
// }
// console.log(fblc(10));


/**
 * 预编译:
 */

//JS 代码执行过程
// 1.检查通篇的语法错误；
// 1.5 预编译的过程；
// 2 解释一行...执行一行；

// //现象1
// // 函数定义在函数调用之下，函数任然能整正常执行
// test(); // 1

// function test() {
//     console.log(1);
// }

// // 现象2
// // var name 如果不初始化在调用语句前或者后都是一样
// console.log(a); // undefined
// var a = 5; // 5

// var b;
// console.log(b); //undefined

// console.log(c); //referenceError


// 由上推断：
// 函数声明整体提升，变量只有声明被提升，赋值不提升

// // 特例
// console.log(a); // 打印出a函数

// function a(a) {
//     var a = 10;
//     var a = function() {}
// }

// var a = 1;

// ==============================================

// // 暗示全局变量 imply global variable
// // 示例
// a = 1; // 未声明，但是被赋值 -> a = window.a
// var b = 2; // 声明也属于window对象 -> b = window.b
// console.log(a);

// //原因，不声明就赋值的变量默认属于全局对象window，也就是隐式的成为全局变量；
// winidow = {
//     a: 1,
//     b: 2
// }

// // 示例2
// // 未声明的 b -> 暗示全局变量
// function test() {
//     var a = b = 1;
// }
// test();
// //console.log(a); //ReferenceError
// console.log(b); // 1
// console.log(window.a); // undefined
// console.log(window.b); // 1


// // 预编译
// // AO activation object  活跃对象， 函数上下文
// // 步骤：
// // 1. 创建AO对象
// // 2. 寻找函数的形参和变量声明,放入AO: 
// //    a: undefined,
// //    b: undefined,
// //    d: undefined,
// // 3. 实参值赋值给形参
// //    a: undefined -> 2 
// // 4. 寻找函数声明，赋值 , 放入AO
// //    a: undefined -> 2 -> function a(){},
// //    d: undefined -> function d(){}
// // 5. 执行
// //    a: undefined -> 2 -> function a(){} => 1,
// //    b: undefined => function(){},
// //    d: undefined -> function d(){} //不变
// // ** 赋值操作不会被预编译，只在执行阶段顺序执行

// function test(a) {
//     console.log(a); // function a(){}
//     var a = 1;
//     console.log(a); // 1

//     function a() {}
//     console.log(a); // 1
//     var b = function() {}
//     console.log(b); // function(){}

//     function d() {}
//     console.log(d); // function d(){}
// }

// test(2);


// // 案列1
// // 1 创建AO对象
// // 2 寻找函数形参和变量声明, 放入AO   
// //  a -> undefined
// //  b -> undefined
// //  c -> undefined
// //  d -> undefined
// // 3 实参值赋值给形参
// //  a -> undefined -> 1
// // 4 寻找函数声明，赋值, 放入AO
// //  b -> undefined -> function b(){}
// //  d -> undefined -> function d(){}
// // 5 执行
// //  a -> undefined -> 1 => 5
// //  b -> undefined -> function b(){} => 6 => function(){}
// //  c -> undefined => 0
// //  d -> undefined -> function d(){} 

// function test(a, b) {
//     console.log(a); // 1
//     console.log(c); // undefined
//     c = 0;
//     console.log(c); // 0
//     var c;
//     a = 5;
//     console.log(b); // function b(){}
//     b = 6;
//     console.log(b); // 6

//     function b() {}

//     function d() {}
//     console.log(b); // 6

//     b = function() {}
//     console.log(b); //function(){}
// }

// test(1);


// //案例 2 全局预编译
// // 1. 创建GO -> global object 全局上下文
// // 2. 寻找变量声明    
// //     a -> undefined
// // 3. 寻找函数声明，赋值
// //     a -> undefined -> function a(){}
// // 4. 执行
// //     a -> undefined -> function a(){} => 1
// // ** Go === window **
// var a = 1;

// function a() {
//     console.log(2);
// }

// console.log(a); // 1

// // 案例3
// console.log(a, b); // function a(){}  undefined
// function a() {}
// var b = function() {}

// // 案列4
// var b = 1

// function test() {
//     var a = 2,
//         b = 3;
//     console.log(b); // 3
// }

// test();


// // 案例5
// var b = 3;
// console.log(a); // function a(){}

// function a(a) {
//     console.log(a); // function a(){ var b = 5}
//     var a = 2;
//     console.log(a); // 2

//     function a() {
//         var b = 5;
//         console.log(b); // 未调用 不执行
//     }
// }

// a(1);


// //案例6
// a = 1;

// function test() {
//     console.log(a); // undefined
//     a = 2;
//     console.log(a); // 2
//     var a = 3;
//     console.log(a); //3
// }

// test();
// var a;


// // 案例7
// function test() {
//     console.log(b); // undefined
//     if (a) {
//         var b = 2;
//     }

//     c = 3;
//     console.log(c); // 3
// }

// var a;
// test();
// a = 1;
// console.log(a); // 1



// ==============================================
// // 作业
// // 1.
// function test() {
//     return a; 
//     a = 1;

//     function a() {
//         var a = 2;
//     }
// }
// console.log(test()); // function a(){}

// //2
// function test() {
//     a = 1;

//     function a() {}
//     console.log(a); // 1
//     var a = 2;
//     return a;
// }
// console.log(test()); //2

// // 3.
// a = 1;

// function test(e) {
//     function e() {}
//     // console.log(arguments[0]); // function e(){}
//     arguments[0] = 2;
//     // var e; // 函数内声明e，结果一样
//     console.log(e); // 2
//     if (a) {
//         var b = 3;
//     }
//     var c;
//     a = 4;
//     var a;
//     console.log(b); // undefined
//     f = 5;
//     console.log(c); // undefined
//     console.log(a); // 4
// }
// var a;
// test(1);
// console.log(a); // 1
// console.log(f); // 5



// // ==============================================
// // 面试题
// // 1
// var a = false + 1;
// console.log(a); //1

// // 2
// var b = false == 1;
// console.log(b); // false

// //3
// // typeof()出来的是字符串，+''出来的也是字符串，所以通过了
// if (typeof(a) && (-true) + (+undefined) + '') {
//     console.log('通过了'); //通过了
// } else {
//     console.log('没通过');
// }
// console.log((-true) + (+undefined) + ''); // 'NaN'

// // 4
// if (1 + 5 * '3' == 16) {
//     console.log('通过了'); // 通过了
// } else {
//     console.log('未通过');
// }

// // 5
// console.log(!!' ' + !!'' - !!false || '通过了'); // 1
// console.log(!!' '); // true


// // 结合律
// // 1. 语句运行都是从左到右的
// // 2. 运算符优先级不是优先到整个表达式最前面，而是类似数学中的结合律优先
// // 例1
// var a = 1,
//     b = 2,
//     c = 3,
//     d;

// // 从左到右运算，先算 a+b,
// // 由于（）优先级高，所以再算c + 2
// // 最后 两边和相加
// d = a + b + (c + 2);
// console.log(d);


// // 例2
// // 下面表达式从左到右运算，先判断window.a，由于window.a==undefined,所以执行||后面的语句
// // 如果没有(), 先执行的是|| 右边的 window.a,返回undefined, 最后结果是 undefined = '1'
// // 加了()后，|| 右边执行的是window.a = '1', 所以最终打印出1
// window.a || (window.a = '1');
// console.log(window.a); // 1

// // 例 3
// // 原理与例2 相同
// var b = 2;
// var c = 5 && b = 3; //SyntaxError: Invalid left-hand side in assignment
// console.log(b);

// // 特例
// // ++ -- 与 优先级 无关
// // 后置++，在参与运算后，再将a进行++
// // 前置++，在参与运算前，将a进行++
var a = 2;
// var b = a++ + 5; // 3 7
// var b = (a++) + 5; // 3 7 ,() 无用

console.log(a, b);

// ++ 小练习
// var c = 2;

// // 1. c == 2 参与运算， c++ -> c == 3
// // 2. c == 3 参与运算， c++ -> c == 4
// // 3. ++c -> c == 5 参与运算
// // 4. 2 + 3 + 5 == 10
// var b = c++ + c++ + ++c; // 10 5