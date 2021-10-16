// //1
// function test(a, b, length) {
//     test.length += length; // test.length是函数的内置属性，不能修改
// 一般来说，内置属性是不能修改的
// 类数组的出现： 满足即需要有序列表有需要无序属性的情况
// jquery 就用了很多的类数组

//     a = 100;
//     b = 200;
//     console.log(test.length); //3

//     delete arguments.length;
//     arguments.push = [].push;
//     arguments.push(4);
//     arguments.length += length;

//     console.log(arguments.length); // 4
//     console.log(arguments); //[4,200, 3] 
// }

// test(1, 2, 3);
// console.log(test.length); // 3


// //2 打印出什么 -> Good bye -> switch 要求===
// switch (false) {
//     case 0:
//         console.log('0');
//         break;
//     case 1:
//         console.log('1');
//         break;
//     default:
//         console.log('Good bye');
//         break;
// }

// 为什么switch要求全等：在很多语言中switch还叫分支和管道，如果只是相等可能会出现两条或两条以上分支，这是不合理的，要使用全等

// //3
// switch ('a') {
//     case 'a' || 'b':
//         console.log('a || b');
//         break;
//     case 'a' && 'b':
//         console.log('a && b');
//         break;
//     default:
//         console.log('Good bye');
//         break;
// }


// //4
// var arr = [1, 2, 3];
// var newArr = Array(arr);
// console.log(arr === newArr);
// console.log(newArr); // false

// var obj = {
//     0: 1,
//     1: 2,
//     2: 3
// }

// var newObj = Object(obj);
// var newObj2 = new Object(obj)
// console.log(obj === newObj && obj=== newObj2);

// var newArr2 = Object(arr);
// console.log(arr === newArr2); //true
// // Object 比普通的构造函数更高深
// // 对象化 对象包装
// // 顶级对象化 Object()->用顶级构造器
// // 顶级构造器目标是将非对象构造成为一个对象，对已经是对象的传入值不进行实例化

// var newA = new Object(1);
// var newAA = new Object(1);
// console.log(newA === newAA);


// var a = '1';

// // 不加new的包装类构造器是执行类型转化, 非顶级包装类构造器不加new,就是进行类型转换
// var newA = Number(a);
// console.log(newA); // 1

// var newB = new String(a);
// console.log(newB); // String{"1"}

// 而 js 的内置对象加new 和 不加new好像没区别


// //5
// var test = function() {}

// console.log(test.__proto__ === Function.__proto__); //true

// console.log(Object.__proto__ === Function.prototype); //true

// console.log(test.__proto__ === Function.prototype); //true

// console.log(Function.prototype === Function.__proto__); //true

// // 函数的__proto__ === 函数的原型属性 -> 函数的原型链就等于函数的原型属性


// //6
// Object.prototype.__proto__ = {
//     a: 100
// }

// var obj = {};
// console.log(obj.a); //TypeError: Immutable prototype object '#<Object>' cannot have their prototype set
// at Object.set __proto__ [as __proto__] (<anonymous>)

// //7
// Object.defineProperty(Object, 'prototype', {
//     enumerable: true,
//     writable: true,
//     configurable: true
// })

// Object.prototype.__proto__ = {
//     a: 100
// }

// var obj = {};
// console.log(obj.a); // TypeError: Cannot redefine property: prototype


// Object.prototype = {
//     a: 100
// }

// var obj = {};
// console.log(obj.a); //undefined


// //8
// // 数组是有序列表，变成字符串时会被序列化 -》 [1,2,3].toString() : "1,2,3" -> [].toString : ""
// console.log(([] + {} + function() {}).length); //29
// console.log([] + {} + function() {});

// 为什么[1,2,3].toString = '1,2,3'  {1,2,3}.toString=[Object object]
// Object 是所有类型的最高层，而引用值的分类通过typeof并不能做到，所以就将分类设计到了Object.prototype.toString 中

// 为什么function有toString 方法
// 在底层中大量处理字符串，将function转为字符串后，可以通过正则向其中添加东西，在通过eval更改为函数来执行

// typeof 在设计的时候没有考虑引用值得多种种类
// 但是为什么typeof 可以识别 function：
// 因为typeof的判断是依靠标识来识别的 -》当时设计了3中标识
// function [[call]]标识
// object [[object]]标识
// 原始值 [[primitiveValue]]标识

//9
// // 对数组来说，是将每一项都toString, 然后再用逗号隔开
// console.log(([{}, 2, 3] + {}).length); //34
// console.log(([ [{}], 2, 3 ] + {}).length); //34
// console.log(([ [ [{}] ], 2, 3 ] + {}).length); //34
// console.log(([{}, 2, 3] + {}).length); //34
// console.log(([[{}], 2, 3] + {}).length); //34

// //10
// console.log((!true + !false).lenth); // undefined
// 1.length === undefined

// var arr = {
//     a: 1,
//     b: 2
// }
// console.log(arr.length); // undefined

// //11
// console.log(((new Function()) + {}).length); // 41
// console.log(new Function() + {});

// // 12 存不存在闭包
// // 广义闭包就是创建函数的时候可以在函数内引用到外部的环境引用
// // 不是非要return出去，在b函数创建的时候就引用过了外部的a, 闭包就形成了
// // 高阶函数的特性： 1. 有回调函数， 2. return 一个函数出去
// function test() {
//     var a = 1;

//     function b() {
//         console.log(a + 1);
//     }
//     b();
// }
// test();

