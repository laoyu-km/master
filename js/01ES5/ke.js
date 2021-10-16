//// {} + []
//console.log({} + []);//[object Object]
//console.log([] + {});//[object Object]


// // 为什么不相等
// // 10进制整数转2进制除以2 取余
// // 10进制小数转2进制小数是乘以2 取整，
// // 0.1,0.2 转2进制小数是乘不尽的，但是物理存储有限
// // 2进制码相加后，与0.3 的2进制码出现误差，所以是false
// console.log(0.1 + 0.2 == 0.3); //false

// // 预编译5步骤
// // 1. 创建AO对象
// // 2. 寻找形参和变量声明
// // 3. 形参和实参赋值
// // 4. 寻找函数声明
// // 5. 运行
// function test(a) {
//     var a = 1;
//     console.log(a);
//     a = 3;
//     console.log(a);
//     var b = 4;
//     console.log(b);

//     function a() {
//         b = 6;
//         console.log(b);
//     }
//     a()
// }
// console.log(b);
// test(10);

// // 闭包问题
// // 遵循MDN的说法
// // 函数的执行导致函数被定义，就会产生闭包


// //实参和形参
// function test(a, b = 10) {
//     a = 10;
//     arguments[1] = 20;

//     console.log(a, b);
// }

// test(1, 2);



// // 参数默认值用function是大忌,不要这样写
// function foo(x, y = function() {
//     x = 2;
// }) {
//     y();
//     console.log(x, 3);
// }

// foo(1); // 2, 3



// // 多了一层作用域
// function foo(x, y = function() {
//     x = 2;
// }) {
//     y();
//     var x
//     console.log(x, 3);
// }

// foo(1); // 1, 3