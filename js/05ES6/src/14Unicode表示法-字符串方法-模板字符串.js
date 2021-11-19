// // ES6 y 修饰符
// // 在使用中，y除了沾粘性以外，与g基本相同
// console.log('x##'.split(/#/y));
// console.log('x##'.split(/#/g));
// console.log('##x'.split(/#/y));
// console.log('##x'.split(/#/g));
// console.log('#x#'.split(/#/y));
// console.log('#x#'.split(/#/g));
// console.log('##'.split(/#/y));
// console.log('##'.split(/#/g));

// ======================================

// // ES6  正则解析4字节再说明
// console.log('\u0061'); // 16进制两个字节表示一个字符, 物理极限 \uFFFF
// console.log('\u20BB7'); // ₻7 js只解析两个字节，所以超过4位时，只解析了前4位, 7未被解析，这时有两种解决办法
// // 1. 超过\uD800后，与4位字节映射, 使用4位字节来表示
// console.log('\uD842\uDFB7'); //𠮷

// // 2. 使用ES6新增方法, {}默认是量值，要想表示Unicode码点，要在前面加\u
// console.log('\u{20BB7}'); //𠮷
// console.log('\uD842\uDFB7' === "\u{20BB7}");

// // ES6 \u{} 不需要不全两个字节
// console.log('\u{41}'); // A -> 使用\u{},就可以正常
// console.log('\u0041'); // A
// // console.log('\u41'); // 报错

// ======================================

// // ES6正则新增字符串方法
// // console.log(String.prototype); // 查看String的原型方法和构造器方法

// // codePointAt()
// var s = "\u{20BB7}";
// // var s = "你"; // 1
// console.log(s.length); // 2 -> length 判断s所占的字符
// // 将两个字符单独打印，出来的解构是乱码
// // console.log(s.charAt(0)); // 乱码
// // console.log(s.charAt(1)); // 乱码

// // console.log(s.charCodeAt(0)); // 55360 返回的是10进制的码点
// // console.log(s.charCodeAt(1));

// // // ES5 的方式
// // console.log(Number.prototype.toString.call(s.charCodeAt(0), 16)); // d842
// // console.log(Number.prototype.toString.call(s.charCodeAt(1), 16)); // dfb7

// // console.log('\ud842\udfb7'); //𠮷

// // ES6 方法 codePointAt()
// var s = "𠮷a";
// console.log(s.length); // 3
// console.log(Number.prototype.toString.call(s.codePointAt(0), 16)); //20bb7 codePointAt() 直接返回了4字节的码点，而ES5的charCodeAt()只能返回2个字节的码点
// console.log(Number.prototype.toString.call(s.codePointAt(1), 16)); //dfb7 -> 第2位还是返回了𠮷的后1个字符的码点
// console.log(Number.prototype.toString.call(s.codePointAt(2), 16)); // 61 -> 16进制数 -> 第3位才是a

// // String.prototype中也有迭代器
// var s = "𠮷a";
// for (let value of s) {
//     console.log(value); // 𠮷 a
// }

// function is32Bit(c) {
//     return c.codePointAt(0) > 0xFFFF;
// }
// console.log(is32Bit('𠮷')); // true

// ======================================

// string -> 构造器方法 fromCodePoint(), fromCharCode()

// fromCodePoint()

// // ES5的fromCharcode()只能解析16位，超过就乱码
// console.log(String.fromCharCode(0x20BB7)); // ஷ
// console.log(String.fromCharCode(0x20BB7) === String.fromCharCode(0x0BB7)); //true -> 当超出0xFFFF极限后，js会舍去最高位

// // ES6 fromCodePoint()
// let str = String.fromCodePoint(0x20BB7);
// console.log(str); // 𠮷

// // String.prototype也有遍历接口[Symbol.iterator];

// // 传统for方法 不能处理超出极限的字符
// for (let i = 0; i < str.length; i++) {
//     console.log(str[i]); // 乱码， 乱码
// }

// // for...of 能够处理超出0xFFFF极限的字符
// for (let i of str) {
//     console.log(i); // 𠮷
// }

// ======================================

// // includes(), startWith(), endWitch()
// // 都返回boolean 值
// let s = 'Hello World';
// console.log(s.startsWith('Hello')); //true
// console.log(s.endsWith('!')); // false
// console.log(s.includes('el')); // true

// ======================================

