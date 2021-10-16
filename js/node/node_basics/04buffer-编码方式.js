//Buffer
// 比喻
// 将一桶放到另一个容器中，如果直接倒由于量太大，速度太快，会有漏出或容器不够的情况，
// 这时使用一个勺来去水在放到容器中，取一勺，放一勺，直到将水取完
// 这个勺就是 buffer

//  =======================

// 字符集 和 字符编码

// unicode
// utf-32 : 所有字符都占4个字节，4个字节中空的地方占位
// javascript 默认使用utf-16 可用(2或4) 个字节来表示字符
// utf-8 : 可用 1或4个字节表示字符

// 0******* -> 表示1个字节表示字符
// 110***** 10****** -> 表示两个字节表示字符
// 1110**** 10****** 10****** -> 表示3个字节表示字符
// 11110*** 10****** 10****** 10****** -> 4个字节表示字符

//  =======================

// buffer 使用的是utf-8的编码方式 -> 认为是最好的编码方式
// buffer : Buffer 类是作为Node.js API的一部分引入的用于在TCP流，文件系统操作，及其他上下文中与八位字节流进行交互。
// TCP流和文件系统操作使用二进制数据流的机制

// // 1. buffer 就是用来处理二进制数据流的
// // 2. 实例类似于整数(0-255 用16进制的方式)数组, 但是length固定，没有push,shift 等方法；
// // 对应于V8 对外部的固定大小的原始内存分配，Buffer的大小创建时确定，且不可以更改
// // buffer示例的长度为什么是固定的: node 代码不是在V8中申请，是node中C++层面来实现的
// // node的buffer申请不是通过JavaScript引擎来实现的， 而是C++来实现的
// // 实际是用底层的c++实现的，依靠的是slab(动态内存分的方式) -> slab 基于FreeBSD -> 是Linux的内存分配方式
// const buf = Buffer.from('test');
// console.log(buf); // <Buffer 74 65 73 74>
// console.log(buf.length); //4

// 3. buffer 属于全局对象(global)

//  =======================

// // 实例化Buffer
// // Buffer.alloc(size, [fill, [编码方式]])
// // size 定义在Buffer.poolSize, int类型，默认值:8192
// const buf = Buffer.alloc(10, 1); // 10个元素，填充1
// console.log(buf);

// // Buffer.allocUnsafe(size);
// const buf2 = Buffer.allocUnsafe(10);
// console.log(buf2);

// // BUffer.from(info, [编码])
// // info -> string, array, number
// const buf3 = Buffer.from([1, 2, 3]);
// console.log(buf3);

// const buf4 = Buffer.from('test'); // 默认utf-8
// const buf4 = Buffer.from('test', 'utf8'); // 显示的utf-8
// const buf4 = Buffer.from('test', 'utf16le'); // 显示的utf-16
// const buf4 = Buffer.from('test', 'ucs2'); // ucs2 是 utf16le 的别名
// console.log(buf4);

// npm 包 iconv 提供多种编码方法
// iconv-lite -> iconv的精简版，也是提供多种编码方式
// 以上两个包工作中常用


// // from(string [, encoding])
// const buf1 = BUffer.from('this is a test');
// console.log(buf1);
// console.log(buf1.length);

// // from(obj, [offsetOrEncoding [, length]])
// // obj 必须是Array-like
// var obj = {
//     '0': 1,
//     '1': 2,
//     length: 5
// };
// var buf = Buffer.from(obj);
// console.log(buf); //<Buffer 01 02 00 00 00>


// buff[index] 的使用
// // 01;
// var str = 'http://nodejs.cn/';
// const buf = Buffer.from(str);
// console.log(buf); // <Buffer 68 74 74 70 3a 2f 2f 6e 6f 64 65 6a 73 2e 63 6e 2f>
// console.log(buf[0]); //104 -> 系统自动将utf-8编码转换为了ascii编码

// //02
// var str = 'http://nodejs.cn/';
// const buf = Buffer.allocUnsafe(str.length);

// for (var i = 0; i < str.length; i++) {
//     buf[i] = str.charCodeAt(i);
// }

// console.log(buf.toString('ascii')); //http://nodejs.cn/

// //03
// var str = 'http://nodejs.cn/';
// const buf = Buffer.from(str)
// var resstr = ''
// for (var i = 0; i < buf.length; i++) {
//     resstr += String.fromCodePoint(buf[i]);
// }

// console.log(resstr); //http://nodejs.cn/