// // 13 编程题
// // if (a == 1 && a == 2 && a == 3) {
// //     if (a.a === 1 && a.a === 2 && a.a === 3) {
// //         console.log('You win!!!')
// //     }
// // }

// var a = {
//     _i: 0,
//     toString: function() {
//         return ++this._i;
//     },
//     _a: 0,
//     // get a() {
//     //     return ++this._a;
//     // }
// }

// Object.defineProperty(a, 'a', {
//     get() {
//         return ++a._a;
//     }
// })

// if (a == 1 && a == 2 && a == 3) {
//     if (a.a === 1 && a.a === 2 && a.a === 3) {
//         console.log('You win!!!')
//     }
// }

// 14 编程题
// console.log(+0 == -0);
// console.log(+0 === -0);

// console.log(NaN == NaN);
// console.log(NaN === NaN);

//让 +0 !== -0 并且 NaN ===NaN
// 写一个函数实现上面的条件

// // 自己手写
// function isNo(a, b) {
//     if (a === +0 && b === -0) {
//         return false;
//     }

//     if (isNaN(a) === true && isNaN(b) === true) {
//         return true;
//     }

//     return a === b;
// }

// console.log(isNo(+0, -0));
// console.log(isNo(NaN, NaN));

// // 老师的写法
// // 真正做封装是，做计算相关时，大量使用x,y,z
// function is(a, b) {
//     if (a === b) {
//         return a !== 0 || b !== 0 || 1 / a === 1 / b;  // 1 / +0 === +infinity   1 / -0 === -infinity
//     }

//     return a !== a && b !== b;
// }




// // 15 写一个像Object.is 的方法
// console.log(Object.is(+0, -0)); //false
// console.log(Object.is(NaN, NaN)); //true

// -0 +0 不相等 -> 零值相等 same-zero-equal
// -0 +0 相等 -> 同值相等 same-value-equal

// 为什么有+0，-）
// 微积分角度解释： 正数无限接近0是+0， 负数无限接近0是-0
// 计算机编码中，负数的首位是1，就会存在-0的情况
// 气象学中存在+0 和 -0


// // 15
// var a = 1;

// function test() {
//     console.log(this.a);
//     return function() {
//         console.log(this.a);

//         return function() {
//             console.log(this.a);
//         }
//     }
// }

// var obj1 = { a: 2 };
// var obj2 = { a: 3 };
// test.call(obj1).call(obj2).call(undefined); // 2 3 1
// test.call(obj1).call(obj2).call(null); // 2 3 1
// test.call(obj1).call(obj2).call(NaN); // 2 3 undefined
// test.call(obj1).call(obj2).call(''); // 2 3 undefined
// // call 被设计为一个通用方法，并没有指定第一个参数一定要是一个对象，基础数据类型会被转成包装类

// 加 'use strict'后
// test.call(obj1).call(obj2).call(undefined); // typeError 无法读取undefined的a属性
// test.call(obj1).call(obj2).call(null); // typeError 无法读取null的a属性


// // 16
// // 用一种方法创建一个原型为null的对象
// // 这个对象有两个属性，让一个属性不可枚举

// var obj = Object.create(null, {
//     a: {
//         value: '10',
//         configurable: true,
//         writable: true
//     },
//     b: {
//         value: '20',
//         enumerable: true,
//         configurable: true,
//         writable: true
//     }
// })

// // 17 打印的是多少
// var a = 2;

// function test() {
//     var a = 1;

//     var t = new Function('console.log(a');
//     t();
// }
// test(); //2
// // new Function() 创建的函数，只能在全局作用域下执行，不会调用到test中的a

// // 18 打印多少
// var a = 2;

// function test() {
//     var a = 1;

//     eval('function (){console.log(a)}()');
//     t();
// }
// test(); //1


// 19
// i,j 从0开始 i,j <= 2
// 两次循环，打印ij
// 排除 i===1 && j===1
// 不打印1, 2

// // label
// // label 与 break 和 continue 使用的最多
// for1: for (var i = 0; i <= 2; i++) {
//     for (var j = 0; j <= 2; j++) {
//         if ((i === 1 && j === 1) {
//             continue for1;
//         }

//         console.log(i, j);
//     }
// }

for (var i = 0; i <= 2; i++) {
    for (var j = 0; j <= 2; j++) {
        if ((i === 1 && j === 1) || (i === 1 && j === 2)) {
            continue;
        }

        console.log(i, j);
    }
}

// 20 编程练习
var vm = new Vue({
    data() {
        return {
            a: 1,
            b: 2
        }
    }
});

// 让 vm.a -> 1, vm.b ->2

function Vue(options) {
    var _data = options.data();
    var _this = this;
    for (var k in _data) {
        // 不兼容IE8
        (function(k) {
            Object.defineProperty(_this, k, {
                get() {
                    // console.log("GET", k, _data[k]);
                    return _data[k];
                },
                set(newValue) {
                    // console.log('SET', k, newValue);
                    _data[k] = newValue;
                }
            })
        })(k);

        // // 兼容IE8
        // // firefox很早已经提供了两个方法__defineGetter__ 和 __defineStter__
        // (function(k) {
        //     _this.__defineGetter__(k, function() {
        //         // console.log('Get', k, _data[k]);
        //         return _data[k];
        //     })
        //     _this.__defineSetter__(k, function(newValue) {
        //         // console.log('SET', k, newValue);
        //         _data[k] = newValue;
        //     })
        // })(k);
    }
}


console.log(vm.a, vm.b);