// // repeat() -> 返回一个新的字符串
// console.log('x'.repeat(3)); // xxx
// console.log('x'.repeat(2.9)); // xx, 只取整数部分
// console.log('x'.repeat(NaN)); // 空
// console.log('x'.repeat(0)); // 空
// console.log('x'.repeat("3")); // xxx

// ======================================

// // padStart() / padEnd()  -> 填充
// console.log("x".padStart(5, "ab")); // ababx
// console.log("x".padEnd(5, "ab")); //xabab

// // 特殊
// console.log("jayden".padStart(3, "alexis")); // jayden
// console.log("jayden".padStart(8, "alexis")); // aljayden
// console.log("jayden".padEnd(NaN, "alexis")); //jayden
// console.log("jayden".padStart(undefined, "alexis")); //jayden
// console.log("jayden".padEnd(null, "aleixs")); //jayden
// console.log("jayden".padStart("11qu", "alexis")); //jayden
// console.log("jayden".padEnd("qu22", "alexis")); //jayden
// console.log("jayden".padStart("24", "alexis")); // alexisalexisalexisjayden

// ======================================
// 模板字符串
// let name = "web";
// let info = "developer";

// let message = `I am a ${name} ${info}`; // 模板字符串
// let msg = 'I am a ' + name + ' ' + info;
// console.log(message === msg); //true

// // 一般的字符串拼接使用
// let name = "jayden";
// var info = "big buttom"
// console.log("<div>" +
//     "<div>" + name + "</div>" +
//     "<div>" + info + "</div>" +
//     "</div>");

// // 模板拼接
// console.log(`<div>
//                 <div>${name}</div>
//                 <div>${info}</div>
//             </div>`);

// // 模板拼接，运算
// // 原理是 ${}中是js表达式
// let x = 1;
// let y = 1;
// console.log(`${x} + ${6} = ${x + 6}`); //1 + 6 = 7
// console.log(`${x} + ${y} = ${x + y}`); //1 + 1 = 2
// console.log(`${x} + ${y} * 2 = ${x + y * 2}`); //1 + 1 * 2 = 3

// // 使用对象
// let obj = { x: 1, y: 2 };
// console.log(`${obj.x + obj.y}`);

// // 传入方法
// function fn() {
//     return "hello jayden";
// }

// console.log(`foo ${fn()} bar`); //foo hello jayden bar

// // 传入数组
// function fn() {
//     return [1, 2, 3, 4];
// }
// console.log(`foo ${fn()} bar`); //foo 1,2,3,4 bar

// // 传入对象
// function fn() {
//     return {
//         a: 'jayden',
//         b: 'aleixs',
//         c: 'foxxx'
//     };
// }
// console.log(`foo ${fn()} bar`); //foo [object Object] bar
// // 传入函数
// console.log(`foo ${fn} bar`); //foo function fn() { return { a: 'jayden', b: 'aleixs', c: 'foxxx' }; } bar

//总结：
// 1.${} 模块是一个js表达式，可以进行运算
// 2.${} 是替换普通的字符串拼接，所以最终的值还是字符串
// 3. 所以 ${} 表达式最终返回的值将根据其数据类型转化为字符串

// ======================================

// // 模板字符串和字符串的嵌套
// // let msg = `Hello, ${palce}`; // ReferenceError: palce is not defined
// let msg = `Hello, ${'palce'}`; // 模板字符串嵌套
// console.log(msg) // Hello, palce

// // 模板渲染方法 temp
// const temp = arr1 => `
//     <table>
//         ${
//             arr1.map(addr => `
//                 <tr><td>${addr.first}</td></tr>
//                 <tr><td>${addr.last}</td></tr>
//             `).join('') // join()将数组转换为字符串，去除了数组元素间的逗号
//         }
//     </table>
// `;
// const data = [
//     { first: "jayden", last: "james" },
//     { first: "alexis", last: "Texas" }
// ];
// console.log(temp(data)); //

// // 模板渲染存在的问题 -> 由于模板渲染可以传入js表达式，所以容易被注入恶意代码，举例:
// const temp = arr => `
//     <table>
//         ${arr.map(obj => `
//             <tr><td>${obj.begin}</td></tr>
//             <tr><td>${obj.end}</td></tr>
//         `).join('')}
//     </table>
// `;

// const data = [
//     {begin: "jayden", end: (function(){for(;1;){console.log('foxxx')}})()}, // 这里进行了js语句的注入，造成了无限循环
//     {begin: "alexis", end: "elle"}
// ];

// console.log(temp(data));

