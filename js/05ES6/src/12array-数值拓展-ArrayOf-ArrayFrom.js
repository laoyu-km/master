// // iterator 方法复习
// // 手动部署 obj.[Symbol.iterator]接口
// let obj = {
//     start: [12, 3, 4, 5],
//     end: [7, 8, 9],
//     [Symbol.iterator]() {
//         let index = 0,
//             arr = [...this.start, ...this.end],
//             len = arr.length;
//         return {
//             next() {
//                 if (index < len) {
//                     return {
//                         value: arr[index++],
//                         done: false
//                     }
//                 } else {
//                     return {
//                         value: undefined,
//                         done: true
//                     }
//                 }
//             }
//         }
//     }
// }

// 迭代方法1
// var iter = obj[Symbol.iterator]();
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());

// 迭代方法2
// for (const iterator of obj) {
//     console.log(iterator);
// }

// // 总结：使用两种方迭代，不会因为上一种方的迭代而影响下面一种方法的迭代，两种方法都是从0开始，原因是，每次调用[Symbol.iterator]()时，iterator内部的index都会被定义为0，从0开始++
// // 在看数组使用迭代器，效果相同

// // 数组使用迭代器
// var arr = ['jayden', 'elle', 'angela', 'wicky', 'jayden', 'alexis', 'lela', 'lisa', 'julia', 'foxxx', 'nikki'];

// for (const iterator of arr) {
//     console.log(iterator);
// }

// // var iter = arr[Symbol.iterator]();
// // console.log(iter.next());
// // console.log(iter.next());
// // console.log(iter.next());
// // console.log(iter.next());
// // console.log(iter.next());
// // console.log(iter.next());
// // console.log(iter.next());
// // console.log(iter.next());
// // console.log(iter.next());
// // console.log(iter.next());
// // console.log(iter.next());
// // console.log(iter.next());
// // console.log(iter.next());

// ======================================

// // ...拓展运算符的特殊使用
// // ... 拓展运算符 -> 不能拓展对象
// let obj = {
//     start: [12, 3, 4, 5],
//     end: [7, 8, 9]
// }

// let arr = [...obj];
// console.log(arr); //  TypeError: obj is not iterable

// // 但是如果对象部署了[Symbol.iterator]接口，就可以使用拓展运算符
// var obj = {
//         start: [12, 3, 4, 5],
//         end: [6, 8, 9],
//         [Symbol.iterator]() {
//             var arr = [...this.start, ...this.end],
//                 len = arr.length,
//                 index = 0;
//             return {
//                 next: function() {
//                     if (index < len) {
//                         return {
//                             value: arr[index++],
//                             done: false
//                         }
//                     } else {
//                         return {
//                             value: undefined,
//                             done: true
//                         }
//                     }
//                 }
//             }
//         }
//     }
//     // 上面的obj部署了Symbol.iterator接口，所以可以使用...拓展运算符
// let arr = [...obj];
// console.log(arr); //(7) [12, 3, 4, 5, 6, 8, 9]

// ======================================

// array 在数组当中的拓展

// 构造器上的方法
// of 方法 -> Array.of();

// // Array 的特殊请况
// // 当Array只给了1个整数参数时，返回的是长度等于这个参数的数组，数组元素都是空
// console.log(Array()); //[]
// console.log(Array(1)); // [empty]
// console.log(new Array(3)); // [empty x 3]
// console.log(Array(1, 2)) // [1,2]

// // Array.of() 方法就是ES6用来解决上述问题的
// console.log(Array.of()); //[]
// console.log(Array.of(3)); //[3]
// console.log(Array.of(1, 2, 3)); //[1,2,3]

// ======================================

// Array.from() -> 将部署了iterator对象变为数组，或者将类数组变为数组
// // 将类数组变为数组
// window.onload = function() {
//     var oList = document.querySelectorAll('p');
//     console.log([].slice.call(oList)); //(3) [p, p, p] -> ES5及以前的方式
//     console.log(Array.from(oList)); // (3) [p, p, p] -> ES6 新增方法
// }

// // 将部署了iterator 方式的对象变为数组
// let obj = {
//     start: [66, 88, 3, 2, 1],
//     end: [6, 8, 9],
//     [Symbol.iterator]() {
//         let arr = [...this.start, ...this.end],
//             len = arr.length,
//             index = 0;
//         return {
//             next: function() {
//                 return index < len ? {
//                     value: arr[index++],
//                     done: false
//                 } : {
//                     value: undefined,
//                     done: true
//                 }
//             }
//         }
//     }
// }

// console.log(Array.from(obj)) //(8) [66, 88, 3, 2, 1, 6, 8, 9]

