// 重写reduce
// Array.prototype.myReduce = function(callback, initial) {
//     var self = this,
//         i = 0;
//     if (typeof callback !== "function") throw new TypeError('callback must be an function!');

//     if (typeof initial === "undefined") {
//         initial = self[0];
//         i = 1;
//     }

//     for (; i < self.length; i++) {
//         var item = self[i],
//             index = i;
//         initial = callback(initial, item, index);
//     }
//     return initial;
// };

// // 老师的写法
Array.prototype.myReduce = function(callback, initialValue) {

    var _arr = this,
        _len = _arr.length,
        _arg3 = arguments[2] || window,
        _item;

    for (var i = 0; i < _len; i++) {
        _item = _arr[i];
        initialValue = callback.apply(_arg3, [initialValue, _item, i, _arr]);
    }
    return initialValue;
}



var arr = [1, 2, 3];

var newArr = arr.myReduce(function(prev, item, index, array) {
    prev.push(item);
    return prev;
}, [1, 2, 3], { a: 1 });

console.log(newArr)



// // 2
// Object.keys Object.getOwnPropertyNames 的区别

// Object.keys -> 表层的方法

// // Object.getOwnPropertyNames -> 比较底层的方法
// // Object.keys和Object.getOwnPropertyNames 的区别
// Object.keys ES5的方法， 表层的， 主要用于业务层, enumreable 为false 不可以遍历
// Object.getOwnPropertyNames ES5的方法, 底层的， 主要用于底层框架, enumreable 为false 也可以遍历

// var obj = {
//     a: 1,
//     b: 2,
//     c: 3
// }

// var keyArr = Object.keys(obj);
// var keyArr2 = Object.getOwnPropertyNames(obj);
// console.log(keyArr, keyArr2); //[1,2,3], [1,2,3]

// var obj2 = {};
// Object.defineProperties(obj2, {
//     a: {
//         value: 1
//     },
//     b: {
//         value: 2
//     },
//     c: {
//         value: 3
//     }
// })

// var keyArr3 = Object.keys(obj2),
//     keyArr4 = Object.getOwnPropertyNames(obj2);

// console.log(keyArr3, keyArr4); // [], [1,2,3]


// //3 哪个可以打印出empty项
// var arr = [1, , , 2, 3, , , , 4, , 5, , , 6];
// arr.forEach(function(item) {
//     console.log(item);
// })

// arr.find(function(item) {
//     console.log(item);
// })


// // 4. 定义一个对象，属性a,b,c不可写，不可枚举，不可配置
// var obj = Object.create(null, {
//     a: {
//         value: 1
//     },
//     b: {
//         value: 2
//     },
//     c: {
//         value: 3
//     }
// })

// console.log(Object.getOwnPropertyDescriptor(obj, 'a'));

// for (var k in obj) {
//     console.log(obj[k]);
// }

// // 老师的写法
// var obj = {};
// Object.defineProperties(obj, {
//         a: {
//             value: 1
//         },
//         b: {
//             value: 2
//         },
//         c: {
//             value: 3
//         }
//     })
// 为什么 defineProperties 很少用 -> 因为很少有所有属性都确定的情况
// //举例, 类似后端传入的数据，整合为一个对象
// var arr = [{
//         key: 'a',
//         descriptor: {
//             value: 1,
//             configurable: true
//         }
//     },
//     {
//         key: 'b',
//         descriptor: {
//             value: 2,
//             enumerable: true
//         }
//     },
//     {
//         key: 'c',
//         descriptor: {
//             value: 3,
//             writable: true
//         }
//     }
// ];

// var obj = {}
// arr.forEach(function(item) {
//     Object.defineProperty(obj, item.key, item.descriptor);
// })

// for (var k in obj) {
//     console.log(k);
// }



// // 5
// /**
//  * 定义一个对象，原型为null
//  * 属性，不可枚举，不可泄，不可配置
//  * 原型不能修改
//  * 不能添加属性
//  * 不能修改属性的描述符
//  */
// // 使用Object.freeze() 函数进行冻结 -> 对比 Object.seal()
// var obj = Object.freeze(Object.create(null, {
//     a: {
//         value: 1
//     }
// }))

// console.log(obj);


