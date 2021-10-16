// // 数组
// // 数组的三种定义方

// var arr1 = []; // 数组字面量

// var arr2 = new Array(); // 不推荐使用

// var arr3 = Array(); // 不适用

// // 三种方法的原型都是Array.prototype
// console.log(arr1.__proto__);
// console.log(arr2.__proto__);
// console.log(arr3.__proto__);

// ================================================================

// // 数组的本质
// // 在javascript中，数组的本质是对象, 是对象的另一种形式,底层原理与对象一致
// var arr = [1, 2, 3, 4, 5];

// var obj = {
//     0: 0,
//     1: 1,
//     2: 2,
//     3: 3,
//     4: 4,
//     5: 5
// }

// console.log(arr[2]);
// console.log(obj[2]);

// ================================================================

// // array 的一些特殊特性
// // 数组最后一位打了逗号，是无效的，不会多记一位
// // 数组中如果有空位，叫做稀松数组, 空位自动补empty
// var arr = [, , ];
// console.log(arr); //[empty * 2]

// var arr1 = [, 1, 3, 5, 7, ];
// console.log(arr1); //[empty, 1, 3, 5, 7]

// var arr2 = [, 1, 3, , , 5, 7, ];
// console.log(arr2); //[empty, 1, 3, empty × 2, 5, 7]

// // 用构造函数构造数组，不能有空值，无论空值在任何位置, 末尾逗号除外
// // 原因是：使用构造函数，给的值属于传参
// //var arr3 = new Array(, 1, 3, 5, 7);
// //var arr3 = new Array(1, 3, , , 5, 7);
// var arr3 = new Array(1, 3, 5, 7, );
// console.log(arr3);

// var arr4 = new Array(5); // 传一个整数，相当于给定了数组长度
// console.log(arr4); //[empty * 5]

// //var arr5 = new Array(5.2);
// //console.log(arr5); //RangeError： Invalid array length

// // var arr6 = new Array(a);
// // console.log(arr6); // ReferenceError: a is not defined

// var arr7 = new Array('a');
// console.log(arr7) // ["a"]

// var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// console.log(arr[10]) // undefined

// ================================================================

// // 数组的增改查
// var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// //增
// arr[10] = 11;
// //改
// arr[5] = 9;
// //查
// console.log(arr[5]);

// ================================================================

// // 数组的方法
// // 数组的方法都继承自Array.prototype(数组构造函数的原型的方法)

// // push() 和 unshift()
// // push(插入的元素) 从数组尾部添加
// // push() 和 unshift() -> 返回值是执行了方法以后的数组长度
// var arr1 = [2, 3, 4];
// console.log(arr1.push(5)); //4

// // push 添加多个元素
// arr1.push(6, 7, 8);
// console.log(arr1);

// // unshift()
// // 从数组第一位之前添加
// var arr2 = [2, 3, 4];
// console.log(arr2.unshift('a'));
// arr2.unshift('b', 'c', 'd');
// console.log(arr2);

// // unshift 的特点：多参数添加是按照参数顺序添加到数组中，在前面的还是在前面
// var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ];
// arr.unshift('a', 'b', 'c');
// console.log(arr); //["a", "b", "c", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// var arr1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ];
// arr1.unshift('a');
// arr1.unshift('b');
// arr1.unshift('c');
// console.log(arr1); //["c", "b", "a", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// // 手写push() 方法
// var arr3 = [1, 2, 3];
// Array.prototype.myPush = function() {
//     for (var i = 0; i < arguments.length; i++) {
//         this[this.length] = arguments[i];
//     }
//     return this.length;
// }

// arr3.myPush(1, 2, 3);
// console.log(arr2);


// // pop() 和 shift()
// //pop() 
// //剪切数组的最后一位, 返回被剪切的那个数组元素的值,没有参数
// var arr1 = ['a', 'b', 'c'];
// arr1.pop();

// //shift()
// //剪切数组的第一位，返回被剪切的元素, 该函数没有参数
// arr1.shift();


// //reverse()
// //将数组倒序，反回被执行后的数组
// var arr = [1, 2, 3, 4, 5];
// console.log(arr.reverse()); //[5, 4, 3, 2, 1]
// console.log(arr); //[5, 4, 3, 2, 1]