// // Array.from参数 -> Array.from(arrayLike, mapfn, thisArg)
// // arrayLike -> 类数组或者部署了iterator的obj
// // mapFn -> 一个map函数
// // thisArg -> 涉及到this指向的问题，不常用
// var obj = {
//     start: [66, 88, 6, 8, 9],
//     end: [99, 33, 1, 3, 5],
//     [Symbol.iterator]() {
//         let arr = [...this.start, ...this.end],
//             len = arr.length,
//             index = 0;
//         return {
//             next() {
//                 return index < len ? {
//                     value: arr[index++],
//                     done: false
//                 } : {
//                     value: undefined,
//                     done: true
//                 }
//             }
//         }
//     }
// }
// console.log(Array.from(obj, function(val, idx) {
//     return idx + ' => ' + val * 2;
// })); //(10) ["0 => 132", "1 => 176", "2 => 12", "3 => 16", "4 => 18", "5 => 198", "6 => 66", "7 => 2", "8 => 6", "9 => 10"]

// // map
// let arr = [3, 5, 8, 9, 6];
// let arr1 = arr.map(function(value) {
//     return value * 2;
// })

// console.log(arr1); //(5) [6, 10, 16, 18, 12]

// ======================================

// Array 原型上的方法 -> [].fill, [].copyWithin, [].keys/[].values/[].entries, [].includes, [].find/[].findIndex()

// //arr.fill(value, start, end);-> 填充数组 -> 修改的是原数组
// // start : 填充的其实位置，默认为0
// // end: 填充的结束位置，默认为this.length，不包含end -> 左闭右合
// // start 和 end 可以为 负数哦
// // start == end 不产生填充

// let arr1 = [1, 2, 3, 4];
// // arr1.fill(5);
// // console.log(arr1) //(4) [5, 5, 5, 5]

// // arr1.fill(5, 1);
// // console.log(arr1); //(4) [1, 5, 5, 5]

// // arr1.fill(5, 1, 3);
// // console.log(arr1); //(4) [1, 5, 3, 4]

// // arr1.fill(5, -2, -1);
// // console.log(arr1); //(4) [1, 2, 5, 4]

// arr1.fill(5, -1, -1);
// console.log(arr1); //(4) [1, 2, 3, 4]

// 一些特殊情况
// let arr1 = [1, 2, 3, 4];
// arr1.fill(6, undefined, undefined); // (4) [6, 6, 6, 6]
// arr1.fill(6, null, null); //(4) [1, 2, 3, 4]
// arr1.fill(6, NaN, NaN); // (4) [1, 2, 3, 4]
// arr1.fill(6, NaN, 3) //(4) [6, 6, 6, 4]
// arr1.fill(6, 2, NaN); //(4) [1, 2, 3, 4]
// arr1.fill(6, undefined, 2); // (4) [6, 6, 3, 4]
// arr1.fill(6, 1, undefined); //(4) [1, 6, 6, 6]
// arr1.fill(6, null, 2); //(4) [6, 6, 3, 4]
// arr1.fill(6, 2, null); // (4) [1, 2, 3, 4]
// arr1.fill(6, 3, 2); //(4) [1, 2, 3, 4]
// // 总结，
// // 1. start 和 end, 在换算到实际数组中的位置时，如果end >= start, 则不会发生填充
// // 2. undefined 不会影响start, 和 end 的默认值
// // 3. NaN , null 被当做0处理
// // 可以直接对对象使用: 
// console.log([].fill.call({ 2: 8, 3: 6, 5: 9, length: 5 }, 5));

// arr1.fill(6, 0, NaN);
// console.log(arr1)

// ======================================

// keys() / values() /entries()

// // Object下的keys values entries, 返回的是3个数组
// let obj = {
//     a: 1,
//     b: 2,
//     c: 3
// }

// console.log(Object.keys(obj)); // Array(3)
// console.log(Object.values(obj)); //Array(3)
// console.log(Object.entries(obj)); //Array(3)

// for (i of Object.entries(obj)) {
//     console.log(i);
// }

// let objKeys = Object.keys(obj);
// for (let i = 0; i < objKeys.length; i++) {
//     console.log(objKeys[i]);
// }

// 数组下的keys, values, entries
// 返回值与obj.keys 不同，返回的是三个iterator对象，iterator对象没有length属性，所以不能使用for循环，只能使用for...of来遍历
// let arr = ['a', 'b', 'c', 'd', 'e'];
// console.log(arr.keys()); // Array Iterator {}
// console.log(arr.values()); // Array Iterator {}
// console.log(arr.entries()); // Array Iterator {}

// var iter = arr.entries();
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());
// console.log(iter.next());

// // 不能使用for循环
// for (let i = 0; i < iter.length; i++) {
//     console.log(i) // 空， 因为iter.length为undefined
// }
// console.log(iter.length); // undefined

// var iters = arr.values();
// for (let i of iters) {
//     console.log(i); //a,b,c,d,e
// }

// ======================================

// arr.copyWithin(target, start, end) -> 使用数组自己内部的值来替换数组自己, 使用率不高
// target: 被替换的值的开始位置 默认值：0
// start:  用来替换的值得开始位置 默认值：arr.length
// end: 用来替换的值得结束位置 (不包含)
// 规律是数组长度不变, 作用到原数组