// // 6 用最简单的方式渲染到页面
// var obj = {
//     a: 1,
//     b: 2,
//     c: 3
// }

// function template(a, b, c) {
//     return `
//         <h1>${a}</h1>
//         <h1>${b}</h1>
//         <h1>${c}</h1>
//     `;
// }

// // 解答
// // 老师的解答
// with(obj) {
//         document.body.innerHTML = template(a, b, c);
//     }
// with 的优点
// 1, 减少指针路径解析-> 只会在obj这个作用域中找, 速度快
// 2, Vue中也是这样使用with的

// with 存在的问题
// 1. 如果obj中都包含了a,b,c, with使用是没有问题的，很快，但是如果存在obj中未包含的属性，比如d, 则with会到所有存在的作用域中去查找d, 找到以后在判断是否能访问，这样会特别消耗资源，查找非常慢，
// 2. with 语法不易读

// // 举例
// function test(arr, values) {
//     with(arr) {
//         console.log(values);
//     }
// }

// test([1, 2, 3], { a: 1, b: 2 });

// 我的解法， 使用了ES6
// document.body.innerHTML = template(...Object.values(obj));



// //8 手写一个Array.isArray()
// Array.myIsArray = function(obj) {
//     return Object.prototype.toString.call(obj) === '[object Array]';
// }

// 9 Array 在什么地方保存的 
// 在 window 里保存

// // 10 console.log 打印的是什么
// var iframe = document.createElement('iframe');
// var iframe1 = document.createElement('iframe');

// document.body.appendChild(iframe);

// // 
// var myFrame = window.frames[0];
// console.log(window.Array === myFrame.Array); // false

// var FrameArr = myFrame.Array;
// var frameArr = new FrameArr(1, 2, 3);
// console.log(window.Array.isArray(frameArr)); // true

// // window.Array 没有出现在frameArr的原型链上
// console.log(frameArr instanceof window.Array); //false
// console.log(frameArr instanceof myFrame.Array); //true



// 11. 写一个判断数组是否是升序的函数
// ASC 升序 -> ascending 爬升
// desc 降序 -> descending 下降

// // 我的方法
// Array.isASCArr = function(arr) {
//     var _arr = arr;
//     for (var i = 1; i < _arr.length; i++) {
//         if (_arr[i] < _arr[i - 1]) {
//             return false
//         }
//     }
//     return true
// }

// var arr = [2, 1, 3, 5];
// console.log(Array.isASCArr(arr));

// // 老师的方法 -> es5 方法
// function isASC(arr) {
//     return arr.every(function(item, index, arr) {
//         return index < arr.length - 1 ?
//             item <= arr[index + 1] :
//             true
//     })
// }


// // 12 实现bind
// if (!Function.prototype.bind) {
//     Function.prototype.bind = function(obj) {
//         if (typeof this !== "function") {
//             throw new TypeError("must be a function");
//         }

//         var aArgs = Array.prototype.slice.call(arguments, 1),
//             self = this,
//             fNOP = function() {},
//             var fbound = function() {
//                 self.apply(this instanceof self ? this : context, args.concat(Array.prototype.slice.call(arguments)));
//                 // 上面的 arguments 是 fbound函数（返回的新函数） 的实参
//             }

//         fNOP.prototype = self.prototype;
//         fbound.prototype = new fNOP();

//         return fbound;
//     };
// }

// // 老师的解法
// Function.prototype.myBind = function(
//     thisArg
// ) {
//     if (typeof this !== 'function') {
//         throw new Error('must be a function')
//     }

//     var bindArgs = [].slice.call(arguments, 1),
//         targetFn = this,
//         newFn = function() {};

//     var boundFn = function() {
//         bindArgs.push.apply(bindArgs, arguments);

//         return targetFn.apply(
//             newFn.prototype.isPrototypeOf(this) ?
//             this :
//             thisArg, bindArgs
//         )
//     }

//     if (this.prototype) {
//         newFn.prototype = this.prototype;
//     }

//     boundFn.prototype = new newFn();
//     return boundFn;
// }



// function test(a, b, c) {
//     console.log(this);
//     console.log(arguments);
// }

// var test1 = test.myBind({ a: 1 }, 1, 2, 3);

// test1(4, 5, 6);

// new test1(4, 5, 6);