// buf.write(string[, offset[, length]][, encoding])#
// string <string> 要写入 buf 的字符串。
// offset <integer> 开始写入 string 之前要跳过的字节数。默认值: 0。
// length <integer> 要写入的最大字节数（写入的字节数不会超出 buf.length - offset）。默认值: buf.length - offset。
// encoding <string> string 的字符编码。默认值: 'utf8'。
// 返回: <integer> 已写入的字节数。
// 根据 encoding 指定的字符编码将 string 写入到 buf 中的 offset 位置。 length 参数是要写入的字节数。 如果 buf 没有足够的空间保存整个字符串，则只会写入 string 的一部分。 只编码了一部分的字符不会被写入。
// const buf = Buffer.alloc(5);
// console.log(buf); //<Buffer 00 00 00 00 00>
// const len = buf.write('test', 1, 3);

// console.log(len); // 3 写入的长度
// console.log(buf); // <Buffer 00 74 65 73 00>

//  =======================

// // buf.toString([encoding[, start[, end]]])#
// // encoding <string> 使用的字符编码。默认值: 'utf8'。
// // start <integer> 开始解码的字节偏移量。默认值: 0。
// // end <integer> 结束解码的字节偏移量（不包含）。默认值: buf.length。
// // 返回: <string>
// // 根据 encoding 指定的字符编码将 buf 解码成字符串。 传入 start 和 end 可以只解码 buf 的子集。

// // 如果 encoding 为 'utf8'，并且输入中的字节序列不是有效的 UTF-8，则每个无效的字节都会由替换字符 U+FFFD 替换。

// // 字符串的最大长度（以 UTF-16 为单位）可查看 buffer.constants.MAX_STRING_LENGTH。
// const buf = Buffer.allocUnsafe(26);

// for (let i = 0; i < 26; i++) {
//     buf[i] = i + 97;
// }
// console.log(buf.toString('ascii'));

// const buf2 = Buffer.from('test');
// console.log(buf2.toString(undefined, 1, 3)); // undefined 表示不传第一个参数, 默认为utf8

//  =======================

// // Buffer.isEncoding(encoding)
// // encoding <string> 要检查的字符编码名称。
// // 返回: <boolean>
// // 如果 encoding 是支持的字符编码的名称，则返回 true，否则返回 false。

// console.log(Buffer.isEncoding('utf-8'));
// // 打印: true

// console.log(Buffer.isEncoding('hex'));
// // 打印: true

// console.log(Buffer.isEncoding('utf/8'));
// // 打印: false

// console.log(Buffer.isEncoding(''));
// // 打印: false

//  =======================

// // Buffer.byteLength(string[, encoding])#
// // string <string> | <Buffer> | <TypedArray> | <DataView> | <ArrayBuffer> | <SharedArrayBuffer> 要计算长度的值。
// // encoding <string> 如果 string 是字符串，则这是它的字符编码。默认值: 'utf8'。
// // 返回: <integer> string 中包含的字节数。
// // 当使用 encoding 进行编码时，返回字符串的字节长度。 与 String.prototype.length 不同，后者不会考虑用于将字符串转换为字节的编码。

// // 对于 'base64' 和 'hex'，此函数会假定输入是有效的。 对于包含非 base64/hex 编码的数据（例如空格）的字符串，返回值可能是大于从字符串创建的 Buffer 的长度。

// const str = '\u00bd + \u00bc = \u00be';

// console.log(`${str}: ${str.length} 个字符， ` +
//     `${Buffer.byteLength(str, 'utf8')} 个字节`);

// console.log(Buffer.byteLength('test', 'utf8')); // 4
// console.log(Buffer.byteLength('test', 'ascii')); // 4
// console.log(Buffer.byteLength('test', 'hex')); // 2

// let str = '华英雄';
// let buf = Buffer.from(str);
// console.log(str.length); // 3
// console.log(buf.length); // 9
// console.log(Buffer.byteLength(str)); // 9

//  =======================

// // Buffer.compare(buf1, buf2)
// // buf1 <Buffer> | <Uint8Array>
// // buf2 <Buffer> | <Uint8Array>
// // 返回: <integer> -1、 0 或 1，取决于比较的结果。 有关详细信息，参见 buf.compare()。
// // 比较 buf1 与 buf2，主要用于 Buffer 实例数组的排序。 相当于调用 buf1.compare(buf2)。
// const buf1 = Buffer.from('1234');
// const buf2 = Buffer.from('0123');
// const arr = [buf1, buf2];
// console.log(arr.sort(Buffer.compare));
// // 打印: [ <Buffer 30 31 32 33>, <Buffer 31 32 33 34> ]
// // (结果相当于: [buf2, buf1])

//  =======================

