// 浮点数精度问题
// 问题
console.log(0.1 + 0.2 === 0.3); // false
console.log(0.1 + 0.2 == 0.3); // false

// 原因： 小数点2进制精度的问题

// 四舍五入的方法
// Number.prototype.toPrecision(); -> 参数指的是这个数保留的数量
var numObj = 123.6789;
console.log(numObj.toPrecision(4));

// Number.prototype.toFixed(); -> 参数值的是保留的小数点的数量
console.log(numObj.toFixed(2));

console.log(numObj.toFixed(16));
console.log(numObj.toFixed(17));
console.log(numObj.toFixed(18));

// 浮点数精度问题的来源 -》 10 进制转2进制时，小数部分乘不尽，就造成了精度问题

// js 使用的是 64 位双精度浮点数来表示数字
// 从左到右， 第一位表示正负 符号位
// 往后11位表示指数
// 剩余位数用来精确表示数字

// 推算JS能表示的最大数

console.log(2 ** 1023);
console.log(2 ** 1023 + 1.9999999999999);

// console.log(2 ** 1024 -1); 理论上 js中能表示的最大数是 2 的 1024 次方 -1, 但是这个数是打印不出来的 因为 infinity - 1 = infinity

console.log(2 ** -1024 + 1);


// 精度
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991 -> 2**53 -1
console.log(Number.MAX_VALUE); // 1.7976931348623157e+308 -> JS 中能表示的最大数

// js 最小误差
console.log(Number.EPSILON);

// 为什么 2**53 - 1 是最大精度，如下
console.log(2 ** 53 === 2 ** 53 + 1); // true
// 为什么最大精度是这个，因为物理空间就是64位的



// 解决最大精度限制
// bigInt  大数
// 大数可以解决 2**53 -1 的限制

var bigNum = BigInt(Number.MAX_SAFE_INTEGER);
var a = BigInt(1);
console.log(bigNum == bigNum + a); //true


// 解决最大精度限制和浮点数精度问题
// 安装 number-precision


// 放大方式来写加法，解决浮点数精度问题