// // 如何解决模板渲染时注入的问题 -> 标签模板
// // 标签模板
// // 实际是定义一个函数，控制模板的输出，通过 $ 来拿到模板中的字符串形成一个数组，并通过 $1, $2 拿到模板中由${}得到的值
// let a = 5,
//     b = 10;

// // console.log(`Hello ${a + b} world ${a*b}`);
// tag `Hello ${a + b} world ${a*b}`; //["Hello ", " world ", "", raw: Array(3)]0: "Hello "1: " world "2: ""length: 3raw: Array(3)0: "Hello "1: " world "2: ""length: 3__proto__: Array(0)__proto__: Array(0) 15 50

// function tag($, $1, $2) {
//     console.log($, $1, $2);
//     console.log($);
//     console.log($1);
//     console.log($2);
// }

// // 示例
// function SaferHTML(tempDate) {
//     let s = tempDate;
//     for (let i = 1; i < arguments.length; i++) {
//         let arg = String(arguments[i]);
//         s += arg.replace(/</g, "&lt;")
//             .replace(/>/g, "&gt;");

//         s += tempDate[i];
//     }


//     return s;
// }

// let sender = '<script>alert("abc")</script>'

// let message = SaferHTML `<p>${sender} has sent you message</p>`
// console.log(message);

// // 问题 使用标签模板后如何能在替换后原模原样输出
// // replace的使用
// var replaceVal = 'foxxx';
// var str = '<p>,</p><p>,</p><p>this , is,test,</p>'
//     // str = str.replace(/>,</gim, `>${replaceVal}<`); // 正则全部替换
// str = str.replace('>,<', `>${replaceVal}<`); // 只替换找到的第一个
// console.log(str);


// 标签模板的使用-> 得到正确的返回值-> 使用场景输入框
// // 方法1；
// safeHTML = function(tempMsg) {
//     var msg = tempMsg + '';
//     for (let i = 1; i < arguments.length; i++) {
//         let arg = String(arguments[i]).replace(/</igm, '&lt;').replace(/>/gim, '&gt;');
//         msg = msg.replace('>,<', `>${arg}<`);
//     }
//     return msg;
// }

// // 方法2
// function safeHTML(tempMsg) {
//     var msg = tempMsg;
//     var result = [];
//     result.push(msg[0]);
//     for (let i = 1; i < arguments.length; i++) {
//         let arg = String(arguments[i]).replace(/</igm, '&lt;').replace(/>/gim, '&gt;');
//         result.push(arg + msg[i]);
//     }
//     return result;
// }

// let sender = "I love jayden";
// let sex = "I hava a good time with jayden";
// let scriptVal = "<script>alert('alexis')</script>";
// let fun = (function() {
//     alert('jayden');
// })();

// let msg = safeHTML `<div> 
//                         <p>this is  a true</p> 
//                         <p>${sender}</p> 
//                         <p>${sex}</p>
//                         <p>${scriptVal}</p>
//                         <p>${fun}</p>
//                     </div>`;
// console.log(msg.join(''));
// 存在的问题 -> 立即执行函数方式的注入本人无法解决，但是一般不会直接是代码行进入，都是字符串进入，慎重替换代码符号即可

// // 方法3
// // 解决模板套模板
// var safeHTML = function(tempMsg) {
//     var msg = tempMsg;
//     console.log(arguments);
//     var s = msg[0];
//     for (let i = 1; i < arguments.length; i++) {
//         let arg = String(arguments[i]).replace(/<script>/gim, '&lt;script&gt;').replace(/<\/script>/gim, '&lt;/script&gt;');
//         s += arg;
//         s += msg[i];
//     }
//     return s;
// }

// let sender = "I love jayden";
// let sex = "I hava a good time with jayden";
// let scriptVal = "<script>alert('alexis')</script>";
// let fun = (function() {
//     alert('jayden');
// })();

// let tempMsg = `<div> 
//                         <p>this is  a true</p> 
//                         <p>${sender}</p> 
//                         <p>${sex}</p>
//                         <p>${scriptVal}</p>
//                         <p>${fun}</p>
//                     </div>`;

// let msg = safeHTML `<body><div>I want ${tempMsg} elle's apple </div></body>`;
// console.log(msg);
// //总结： 第三种方法是最好用的方法，第一种方法需要替换逗号，但是逗号的出现是不固定格式的，第二种方法需要多产生一个数组，而且不能直接返回字符串，需要join()