// var arr = [1, 2, 3, 4, 5, 6];
// console.log(arr.copyWithin(2)); // (6) [1, 2, 1, 2, 3, 4]
// console.log(arr.copyWithin(-2)); // (6) [1, 2, 1, 2, 1, 2]
// console.log(arr.copyWithin(0, 3, 4)); // (6) [2, 2, 1, 2, 1, 2]
// console.log(arr.copyWithin(-2, -3, -1)); // [1, 2, 3, 4, 4, 5]

// 特殊情况
// console.log(arr.copyWithin(-2, -1, -3)); //(6) [1, 2, 3, 4, 5, 6]
// console.log(arr.copyWithin(-2, undefined, 4)); //(6) [1, 2, 3, 4, 1, 2]
// console.log(arr.copyWithin(2, 4, undefined)); //(6) [1, 2, 5, 6, 5, 6]
// console.log(arr.copyWithin(undefined, 2, 4)); //(6) [3, 4, 3, 4, 5, 6]
// console.log(arr.copyWithin(-2, null, -2)); //(6) [1, 2, 3, 4, 1, 2]
// console.log(arr.copyWithin(-2, 4, null)); //(6) [1, 2, 3, 4, 5, 6]
// console.log(arr.copyWithin(-2, NaN, 4)); //(6) [1, 2, 3, 4, 1, 2]
// console.log(arr.copyWithin(-2, 2, NaN)); //(6) [1, 2, 3, 4, 5, 6]
// // 总结，
// // 1. start 和 end, 在换算到实际数组中的位置时，如果end >= start, 则不会发生填充
// // 2. undefined 不会影响start, 和 end 的默认值
// // 3. NaN , null 被当做0处理
// // 4. 与 [].fill()的使用相同
// // 5. 可以直接对对象使用:
// // 6. 此方法使用率不高，主要使用的还是[].fill()方法
// console.log([].copyWithin.call({ 3: 1, 5: 6, length: 5 }, 0, 3)); // {0: 1, 3: 1, 5: 6, length: 5}
// console.log([].copyWithin.call({ 3: 1, 5: 6, length: 5 }, 0, 2, 5)); //{1: 1, 3: 1, 5: 6, length: 5}

// ======================================

// // find() /findIndex()
// // find(fn(value, index, arr){}, ) -> 返回的是第一个符合条件的元素的值 ,如果没有返回undefined

// // find 只返回符合条件的元素的值，就算在callback写了其他的return 值也没有用
// var arr = [1, 2, 3, 4];

// var val = arr.find(function(value, index, arr) {
//     if (value > 3) {
//         // return index + ' => ' + value;
//         return 'hello';
//     }

// })

// console.log(val); // 4

// // findIndex()
// // findIndex(fn(value, index, arr){}, ) -> 参数返回的是第一个符合条件的元素的下标, 如果没有返回 -1
// // findIndex() 只返回符合条件的第一个元素的下标，就算在callback写了其他的return 值也没有用
// var index = arr.findIndex(function(index, value, arr) { // 这里参数的index 是value，参数名是index,实际值是value
//     return index > 2; // 3 > 2
// })
// console.log(index) // 2

// ======================================

// //indexOf 为什么不如 findindex()
// console.log([NaN].indexOf(NaN)); // -1

// console.log([NaN].findIndex(y => Object.is(NaN, y))); // 0

// ======================================

// // includes() -> 判断数组中是否包含某个值
// console.log([1, 2, NaN].includes(NaN)); // true 
// //ES6解决了NaN不等于NaN的问题
// console.log([NaN].indexOf(NaN)); // -1
// console.log([NaN].includes(NaN)); // true

// ======================================

// ES6 数值的拓展

// // 进制
// console.log(0x1f7) // 0x 16进制
// console.log(0O767) // 0o 8进制
// console.log(0B111110111); // 0b 2进制
// console.log(Number.prototype.toString.call(503, 2)); //111110111
// // console.log((503).toString(2)); // 111110111
// console.log(parseInt(111110111, 2));

// 数值拓展主要是Number的新增方法和原有方法的调整

// // isNaN(), 放到了Number的构造器中
// console.log(isNaN("NaN")); // true -> 隐式转化
// console.log(Number.isNaN("NaN")); //false -> 修正了隐式转化

// // isFinite()
// console.log(isFinite('42')); // true 隐式转换
// console.log(Number.isFinite('42')) // false 修正了隐式转换

// parseInt(), parseFloat() -> 也增加到了Number的构造器中

// // isInteger() ES6 新增 
// console.log(Number.isInteger(24.0));

// console.log(Number.prototype);

// // 安全整数：
// // 安全正整数
// console.log(Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1); // true
// // 安全负整数
// console.log(Number.MIN_SAFE_INTEGER === -Math.pow(2, 53) + 1); // true

// // 判断是否是安全整数
// console.log(Number.isSafeInteger(1));

// ======================================

// // Math 是 ES内置对象，没有原型
// console.log(Math.prototype); // undefined
// console.log(Math); // ES6 拓展了很多数学方法