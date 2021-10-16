// // js 错误信息类型
// // SyntaxError 语法错误
// // 变量名不规范
// var 1 = 1; // SyntaxError: unexpected number
// var 1ab = 1; // SyntaxError: Invalid orunexpected token

// // 关键字不可赋值
// new = 5; // SyntaxError: unexpected token

// // 基本语法错误
// var a = 5: // SyntaxError: unexpected token

// // 函数名不规范
// function 1test() {} // SyntaxError: unexpected token

// // ReferenceError 引用错误
// // 1. 变量或函数名未声明
// test(); // ReferenceError: test is not defined
// console.log(a) //ReferenceError: a is not defined

// // 2. 给无法赋值的对象赋值的时候
// var a = 1 = 2; // ReferenceError: Invalid left-hand side in assignment;

// var a = 1;
// console.log(a) = 1; //ReferenceError: Invalid left-hand side in assignment

// //RangeError 范围错误
// // 数组长度为负数
// var arr = [1, 2, 3];
// arr.length = -5;
// console.log(arr); // RangeError: Invalid array length

// // 对象方法参数超出可行范围
// var num = new Number(66.66);
// console.log(num.toFixed(-1)); // RangeError: toFixed() digits argument must be between 0 and 100


// // TypeError 类型错误
// //1. 调用不存在的方法
// 123(); // TypeError: 123 is not a function
// var obj = {};
// obj.say(); // TypeError: obj.say is not a function, js把say看作是obj的一个属性，但是后面又有括号，所以报TypeError

// //2.实例化原始值
// var a = new 'string'; // TypeError: 'string' is not a constructor


// // URIError URI错误
// // URI: UNIFORM RESOURCE IDENTIFIER 统一资源标识符
// // URL: UNIFORM RESOURCE LOCATOR 统一资源定位符
// // URN: UNIFORM RESOURCE NAME 统一资源名称
// // URI(URL, URN)->URL 和 URN 是 URI 的子集
// /** 
//  * URL:
//  *  http://www.baidu.com/new#today
//  *  ftp://www.baidu.com/ftp#developer
//  * */

// /**
//  * URN: 是一个唯一识别名称，不能直接访问或执行，只是一个名字
//  *   www.baidu.com/ftp#developer -> ID
//  *   href="tel:13900000000"
//  *   href="mailto:8888888@qq.com"
//  */

// // // encodeURI() 把URL当中的中文转化为中文字符编码
// // // decodeURI() 把中文字符编码转化为中文
// // var myUrl = 'http://www.baidu.cin?name=刘德华';
// // var newUrl = encodeURI(myUrl);
// // var deNewUrl = decodeURI(newUrl)
// // console.log(newUrl);
// // console.log(deNewUrl);

// // var myUrl1 = '刘德华';
// // var newUrl1 = encodeURI(myUrl1); //%E5%88%98%E5%BE%B7%E5%8D%8E
// // var deNewUrl1 = decodeURI(newUrl1);
// // console.log(newUrl1);
// // console.log(deNewUrl1);

// // URI 编码报错示例
// // 给一个乱写的编码
// var str = decodeURI('%fdsdsf%'); // URIError: URImalformed

// // //EvalError eval函数执行错误
// // // eval() 不推荐使用
// // eval('var a = 1; console.log(a)'); // 可以打印出a

// // var obj = {
// //     a: 1,
// //     b: 2
// // }

// // console.log(eval('obj')); //{a: 1, b: 2}
// // console.log(eval(obj)); //{a: 1, b: 2}

// // eval()最大的作用

// // json 对象
// // 特点: 不能有方法, 是用来存储数据用的
// var obj = { //大括号内包括大括号就是一个json对象
//     "a": 1, // 键名用双引号是为了在与后端交互数据时不产生异议
//     "b": 2
// }

// var obj1 = { // 大括号内包括大括号不是json对象，因为json对象不能有方法 "a": 1,
//         "a": 1,
//         "b": 2,
//         "say": function() {}
//     }
//     // json 字符串 示例
// var jsonStr = '[]';
// var jsonData = '[' +
//     '{ ' +
//     '"name": "abc",' +
//     '},' +
//     '{ ' +
//     '"name": "bcd",' +
//     '},' +
//     '{ ' +
//     '"name": "efg",' +
//     '},' +
//     ']';
// console.log(jsonData)

// var data = eval('(' + jsonData + ')'); //eval函数能快速将json字符串转化为对象
// console.log(data);

// for (var i in data) {
//     var item = data[i];
//     console.log(item.name);
// }

// /**
//  * 为什么不推荐使用eval()
//  * 1.语法规范非常不好
//  * 2.不好调试
//  * 3.带来性能问题,替代品JSON.parse()
//  * 4.代码压缩，混淆时 会出错
//  * 5.安全性问题
//  */

// // 以上错误可以人为抛出错误
// // 认为抛出错误就是根据需要从7中error构造函数中选择，并new出来
// var error = new Error('代码错误了');
// console.log(error);

// var error1 = new SyntaxError('语法错误了');
// var error2 = new ReferenceError('引用错误了');
// var error3 = new RangeError('范围错误了');
// var error4 = new TypeError('类型错误了');
// var error5 = new URIError('URI错误了');
// var error6 = new EvalError('Eval错误了');

// ================================================================

