// // 数组方法
// // concat(被合并的数组)
// // 新建一个数组，将arr2合并到arr1后面，返回这个新数组
// var arr1 = ['a', 'b', 'c'];
// console.log(arr1);

// var arr2 = ['d', 'e', 'f'];
// console.log(arr2);

// var arrNew = arr1.concat(arr2);
// console.log(arrNew, arr1, arr2); // 原数组都不变，新产生了一个数组

// //toString
// // 将数组转化为字符串
// var arr1 = ['a', 'b', 'c', 'd'];
// var arr2 = [1, 2, 3, 4, 5, 6];
// console.log(arr1.toString());
// console.log(arr2.toString());

// //slice
// //与splice相近，但是功能不同
// //splice(开始下标(包含)，结束下标(不包含)),返回截取的新数组
// var arr = ['a', 'b', 'c', 'd', 'e', 'f'];

// //无参数相当于全部截取
// var arrSlice = arr.slice();
// console.log(arrSlice); //["a", "b", "c", "d", "e", "f"]

// // 1个参数相当于从给定参数开始，截取到最后
// var arrSlice = arr.slice(1);
// console.log(arrSlice); //["b", "c", "d", "e", "f"]

// var arrSlice = arr.slice(-2);
// console.log(arrSlice); //["e", "f"]

// // 从开始位置截取到结束位置，不包含结束位置
// var arrSlice = arr.slice(1, 3);
// console.log(arrSlice); //["b", "c"]

// //从下标-3 位置开始截取，截取到下标5的位置，不包含下标5
// var arrSlice = arr.slice(-3, 5);
// console.log(arrSlice); //["d", "e"]

// var arrSlice = arr.slice(-3, -1);
// console.log(arrSlice); //["d", "e"]

// // slice(para1, para2) -> para1 的真实下标一定要小于para2的真实下标，否则返回一个空数组[]
// var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ];
// console.log(arr.slice(-2, -5)); //[]
// console.log(arr.slice(-5, -2)); //[5,6,7]
// console.log(arr.slice(5, 2)); //[]
// console.log(arr.slice(2, 5)); //[2,3,4]
// console.log(arr.slice(2, 2));

// //join / split
// // join(记号)，将数组转化为字符串，用记号隔开, 返回一个字符串
// var arr = ['a', 'b', 'c', 'd'];
// var str1 = arr.join();
// console.log(str1); // = arr.toString();

// var str2 = arr.join('');
// console.log(str2); // = arr.toString();
// var str3 = arr.join('-');
// console.log(str3); // = arr.toString();
// var str4 = arr.join(0);
// console.log(str4); // = arr.toString();

// // split
// // split(分隔符，截取长度)，返回一个数组
// var arr1 = str1.split();
// console.log(arr1); //["a,b,c,d"]

// var arr2 = str2.split('', 1);
// console.log(arr2); //["a"]

// var arr3 = str3.split('-', 2);
// console.log(arr3); //["a", "b"]

// var arr4 = str4.split(0, 3);
// console.log(arr4); //["a", "b", "c"]

// ================================================================

// // 类数组
// // 以 arguemnts 为例，arguments 是类数组
// // 类数组神似数组，有下标,且下标从0开始，有length属性,但是原型是object,不能使用数组函数
// function test() {
//     //arguments.push() // 报错
//     console.log(Object.prototype.toString.call(arguments)); //[object Arguments]
//     console.log(arguments.__proto__); // Object
// }
// test(1, 2, 3, 4, 5, 6)

// var arr = [1, 2, 3, 4, 5, 6];
// console.log(arr);
// console.log(Object.prototype.toString.call(arr)); // [object Array]
// console.log(arr.__proto__); // Array


// // 手写类数组
// function test() {
//     console.log(arguments);
// }
// test(1, 2, 3, 4, 5, 6);


// var obj = {
//         '0': 1,
//         '1': 2,
//         '2': 3,
//         '3': 4,
//         '4': 5,
//         '5': 6,
//         'length': 6,
//         // 在对象中加入splice方法，就可以数组格式(中括号)来显示类
//         //'splice': function() {},
//     }
//     // 也可以将splice方法写入Object.prototype中，这样每个继承自Object.prototype的类都可以使用此方法,且都是按类数组方式显示
//     // 经测试，只有写splice 方法才可以以类数组方式写实对象，其他数组方法名都不行
// Object.prototype.splice = function() {}
//     // 手写类数组的push方法
// Object.prototype.push = function(elem) {
//         this[this.length] = elem;
//         this.length++;
//     }
//     // 也可以直接让splice,和其他类数组函数直接继承数组方法
//     // Object.prototype.splice = Array.prototype.splice;
//     // Object.prototype.push = Array.prototype.push;
// console.log(obj);

// // 笔试题

// var obj = {
//     '2': 3,
//     '3': 4,
//     'length': 2,
//     'splice': Array.prototype.splice,
//     'push': Array.prototype.push
// }

// obj.push(1);
// obj.push(2);
// //obj.2报错，对象的属性实际是要求需要字符串，但是系统简化后可以按照变量形式来识别，但是.运算符不能直接接数字
// console.log(obj);

// // 上题结果
// Object(4) [empty × 2, 1, 2, splice: ƒ, push: ƒ]
// 2: 1
// 3: 2
// length: 4
// push: ƒ push()
// splice: ƒ splice()
// __proto__: Object

// // 原因
// //1. Array.prototype.push的实现方式
// Array.prototype.push = function(elem) {
//     this[this.length] = elem;
//     this.length++;
// }

// //2. 类数组的特性是从下标0开始， 直到length - 1, 而本题下标从2开始， 到3。 且length = 2, 说明默认只有0， 1 两位元素， 然而0， 1 没有声明， 在push时， 下标只能从2开始所以， 所以push进来的1， 2 把2号下标和3号下标的值替换了， 0 号和1号下标的值被补为empty


// // 类数组的应用
// var person = {
//     '0': 'jayden1',
//     '1': 'jayden2',
//     '2': 'jayden3',
//     'name': 'james',
//     'age': 33,
//     'weight': 140,
//     'height': 180,
//     'length': 3
// }
// Object.prototype.push = Array.prototype.push;
// Object.prototype.splice = Array.prototype.splice;
// console.log(person[1]); // 数组方式访问
// console.log(person.weight); // 对象方式访问
// console.log(person.length); // 3

// // 对象方式遍历
// for (var key in person) {
//     if (person.hasOwnProperty(key)) {
//         console.log(person[key]);
//     }
// }

// ================================================================

// // 作业
// // Array.prototype.unique 方法，对数组去重，执行后返回原数组
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

// // 封装一个myTypeof函数，能够实现传入一个值返回这个值得类型(undefined,boolean,number,number,string,null,function,array,object,object-number,object-boolean,object-string)
// // 封装typeof
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