// //splice()
// //arr.splice(开始向的下标，剪切长度(小于等于0都无效，只能为正整数)，从剪切开始位置添加新的数据，这些数据以逗号隔开);
// // 返回被剪切出来的那段数组,如果没有取到值，则返回一个空数组
// var arr = ['a', 'b', 'c'];
// arr.splice(1, 1, 1, 2, 3, 4, 5, 6);
// console.log(arr); //["a", 1, 2, 3, 4, 5, 6, "c"]
// arr.splice(1, 6, ['jayden', 'alexis', 'foxxx'], ['white', 'wicky', 'benz']);
// console.log(arr); //["a", Array(3), Array(3), "c"]

// //要求在c 和 e之间添加d
// // 方法1
// var arr1 = ['a', 'b', 'c', 'e'];
// arr.splice(3, 0, 'd');
// console.log(arr1);

// //方法2
// var arr2 = ['a', 'b', 'c', 'e'];
// arr2.splice(-1, 0, 'd'); // 使用负数定位
// console.log(arr2);

// //splice 下标为负数的手写方法
// var arr3 = ['a', 'b', 'c', 'e'];

// function spliceIndex(arr, index) {
//     return index += (index >= 0 ? 0 : arr.length);
// }
// console.log(arr3[spliceIndex(arr3, -1)]);

// // splice 的返回值
// var arr = ['a', 'b', 'c', 'd', 'e', 'f'];
// console.log(arr.splice(-3, 2)); //["d", "e"]

// // sort()
// // 数组排序
// // 默认升序排列
// var arr = [-1, -5, 8, 0, 2];
// arr.sort();
// console.log(arr); //[-1, -5, 0, 2, 8] 


// // 返回的是排序后的数组
// var arr1 = ['b', 'z', 'h', 'i', 'a'];
// arr.sort();
// console.log(arr1.sort()); // ["a", "b", "h", "i", "z"]

// // sort -> 按照ascii码来排序，先比最左一位，如果第一位相同在比第二位
// // 所以下面的结果是5比49大
// var arr2 = [27, 49, 5, 7];
// arr.sort();
// console.log(arr2); //[27, 49, 5, 7]

// // 如何解决sort ascii码排序的问题
// // 自定义排序方法, sort已经规定好，必须遵守
// // 1. 必须有两个参数
// // 2. 必须有返回值，如果是负值，a排前面；如果是正值，a排后面b排前面; 0 保持不动
// var arr3 = [27, 49, 5, 7];
// arr3.sort(function(a, b) {
//     // if (a > b) {
//     //     return 1;
//     // } else {
//     //     return -1;
//     // }
//     return a - b; // 效果与if相同
// });
// console.log(arr3); //[5, 7, 27, 49]
// arr3.sort(function(a, b) {
//     return b - a;
// })
// console.log(arr3);


// // 笔试题：
// // No.1 随机排序
// var arr = [1, 2, 3, 4, 5, 6];

// // Math.random() -> 0 -1 ; 开区间

// arr.sort(function(a, b) {
//     // var rand = Math.random();
//     // if (rand - 0.5 > 0) {
//     //     return 1;
//     // } else {
//     //     return -1;
//     // }
//     return Math.random() - 0.5; //与if等效
// });
// console.log(arr);

// // No.2 按照age来排序
// var arr2 = [{
//         daugther: 'jayden',
//         age: 18
//     },
//     {
//         daugther: 'alexis',
//         age: 19
//     },
//     {
//         daugther: 'benz',
//         age: 22
//     },
//     {
//         daughter: 'foxxx',
//         age: 38
//     },
//     {
//         daughter: 'julis',
//         age: 35
//     }
// ];

// arr.sort(function(a, b) {
//     if (a.age > b.age) {
//         return 1
//     } else {
//         return -1;
//     }
// });

// // No.3 以字符串长度来排序
// var arr = ['12345', '1', '1234', '12', '12345678'];
// arr.sort(function(a, b) {
//     if (a.length > b.length) {
//         return 1;
//     } else {
//         return -1;
//     }
// });

//push() unshift() pop() shift() reverse() splice() sort()都会改变原数组


// ================================================================

// //作业
// // 1. 用splice方法重写数组的原型上的unshift方法 - > myUnshift
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

// // 2. 请按照字节数排序下列的数组['我爱你', 'OK', 'Hello', '你说What', '可以']
// // str.charCodeAt(index);
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