// // 主动抛出错误的方法：try catch finally throw
// // 系统一旦自动抛出的错误，程序是无法运行的，有什么方法能让我们在系统报错时还可以运行
// // 示例1
// try {
//     console.log('正常执行1');
//     console.log(a); // a 报错后就会跳到catch内执行
//     console.log(b);
//     console.log('正常执行2');
// } catch (e) {
//     console.log(e); // 打印出的是字符串 
//     console.log(e.name + ':' + e.message);
// } finally { // finally 的意义和直接写在外部的意义差不多
//     console.log('正常执行3'); // 无论try和catch里面的执不执行，finally里面的都执行
// }
// console.log('正常执行4') // 额可以正常执行4

// // 示例2
// var jsonStr = '';
// try {
//     if (jsonStr == '') {
//         throw 'JSON字符串为空';
//     }
//     console.log('我要执行啦！！');
//     var json = JSON.parse(jsonStr);
//     console.log(json);
// } catch (e) {
//     console.log(e); //JSON字符串为空， throw 定义了抛出的错误信息
//     var errorTip = {
//         name: '数据传输失败',
//         errorCode: '10010'
//     }
//     console.log(errorTip);
// }

// ================================================================

// ES5 严格模式

// ECMAScript JavaScript语法规范，
// 97年 -> 1.0
// 98年 -> 2.0
// 99年 -> 3.0  JS通行标准
// 07年 -> 4.0  草案太激进，只有Mozilla支持，因为作者Branden Eich 子Mozilla
// 08年 -> 4.0终止 容易改善的部分放到了3.0中 -> 推出了3.1  被终止的部分给了个版本代号 Harmony
// 3.1 更名为ECMAScript5,但是没发布
// 09年 -> 5.0发布。 Harmony -> 1/2  JS.NEXT  1/2 JS.NEXT.NEXT
// 11年 -> 5.1 发布 ISO国际标准
// 13年 -> ES6 = js.next   js.next.next放到了ES7
// 13年 -> ES6草案发布
// 15年 -> ES6正式发布，也叫ECMAScript2015

// ES5 开始有两种模式 正常模式 严格模式
// IE9及以下不支持严格模式
// 'use strict' 用字符串的方法来申明是最合适的，兼容ES3

// // 启动严格模式的两种方式
// // 1. 在全局最顶端写
// 'use strict'
// // 2. 在function的最顶端写 ,推荐写法
// function test() {
//     'use strict'
// }

// // 严格模式示例 with()不能用
// 'use strict'
// var a = 1;
// var obj = {
//     a: 2
// }

// function test() {
//     var a = 3;
//     // with(window){ // 3
//     // with(obj){  //2
//     with(test) { // 改变作用域，参数是那个作用域，就打印那个作用域的a
//         console.log(a); // 使用了严格模式后，with方法报错
//     }
// }
// test();

// // 严格模式示例 callee 和 caller 不能用
// 'use strict'

// function test() {
//     console.log(arguments.callee());
// }
// test(); //报错

// function test1() {
//     test2();
// }
// test1(); // 报错

// function test2() {
//     console.log(arguments.caller());
// }

// // 严格模式示例 ，变量
// 'use strict'
// a = 1; //报引用错误

// // 严格模式示例 var a = b = 1 报错
// 'use strict'

// function test() {
//     var a = b = 1;
// }
// test();

// // 严格模式示例 this
// 'use strict'

// function test() {
//     console.log(this); // 普通模式下指向的是window
// }
// test(); // undefined
// test.call(1); // 1 , 非严格模式下指向的是值为1的Number对象,包装类
// // 非严格模式下call()出来的东西都会被变成相应的对象形式

// var test1 = new test(); // this 指向了test1


// // 严格模式示例 函数参数不能重复
// 'use strict'

// function test(a, a) {
//     console.log(a);
// }
// test(1, 2); // 报错

// // 严格模式示例  ,对象属性重名，不报错，但是只打印最后一个
// 'use strict'
// var obj = {
//     a: 1,
//     a: 2
// }
// console.log(obj.a); //2

// // 严格模式， eval
// 'use strict'
// eval('var a = 1; console.log(a)'); // 严格模式下，eval 创造单独的作用域
// console.log(a); //ReferenceError: a is not defined


// ================================================================

// //引申： 命名空间
// // 问题，变量或方法重名，只打印最后一个
// var a = 1;
// var a = 2;
// console.log(a); // 只打印2

// function test() {
//     console.log(1);
// }

// function test() {
//     console.log(2);
// }
// test(); // 只打印2

/// // 解决方法是创建命名空间，再不同的作用域来声明同名变量，再想办法让其可在全局调用
// //现在的解决办法1
// window.onload = function() {
//     init();
// }

// function init() {
//     initSlider;
//     initSideBar;
// }

// var initSlider = (function() {
//     var a = 1;
//     console.log(a)
// })();

// var initSideBar = (function() {
//     var a = 2;
//     console.log(a)
// })();

// // 现在的解决办法2，最近常用, 使用webpack

// // 原来的解决办法，使用with
// var namespace = {
//         header: {
//             Jenny: { // 开发者
//                 a: 1,
//                 b: 2
//             },
//             Ben: { //开发者
//                 a: 3,
//                 b: 4
//             }
//         },
//         sideBar: {
//             Crystal: { // 开发者
//                 a: 5,
//                 b: 6
//             }

//         }
//     }
//     //用with建立自己的作用域空间
// with(namespace.header.Ben) {
//     console.log(a);
// }