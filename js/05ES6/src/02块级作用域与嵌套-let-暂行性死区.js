// // let 关键字
// // kiss 原则： keep it simple and stupid
// // es5 处理变量污染使用的是回调函数封闭一个空间

// // ES6 处理变量污染的办法是 let
// // let -> 块级作用域

// // 块级作用域
// // 1
// if (1) {

// }

// //2
// for (; 1;) {

// }

// //3
// {

// }

// // let 的特点
// // 1. 同一作用域下不允许重复申明
// 同一作用域：全局，函数，块
// let a = 1;
// let a = 2;
// console.log(a); //报错

// function test() {
//     let a = 1;
//     // let a = 2;
//     var a = 2;
// }

// test(); // syntaxError: Identifier 'a' has already been declared

// // 练习
// 1
// function test(a) { // a 在预编译的时候已经被定义了
//     let a = 10;
//     console.log(a);
// }
// test(); // 报错

// //2
// function test(a) {
//     {
//         let a = 10;
//     }
//     console.log(a);
// }
// test(); //undefined

// //3
// function test(a) {
//     {
//         let a = 10;
//         console.log(a);
//     }
// }
// test(); //10

// // let的特点2
// // let 预编译时不会提升，会产生一个暂时性死区
// console.log(a); // 报错
// let a = 10;

// function test() {
//     console.log(a);
//     let a = 10;
// }
// test();

// //练习
// //1
// var a = a;
// console.log(a); //undefind

// let b = b;
// console.log(b); // 报错

// //2
// function test(x = y, y = 2) { // es6 形参初始化应该是在预编译第一步就进行
//     console.log(x, y); // y 报错
// }
// test(); // 报错，y出错，

// // 如何不报错
// function test(x = 2, y = x) {
//     console.log(x, y);
// }
// test();

// //3
// // 暂时性死区造成typeof a 报错
// console.log(typeof a); // 报错
// let a;

// //let 第三个特性
// // let 只能在当前的作用域下生效

// //1
// {
//     let a = 2;
// }
// console.log(a); // 报错

// //2
// if(1){
//     let a = 2;
// }
// console.log(a);

// //3
//死循环没有崩溃的原因：node 是单核的，只让cpu的一核运转，如果是浏览器的话就会崩溃
// for (; 1;) {
//     let a = 1;
//     // break; // 加了break就会报错，结束循环
// }
// console.log(a); //不报错，上面死循环走不到这一步

// //4 
// for (let i = 0; i < 10; i++) {

// }
// console.log(i); // referceError i is not defined

// //5 为什么循环出不同的值
// var arr = [];
// for (var i = 0; i < 10; i++) {
//     arr[i] = function() {
//         console.log(i);
//     }
// }

// for (var j = 0; j < 10; j++) {
//     arr[j](); // 10 个 10
// }

// for (var i = 0; i < 10; i++) { // i 被覆盖了
//     arr[i](); // 0-9
// }

// //6 
// for (var i = 0; i < 10; i++) {
//     // var i = 'a'; //结果相同 -> 变量声明提升，覆盖之前的var i
//     i = 'a';
//     console.log(i); // a
// }
// console.log(i); // NaN : 'a'++ -> NaN
// // 验证 string++ -> NaN
// var b = 'a';
// console.log(b++);

// // 上式改为 let
// for (let i = 0; i < 10; i++) {
//     var i = 'a'; // 报错 i has already been declared
//     // i = 'a'; //a 
//     console.log(i);
// }
// // console.log(i); //ReferenceError i is not defined

// // 上式在修改
// for (let i = 0; i < 10; i++) {
//     let i = 'a';
//     console.log(i); // 10 个 a -> 两个i不在同一作用域下,但是又都不是全局作用域
// }
// console.log(i); // ReferenceError i is not defined

// // 上式中 for(let i = 0; i < 10; i++)的作用域相当于一个父级作用域但是又不是全局作用域，相当于如下
// if (1) {
//     let a = 1; {
//         let a = 10;
//         console.log(a);
//     }
// }

// //1. let 本质上就是为了js增加一个块级作用域
// if (1) {
//     let a = 1;
//     (function() {
//         var a = 10;
//         console.log(a); // 10
//     })();
//     console.log(a); //1
// }

// if (1) {
//     let a = 1;
//     (function() {
//         a = 10;
//         console.log(a); // 10
//     })();
//     console.log(a); //10 : 外层a被赋值为10
// }

// if (1) {
//     let a = 1; 
//         a = 10;
//         console.log({a);
//     }
//     console.log(a);
// }

// // 块级作用域中声明函数
// // ES6 块级作用域中允许声明函数
// {
//     function test() {
//         console.log('1');
//     }
// }

// if(1){
//     function test(){
//         console.log('a');
//     }
// }

// try{
//     function test(){
//         console.log('1');
//     }
// }catch{
//     function test(){
//         console.log('2')
//     }
// }finally{
//     function test(){
//         console.log('3');
//     }
// }

// // ES5 不允许在块级作用域中声明函数，ES6做出了妥协，使用函数表达式
// // 总结: 不建议在块级作用域中使用函数声明方式，建议使用函数表达式
// {
//     var ifvar = function test() {
//         console.log('1');
//     }
// }

// if (1) {
//     var fun = function test() {
//         console.log('a');
//     }
// }

// try {
//     var tryfun = function test() {
//         console.log('1');
//     }
// } catch {
//     var catchfun = function test() {
//         console.log('2')
//     }
// } finally {
//     var finallyfun = function test() {
//         console.log('3');
//     }
// }

// 块级作用域中没有返回值 -> 没有return
// 在草案中用do来实现跨级作用域的返回值，但是没有被浏览器兼容，所以不要用

// 块级作用域 不等于 匿名函数的立即执行