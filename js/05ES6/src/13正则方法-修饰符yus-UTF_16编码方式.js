// ES6 正则拓展

// ES5 正则复习
// /\w/gim
// 修饰符
// g: global 全局匹配
// i: ignore 忽略大小写
// m: mutli-line 多行

// var reg = /\w/gim;
// var str = 'sdfjfdkslajfdlk123';
// console.log(str.match(reg));

// 元字符 -> 大写为非
// /w: word
// /W: !word
// \d / \D: digit [0-9]
// \s \S: space -> \n,\t,\f -> 换页符,\v -> 垂直换行
// \b \B: bridge -> 单词边界
// . : 任意的单个字符，除了 \n \r 外其他都可以代表
// var reg = /[0-9][A-Z][a-x]/gim;
// var reg = /\w\W/gim; // 匹配所有字符

// 贪婪模式 和 非贪婪模式
// 正向预查 -> 先行断言 -> 先行否定断言
// 反向预查
// /x(?=y)/

// ======================================

// ES6 正则

// 1. 声明正则的表达方式 -> 新增 new RegExp()
// var reg = new RegExp('xyz', 'ig');
// // var reg1 = /xyz/ig; // es5 的方法

// var str = 'xyzxyzxyzxyz';
// console.log(str.match(reg)); //(4) ["xyz", "xyz", "xyz", "xyz"]
// console.log(str.match(reg1)); // (4) ["xyz", "xyz", "xyz", "xyz"]

// 传正则
// var reg = new RegExp(/xyz/gi);
// var str = 'xyzxyzxyzxyz';
// console.log(str.match(reg)); //(4) ["xyz", "xyz", "xyz", "xyz"]

// var str = 'xyzxy\nzxyzxyzxy\nzxyzxyzx\nyzxyz';
// var reg = new RegExp(/xyz/gi, 'mg')
// // 如果RegExp的两个参数都有修饰符，只让第二个参数生效
// console.log(str.match(reg)); //(6) ["xyz", "xyz", "xyz", "xyz", "xyz", "xyz"]

// // 2. 字符串上的正则方法进行了调整
// // console.log(RegExp.prototype); // 查看RegExp的原型
// // console.log(String.prototype); // 查看String的原型

// // ES6 将字符串方法搬到了正则对象的原型中，使用[Symbol.] 的接口方式来调用
// console.log(RegExp.protoype[Symbol.match]);
// console.log(RegExp.protoype[Symbol.replace]);
// conhole.log(RegExp.protoype[Symbol.search]);
// console.log(RegExp.protoype[Symbol.split]);

// console.log(String.prototype.match);
// console.log(String.prototype.replace);
// console.log(String.prototype.search);
// console.log(String.prototype.split);

// 3. 新增的修饰符 u y s

// var reg = new RegExp('xyz', 'ig');
// console.log(reg.global);
// console.log(reg.ignoreCase);
// console.log(reg.multiline);

// // console.log(reg.sticky); // y: sticky 沾粘, 类似全局匹配，但是必须与前面的匹配相连，如果中间有间隔则不成立
// var str = 'aaa_aa_a';
// var reg1 = /a+/g;
// var reg2 = /a+/y;

// console.log(reg1.exec(str)); // aaa
// console.log(reg1.exec(str)); // aa
// console.log(reg1.exec(str)); // a

// console.log(reg2.exec(str)); // aaa
// console.log(reg2.exec(str)); // null
// console.log(reg2.exec(str)); // null

// var reg = /\wabed/giy;
// console.log(reg.source); //\wabed 正则主题
// console.log(reg.flags); // giy 正则修饰符


// 修饰符 u -> unicode
// // 码点： utf16的码点： u+0000 到 U+FFFF;

// // unicode分区定义: utf-16 分区： 2的16次方(BMP) 的字节长度做为一个平面，整个Unicode有17个平面
// // js字符串是使用utf-16分区来进行存储的

// // 如果2个字节不够，就用4个字节
// // 一些特殊汉字，不在2个字节范围之内，而在4个字节范围之内，采用过了映射方法
// // 将U+D800 - U+FFFF 与4个字节进行映射
// console.log('\u20bb7'); // ₻7 浏览器和js引擎不识别
// console.log('\uD842\uDFB7'); // 𠮷  \uD800后对4字节进行了映射，所以要用4个字节来表示一个字符
// // ES6 提供了4个字节的解析方式
// console.log('\u{20bb7}');

// // ES5时， 下述匹配方式会返回true, 这样的返回值是错误的,因为这里'\uD83D\uDC2A' 4个字节代表一个字符，不应该被拆分来识别
// console.log(/^\uD83D/.test('\uD83D\uDC2A')); //true
// // ES6 通过u修饰符修正了这个错误
// console.log(/^\uD83D/u.test('\uD83D\uDC2A')); //false

// // 示例
// var s = '\uD842\uDFB7'; // 代表一个字符
// console.log(s); //𠮷
// // js字符串是utf16 -> 2个字节长度，超过这个字节长度，.(或者其他元字符)就匹配不到，所以返回false
// console.log(/^.$/.test(s)); // false
// // 修饰符u 可以解决这个问题
// console.log(/^.$/u.test(s)); // true

// 量值 {}
// console.log('\u{20bb7}'); //𠮷
// console.log(/a{2}/.test('aa')); //true

// // 在{}前面加\u, 让{}内被是被为unicode码点而不是量值
// console.log(/\u{20bb7}/u.test('𠮷')); // true
// console.log(/{20bb7}/u.test('𠮷')); //SyntaxError: Invalid regular expression: /{20bb7}/: Lone quantifier brackets

// ======================================

// // s 修饰符 dotAll -> . 可以匹配所有字符

// // 让.兼容所有字符， ESMA2018已经提出
// console.log(/foo.bar/.test('foo\nbar')); //false 老版本.不能匹配\n, \r 
// console.log(/foo.bar/s.test('foo\nbar')); // true
// console.log(/foo.bar/s.dotAll); //true