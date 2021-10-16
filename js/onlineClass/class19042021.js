// 数组与字符串的方法比较

// match() , exec();
// match() -> String 原型上的方法
// exec() -> Regexp 原型上的方法 -> perl的写法

// // 示例1
// var str = 'jayde1nj2ame3sa5lei8xstexas';
// console.log(str.match(/\d/)); //数组，匹配到的单个值

// console.log(str.match(/\d/g)); //数组，匹配所有的数字

// 示例2
// var str = 'cat, bat, sat, fat';
// var reg = /.at/;
// var match1 = reg.exec(str);
// var match2 = reg.exec(str);
// var match3 = reg.exec(str);
// console.log(match1); // cat 数组，匹配到的第一个
// console.log(match2); // cat 数组，匹配到的第一个
// console.log(match3); // cat 数组，匹配到的第一个

// var reg = /.at/g; // g记忆功能
// console.log(str.match(reg)); //["cat", "bat", "sat", "fat"]
// var match1 = reg.exec(str);
// var match2 = reg.exec(str);
// var match3 = reg.exec(str);
// var match4 = reg.exec(str);
// var match5 = reg.exec(str);
// console.log(match1); // cat 数组，匹配到的第一个
// console.log(match2); // bat 数组，匹配到的第一个
// console.log(match3); // sat 数组，匹配到的第一个
// console.log(match4); // fat 数组，匹配到的第一个
// console.log(match5); // null

// // string 的方法
// // String.prototype.charCodeAt();
// console.log(String.prototype.charCodeAt.call('a')); //97
// console.log(String.prototype.charCodeAt.call('A')); //65
// console.log('A'.charCodeAt()); //65

// // String.fromCharCode(97)
// console.log(String.fromCharCode(97)); // 'a'

// // String.prototype.charAt.call('abc', 0);
// console.log(String.protorype.charAt.call('abc', 0));

// 'ABC...Z
// // 方法1
// var res = '';
// for (let i = 0; i < 26; i++) {
//     res += String.fromCharCode(65 + i);
// }
// console.log(res);

// // 方法2
// console.log(new Array(26).reduce((prev, cur, index) => {
//     return prev + String.fromCharCode(65 + index);
// }, '')); // 返回空 因为 foreach,map,filten,some, every, reduce, reduceright 遍历的要求是必须有值，而new Array(26) 是一个长为26 的空数组

// // 正确方法
// console.log(new Array(26).fill('').reduce((prev, cur, index) => {
//     return prev + String.fromCharCode(65 + index);
// }, '').match(/\w/g).join(''))

// console.log(Array.of(26));


// 字符串转大小写
// console.log(String.prototype.toLocaleLowerCase.call('Abc')); // 可以转除英文外其他语言
// console.log(String.prototype.toLocaleUpperCase.call('Abc'));
// console.log(String.prototype.toLowerCase.call('Abc'));
// console.log(String.prototype.toUpperCase.call('Abc'));


// // 一些特殊方法，不使用， 但是要知道, 因为要求样式分离
// var str = 'this is a test';
// test.innerHTML = str.anchor('http//:www.baidu.com'); // 多了个a标签
// test.innerHTML = str.link('http://www.baidu.com'); //a,nef
// test.innerHTML = str.big();
// test.innerHTML = str.small();
// test.innerHTML = str.fixed();
// test.innerHTML = str.fontcolor('green');
// test.innerHTML = str.sub();
// test.innerHTML = str.sup();

// // slice, substring, substr 的区别
// // slice 
// // 1. 数组slice 和 string 的 slice 没有区别
// var str = '12345';
// console.log(str.slice());
// console.log(str.slice(1));
// console.log(str.slice(1, 3));
// console.log(str.slice(3, 1)); // 截取不到
// console.log(str.slice(-2));
// console.log(str.slice(NaN));
// console.log('====================================')

// // substring
// var str = '12345';
// console.log(str.substring());
// console.log(str.substring(1));
// console.log(str.substring(1, 3));
// console.log(str.substring(3, 1)); // 支持反序
// console.log(str.substring(-2)); // 不支持负数
// console.log(str.substring(NaN));
// console.log('====================================')

// // substr -> 已经很不用了, 第二个参数是长度
// var str = '12345';
// console.log(str.substr());
// console.log(str.substr(1));
// console.log(str.substr(1, 3));
// console.log(str.substr(3, 1));
// console.log(str.substr(-2));
// console.log(str.substr(NaN));