// // 自定义原型方法
// // 1. 自定义myUnshift, 达到unshift的效果
// // 方法1
// var arr = ['a', 'b', 'c'];

// Array.prototype.myUnshift = function() {
//     var pos = 0;
//     for (var i = 0; i < arguments.length; i++) {
//         this.splice(pos, 0, arguments[i]);
//         pos++
//     }
//     return this.length;
// }

// // 方法2
// var arr = ['a', 'b', 'c'];

// Array.prototype.myUnshift = function() {
//     // 类数组转数组的方法：Array.prototype.slice.call()
//     var argArr = Array.prototype.slice.call(arguments);
//     var newArr = argArr.concat(this);
//     return newArr;
// }

// var newArr = arr.myUnshift(1, 2, 3, 4, 5);
// console.log(arr);
// console.log(newArr);

// console.log(arr.myUnshift(1, 2, 3, 4, 5));
// console.log(arr);

// //2. 数组按占用的字节数排序
// arr = ['我爱你', 'OK', 'Hello', '你说What', '可以']

// arr.sort(function(a, b) {
//     return getBytes(a) - getBytes(b);
// });
// console.log(arr);


// function getBytes(str) {
//     var bytes = str.length;

//     for (var i = 0; i < str.length; i++) {
//         if (str.charCodeAt(i) > 255) {
//             bytes++
//         }
//     }
//     return bytes;
// }

// ================================================================

// // 封装自己的typeof让功能更完善
// // typeof -> undefined, number, string, function, boolean, object

// function myTypeof(val) {
//     var type = typeof(val),
//         toStr = Object.prototype.toString,
//         res = {
//             '[object Array]': 'array',
//             '[object Object]': 'object',
//             '[object Number]': 'object number',
//             '[object String]': 'object string',
//             '[objcet Boolea]n]': 'object boolean',
//             '[objcet Undefined]': 'object undefined',

//         }
//     if (val === null) {
//         return 'null';
//     } else if (type === 'object') {
//         var result = toStr.call(val);
//         return res[result];
//     } else {
//         return type;
//     }
// }

// console.log(myTypeof(new String(123)));

// ================================================================

// // 数组去重

// var arr = [0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 'a', 'a', 'a'];

// Array.prototype.unique = function() {
//     var temp = {},
//         newArray = [];

//     for (var i = 0; i < this.length; i++) {
//         if (!temp.hasOwnProperty(this[i])) {
//             temp[this[i]] = this[i];
//             newArray.push(this[i]);
//         }
//     }
//     //     for (var i = 0; i < this.length; i++) {
//     //         if (!temp[this[i]]) {
//     //             temp[this[i]] = 'value';
//     //             newArray.push(this[i]);
//     //         }
//     //     }
//     return newArray;
// }

// console.log(arr.unique());

// ================================================================

// //字符串去重
// var str = '111222333000aaabbb';
// String.prototype.unique = function() {
//     var temp = {},
//         newStr = '';

//     for (var i = 0; i < this.length; i++) {
//         if (!temp.hasOwnProperty(this[i])) {
//             temp[this[i]] = this[i];
//             newStr += this[i];
//         }
//     }
//     return newStr;
// }
// console.log(str.unique());


// // 考题
// // 找出下面字符串中，只出现了一次的字母的
// var str = 'truaiwrtwtruibowrtpoiwrcutwopirutadwrcabf';

// function test(str) {
//     var temp = {};
//     for (var i = 0; i < str.length; i++) {
//         if (temp.hasOwnProperty(str[i])) {
//             temp[str[i]]++;
//         } else {
//             temp[str[i]] = 1;
//         }
//     }

//     for (var key in temp) {
//         if (temp[key] == 1) {
//             return key;
//         }
//     }
// }

// console.log(test(str));

// ================================================================

// // 闭包复习
// // No.1 打印的时什么
// function Test(a, b, c) {

//     var d = 0;
//     this.a = a;
//     this.b = b;
//     this.c = c;

//     function e() {
//         d++;
//         console.log(d);
//     }
//     this.f = e;
// }

// var test1 = new Test();
// test1.f(); //1
// test1.f(); //2

// var test2 = new Test(); // 新分配空间，新对象
// test2.f(); //1

// // No.2 打印的什么
// function test() {
//     console.log(typeof(arguments));
// }

// test(); // object

// // No.3 最终打印什么
// var test = function a() {
//     return 'a';
// }
// console.log(typeof(a)); //undefined 函数表达式忽略函数名
// console.log(test.name); // a 被作为了test.name 的值，但是外界是不能使用a()来访问函数的，只能test()内部使用。

// // No.4 下面的执行结果对吗？ 
// // 不对，应该打印出undefined
// // console.log(a); 就会报错
// var test = function a() {
//     return 'a';
// }
// console.log(typeof(a)); // 报错

// // No.5 如何优化下面的函数
// // function test(day) {
// //     switch (day) {
// //         case 1:
// //             console.log('Mon');
// //             break;
// //         case 2:
// //             console.log('Tue');
// //             break;
// //         case 3:
// //             console.log('Wed');
// //             break;
// //         case 4:
// //             console.log('Thu');
// //             break;
// //         case 5:
// //             console.log('Fri');
// //             break;
// //         case 6:
// //             console.log('Sat');
// //             break;
// //         case 7:
// //             console.log('Sun');
// //             break;
// //         default:
// //             console.log('I don\'t know');
// //             break;
// //     }
// // }
// // 简化
// function test(day) {
//     var weekDay = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

//     weekDay[day - 1] !== undefined ? console.log(weekDay[day - 1]) : console.log('I don\'t know');
// }
// test(6);

// // 不要day-1怎么办？
// function test(day) {
//     //var weekDay = [undefined, 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
//     var weekDay = [, 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

//     weekDay[day] !== undefined ? console.log(weekDay[day]) : console.log('I don\'t know');
// }
// test(0);