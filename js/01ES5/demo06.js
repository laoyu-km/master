// /**
//  * 作用域：
//  * 预编译创建的AO 和 GO，解决作用域和作用域链的相关问题
//  * AO -> function， 每个function都类似独立的仓库，互补影响
//  */


// // 作用域:
// // JS 中 function 是一种对象类型(应用类型)
// // 是对象就一定有属性和方法
// // 对象有一些属性是我们无法访问的 -> 这类属性是JS引擎内部的隐式属性；
// // 作用域相关的隐式属性 -> [[scope]]

// // [[scope]] :
// // 1. 是函数创建时，生成的一个JS内部的隐式属性；
// // 2. 该属性是函数存储作用域链的容器，存储内容：
// //  AO：函数的执行期上下文
// //  GO: 全局的执行期上下文
// // 3. 函数执行完成以后，AO 要被销毁, AO是一个即时的存储容器
// // 4. 作用域链像一个数组

// // 示例
// // 当a函数被定义时：
// //  1. 系统生成[[scope]]属性，保存该函数的作用域链；
// //  2. 该作用域链的第0位存储当前环境下的全局执行期上下文 GO
// //  3. GO 里存储全局下的所有对象，包含函数 a 和 全局变量 c
// // ** 每一个函数在定义时就包含了全局上下文 GO , 也就是说函数还没哟执行时就已经包含了GO**

// // 当a函数被执行时（前一刻）
// //  1. 开始预编译， 生成AO
// //  2. 作用域链的第0位变为AO，GO到作用域链的第1位
// //  3. 查找变量 -> 从a函数的[[scope]]存储的作用域链中从上到下依次查找
// // ** 每一个函数在被执行时必然都包好自己的AO 和 全局的GO，并且AO在GO之前 **

// // 当b函数被定义时：
// // 此时b函数生成的[[scope]]属性存储的作用域链 == a函数被执行时的作用域链

// // 当b函数被执行时(前一刻)：
// // 1. 开始预编译，生成b函数的AO
// // 2. b 的[[scope]] 存储函数b的AO至 b 函数作用域链的 0 位置
// // 3. b的作用域链中的 a 的 AO 和全局的 GO，往下顺移

// // 当b函数执行结束后：
// // b 函数的AO被销毁，作用域链回归到b函数被定义时的状态

// // 当a函数执行结束时：
// // a 函数的AO被销毁，a函数作用域链回归到被定义时的状态
// // a 函数AO销毁的同时 b函数的[[scope]]也被销毁

// // 注意
// // 函数声明 是在 全局 或者 上级函数 预编译时就定义了
// // 函数表达式 是在 全局执行 或者 上级函数执行时才被定义
// // 函数定义时已经有[[scope]]属性，有作用域链了，但是此时函数并不做自己内部的预编译
// // 函数在被调用时，首先函数自己做预编译，此时才生成函数自身的AO，函数的[[scope]]属性存储的作用域链才被修改

// // 问题 ：
// // 1. b 作用域链里面存储的 a 的 AO 与 a 作用域链里存储的a的AO是通过一个吗？
// // 是的，使用的是引用值，存储的 a 的 AO 的地址

// //2. 为什么a函数不能访问b函数内的变量
// // 因为a函数作用域链内没有b函数的AO
// function a() {
//     function b() {
//         var b = 2
//     }
//     var a = 1;
//     b();
// }
// var c = 3;
// a();

// // 练习1：
// function a() {
//     function b() {
//         function c() {

//         }
//         c();
//     }
//     b();
// }
// a();



// /**
//  * 闭包
//  * 当 test1 函数的内部函数 test2 被返回到a的外部并保存时，一定会差生闭包；
//  * 闭包会使原来的作用域链不释放；也就是导致test1运行结束后, test2 的作用域链不释放
//  * 如上导致test1的AO不能释放, 但是test1 与 test1的 AO 结束了关联
//  * test1 的 AO 只与 test2 关联, 此时，test2 可以 访问 test1 定义的变量
//  * 如上所说，test1 外部也就可以访问 test1 内部的变量；
//  * 当 test2 执行结束后，test2的AO被销毁，但是test1的AO还一直存在
//  * 所以过渡的闭包可能会导致内存泄漏, 或者加载过慢
//  */
// function test1() {
//     function test2() {
//         var b = 2;
//         a = 2;
//         console.log(a);
//     }
//     var a = 1;
//     return test2;
// }
// var c = 3;
// var test3 = test1();
// test3();

// // 实例1
// // 闭包可以缓存 n 的数据
// function test() {
//     var n = 100;

//     function add() {
//         n++;
//         console.log(n);
//     }

//     function reduce() {
//         n--;
//         console.log(n);
//     }

//     return [add, reduce];
// }

// var arr = test();
// arr[0]();
// arr[1]();

// // 案例2
// function breadMgr(num) {
//     var breadNum = arguments[0] || 10;

//     function supply() {
//         breadNum += 10;
//         console.log(breadNum);
//     }

//     function sale() {
//         breadNum -= 3;
//         console.log(breadNum);
//     }

//     return [supply, sale];
// }

// var breadMgr = breadMgr(50);
// console.log(breadMgr);
// breadMgr[0]();
// breadMgr[1]();


// // 案例 3
// function sunSched() {
//     var sunSched = '';

//     var operation = {
//         setSched: function(thing) {
//             sunSched = thing;
//         },

//         showSched: function() {
//             console.log("My schedule on sunday is " + sunSched);
//         }
//     }
//     return operation;
// }

// var sunSched = sunSched();
// console.log(sunSched);

// sunSched.setSched('studying');
// sunSched.showSched();


// // 案例 4
// function a(f) {
//     var f = arguments[0] || 3;

//     var obj = {
//         b: function() {
//             var f1 = 22;

//             var f2 = {
//                 fun: function() {
//                     f = f1 + 20;
//                     console.log(f);
//                 }
//             }
//             return f2;
//         }
//     }
//     return obj;
// }

// var d = a(10).b();
// console.log(d);
// d.fun(); // 42