// // Buffer.concat(list[, totalLength])#
// // list <Buffer[]> | <Uint8Array[]> 要合并的 Buffer 数组或 Uint8Array 数组。
// // totalLength <integer> 合并后 list 中的 Buffer 实例的总长度。
// // 返回: <Buffer>
// // 返回一个合并了 list 中所有 Buffer 实例的新 Buffer。

// // 如果 list 中没有元素、或 totalLength 为 0，则返回一个长度为 0 的 Buffer。

// // 如果没有提供 totalLength，则通过将 list 中的 Buffer 实例的长度相加来计算得出。

// // 如果提供了 totalLength，则会强制转换为无符号整数。 如果 list 中的 Buffer 合并后的总长度大于 totalLength，则结果会被截断到 totalLength 的长度。

// // 用含有三个 `Buffer` 实例的数组创建一个单一的 `Buffer`。

// const buf1 = Buffer.alloc(10);
// const buf2 = Buffer.alloc(14);
// const buf3 = Buffer.alloc(18);
// const totalLength = buf1.length + buf2.length + buf3.length;

// console.log(totalLength);
// // 打印: 42

// const bufA = Buffer.concat([buf1, buf2, buf3], totalLength);

// console.log(bufA);
// // 打印: <Buffer 00 00 00 00 ...>
// console.log(bufA.length);
// // 打印: 42

//  =======================

// Buffer.isBuffer(), isCodeing


//  =======================

// buf.slice(), buf.copy(), buf.fill(), buf.indexOf(), buf.lastIndexOf(), buf.includes(), buf.equals(), buf.keys(), 

// // 示例
// console.log(Buffer.allocUnsafe(4).fill('\u0222')); // c8 a2 c8 a2
// console.log(Buffer.allocUnsafe(3).fill('\u0222')); // c8 a2 c8
// console.log(Buffer.allocUnsafe(6).fill('\u0222')); // c8 a2 c8 a2 c8 a2

// let buf = Buffer.allocUnsafe(5);
// console.log(buf.fill('a')); //<Buffer 61 61 61 61 61>
// console.log(buf.fill('aazz', 'hex')); //<Buffer aa aa aa aa aa>
// console.log(buf.fill('zz', 'hex')); // 抛出异常：hex 内没有z, 16进制只到f

// const buf = Buffer.from('this is a buffer');
// console.log(buf.indexOf('this'));
// console.log(buf.indexOf('is'));
// console.log(buf.indexOf(Buffer.from('a buffer')));

//  =======================

// //buffer 的使用
// const { StringDecoder } = require('string_decoder');
// const decoder = new StringDecoder('utf8');
// const buffer = Buffer.from('中文字符串');
// for (var i = 0; i < buffer.length; i += 5) {
//     const b = Buffer.alloc(5);
//     buffer.copy(b, 0, i);
//     console.log(decoder.write(b)); // 使用decoder解决乱码的情况，string_decoder会将string未解析的部分进行收集，留到下次解析
// }

//  =======================

// // path
// // POSIX ：类unix系统

// // path 的组成部分
// const { dirname, basename, extname, sep, delimiter } = require('path');

// // // path.dirname(path)
// console.log(dirname('/fll/bar/baz/asdf/quux/'));

// // // path.basename
// console.log(basename('/fll/bar/baz/asdf/quux.html'));

// // path.extname() 后缀名
// console.log(extname('index.html'))

// // 分隔符 sep
// console.log(sep);

// //path.delimiter 定界符
// console.log(delimiter)
// const process = require('process');
// // console.log(process.env.PATH);
// const res = process.env.PATH.split(delimiter);
// console.log(res);

// // 规范化 path.normalize(path)
// const path = require('path');
// console.log(path.normalize('/foo/bar//baz/asdf/quux/..')); //\foo\bar\baz\asdf
// console.log(path.normalize('C:\\temp\\\\foo\\bar\\..\\')); //C:\temp\foo\

//path.join([...path]);

// const path = require('path');
// // path.isAbsolute();
// console.log(path.isAbsolute('./foo/bar')); // false
// console.log(path.isAbsolute('/foo/bar')); // true

// // path.resolve([...paths]); -> 将路径或路径片段序列解析为绝对路径, 参数选择是从右往左
// console.log(path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif')); // D:\code\javascript\js\node\wwwroot\static_files\gif\image.gif
// console.log(path.resolve('wwwroot', 'static_files/png/', '/gif/image.gif')); // D:\gif\image.gif -> /gif/image.gif 已经是绝对路径了，所以不会看其他的参数

// path.relative(from, to); -> 根据当前工作目录，返回from 到 to 的相对路径


// // path.parse() -> 将路径解析为对象

// // path.format() -> 将对象解析为路径
// console.log(path.format({
//     root: '/ignored',
//     dir: '/home/usr/dir',
//     base: 'file.txt'
// }));

// // path.posix, path.win32
// console.log('posix' + path.posix.sep);
// console.log('win32' + path.sep);