// 数组的常用方法:
// 堆栈方法 : push unshift pop shift
// 通用方法 : toString valueOf
// 拼接方法 : concat join 
// 构建方法 : new Array('10') , new Array(10), array.from(), Array.of()
// 删改的方法: splice(), slice;
// 排序方法： sort(), reverse();
// 索引相关的方法： indexOf lastIndexOf(), includes(), find(), findeIndex()
// 迭代的方法：forEach(), map(), filter(), reduce(), reduceRight(), some(), ever(), entries(), keys(), values();

// =========================================

// // 字符串的 match() 和正则的 exec()
// match - > String.prototype.match();
// exec - > RegExp.prototype.exec();

// var reg = new RegExp(/\d/g); // 构造函数写法
// var reg2 = /\d/g; //字面量，perl写法

// var str = 'jaydenjamesalexistexas1223foxx898989wicky';
// // match 返回的是数组
// console.log(str.match(/\d/)); // 返回单个值得数组
// console.log(str.match(/\d/g)); // 返回所有值得数组

// var reg = /.at/
// var str = 'cat, bat, sat, fat';
// // 都是返回['cat']
// console.log(reg.exec(str)); 
// console.log(reg.exec(str)); 
// console.log(reg.exec(str)); 
// console.log(reg.exec(str)); 

// var reg = /.at/g
// var str = 'cat, bat, sat, fat';
// // exec()有记忆功能，reg加g以后，每次输出只有一个元素的数组，每次输出下一个
// console.log(reg.exec(str)); // ['cat']
// console.log(reg.exec(str)); // ['bat']
// console.log(reg.exec(str)); // ['sat']
// console.log(reg.exec(str)); // ['fat']


// =========================================

// // charAt charCodeAt fromCharCode
// var str = 'abc';
// console.log(str.charAt(0));
// console.log(str.charCodeAt(1));
// console.log(String.fromCharCode(65));


// =========================================

// // 写 a-zA-z
// // 方法1
// var res = ''
// for (var i = 0; i < 26; i++) {
//     res += String.fromCharCode(65 + i);
// }
// console.log(res);

// // 方法2
// var res = new Array(60).fill('').reduce((prev, cur, index) => {
//     return prev + String.fromCharCode(65 + index);
// }, '').match(/[a-zA-Z]/gm).join('');

// // var res = new Array(60).fill('').reduce((prev, cur, index) => {
// //     return prev + String.fromCharCode(65 + index);
// // }, '');

// console.log(res);


// =========================================

// 字符串上不用的方法
// str.big() anchor() blink() fixed() fontcolor() sub() sup() 以及和样式相关的方法

// =========================================

// // slice 在数组中和字符串中的使用时一样的
// // 数组的slice(indexStart, indexEnd)
// var arr = [1, 2, 3, 5, 6];
// console.log(arr.slice(NaN));
// console.log(arr.slice(1, undefined)) // [2,3,5,6]
//     // undefined 是作为未传值来处理

// var str = "12356"
// console.log(str.slice(NaN));
// console.log(str.slice(3, 2)); // [] slice()不支持反序
// console.log(str.slice(1, null)); // [] slice()不支持反序
// console.log(str.slice(-2)); // 支持倒序
// console.log(str.slice(1, undefined));

// substring(), substr()
// substring(indexStart, indexEnd) 支持倒序， 不支持负数， 不支持字符串

// substr() : 不存在倒序，支持反序，
// substr(index, length) //不推荐使用

// =========================================

// // indexOf
// var arr = [1, 2, 3, 5, 6, 8, 9, 10];
// console.log(arr.indexOf(2));
// console.log(arr.indexOf(2, 3));
// console.log(arr.indexOf(2, -1)); // 数组indexOf 支持负数
// console.log(arr.indexOf(2, null));
// console.log(arr.indexOf(2, undefined));
// console.log(arr.indexOf(2, NaN));
// console.log(arr.indexOf(2, [3]));
// console.log(arr.indexOf(2, '3'));
// console.log(arr.indexOf(2, true));

// var str = '123568910';
// console.log(str.indexOf(2));
// console.log(str.indexOf(2, 3));
// console.log(str.indexOf(2, -1)); // 字符串的indexOf 不支持负数， 把负数当做0看, 把负数当做0是字符串处理的一种通用方式
// console.log(str.indexOf(2, null));
// console.log(str.indexOf(2, undefined));
// console.log(str.indexOf(2, NaN));
// console.log(str.indexOf(2, [3]));
// console.log(str.indexOf(2, '3'));
// console.log(str.indexOf(2, true));

// 总结： 
// 1. 字符串方法一般不处理参数为负数的情况，除了substr()
// 2. 方法中的参数一般都会进行参数的隐式转换

// lastIndexOf() -> 反向来找 -> 从后往前找

var str = '123568920';
console.log(str.lastIndexOf(2, 0)); //-1
console.log(str.lastIndexOf(2, null)); //-1
console.log(str.lastIndexOf(2, NaN)); //7
console.log(str.lastIndexOf(2, undefined)); //7
console.log(str.lastIndexOf(2)); //7
console.log('========================================')

var arr = [1, 2, 3, 5, 6, 8, 9, 2, 0];
console.log(arr.lastIndexOf(2, 0)); //-1
console.log(arr.lastIndexOf(2, null)); //-1
console.log(arr.lastIndexOf(2, NaN)); //7 
console.log(arr.lastIndexOf(2, undefined)); //7
console.log(arr.lastIndexOf(2)); //7
// 总结 
// 1. str 的 lastIndexOf()中，第二个参数为NaN 和 undefined 是特例，相当于没传值的情况，或者传入的值为str.length - 1
// 2. 数组不会这样



var comonTools = {
    myTypeOf: function(val) {
        var type = typeof val;

        var resSet = {
            "[object Object]": 'object',
            "[object Array]": 'array',
            "[object Number]": 'number',
            "[object String]": 'obj_number',
            "[object Number]": 'obj _string',
            "[object Boolean]": 'obj_boolean',
            "[object Date]": 'date',
            "[object RegExp]": 'regexp'
        }
        if (val === null) {
            return null;
        } else if (type === 'object') {
            var res = Object.prototype.toString.call(valf);
            return resSet[res];
        } else {
            return type;
        }
    }
}