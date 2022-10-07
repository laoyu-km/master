// RegExp ES6 extension

// // 1. new RegExp(正则表达式, 修饰符); -> es5 不可以， 但是es6可以
// // 参数2修饰符会替换参数1的修饰符
// var reg = new RegExp(/jayden/g, 'im');

// console.log(reg.global); // false
// console.log(reg.ignoreCase); // true
// console.log(reg.multiline); // true
// console.log(reg.flags); // im

// 2. 修饰符 u
// 正确处理大于\uFFFF的 Unicode 字符。也就是说，会正确处理四个字节的 UTF-16 编码
console.log('\uD83D\uDC2A');
console.log('>\\uFFFF字符', /^\uD83D/.test('\uD83D\uDC2A')); // true
console.log('>\\uFFFF字符', /^\uD83D/u.test('🐪')); //fasle
console.log('=========================');

// 2.1 点字符
// 点（.）字符在正则表达式中，含义是除了换行符以外的任意单个字符。对于码点大于0xFFFF的 Unicode 字符，点字符不能识别，必须加上u修饰符
var char = '𠮷';
console.log('无u点字符', /^.$/.test(char)); // fasle
console.log('有u点字符', /^.$/u.test(char)); //true
console.log('=========================');

// 2.2 Unicode 字符表示法
// ES6 新增了使用大括号表示 Unicode 字符，这种表示法在正则表达式中必须加上u修饰符，才能识别当中的大括号，否则会被解读为量词
console.log(/\u{61}/.test('a')); // fasle
console.log(/\u{61}/u.test('a')); // true
console.log(/\u{20BB7}/u.test(char)); //true
console.log('=========================');

// 2.3 量词
// 使用u修饰符后，所有量词都会正确识别码点大于0xFFFF的 Unicode 字符
console.log(/a{2}/.test('aa')); // true
console.log(/a{2}/u.test('aa')); // true
console.log(/𠮷{2}/.test('𠮷𠮷')); // false
console.log(/𠮷{2}/u.test('𠮷𠮷')); // true
console.log('=========================');

// 2.4 预定义模式
// u修饰符也影响到预定义模式，能否正确识别码点大于0xFFFF的 Unicode 字符
console.log(/^\S$/.test('𠮷')); // false
console.log(/^\S$/u.test('𠮷')); // true

// 利用这一点，可以写出一个正确返回字符串长度的函数
function codePointLenth(str) {
  var result = str.match(/[\s\S]/gu);
  return result ? result.length : 0;
}

var s = '𠮷𠮷';

console.log(s.length); // 4
console.log(codePointLenth(s)); //2
console.log('=========================');

// 2.5 i 修饰符
// 有些 Unicode 字符的编码不同，但是字型很相近，比如，\u004B与\u212A都是大写的K, 不加u修饰符，就无法识别非规范的K字符
console.log(/[a-z]/i.test('\u212A')); //false
console.log(/[a-z]/iu.test('\u212A')); // true
console.log('=========================');

// 2.6 转义
// 没有u修饰符的情况下，正则中没有定义的转义（如逗号的转义\,）无效，而在u模式会报错。
console.log(/\,\/ \\\\ \/\,/.test(',/ \\\\ /,')); // true
// console.log(/\,\/ \\ \/\,/u.test(',/ \\ /,')); // 报错
console.log('=========================');

// 3. RegExp.prototype.unicode 属性
// 表示是否设置了u修饰符

// 4. 修饰符 y
// y修饰符的作用与g修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始
// 不同之处在于，g修饰符只要剩余位置中存在匹配就可，而y修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义
// 要求必须在lastIndex指定的位置发现匹配
// var str = 'jaydenariellajaydentexasjaydenphillips';
var str = 'aaa_aa_a';

var yreg = /a+/y;
console.log(yreg.exec(str)); // ['aaa', index:0, input: 'aaa_aa_a']
console.log(yreg.exec(str)); // null

var yreg2 = /a+_?/y;
console.log(yreg2.exec(str)); // ['aaa_', index:0, input:'aaa_aa_a']
console.log(yreg2.exec(str)); // ['aa_', index:4, input:'aaa_aa_a']
console.log(yreg2.exec(str)); // ['a', index:7, input:'aaa_aa_a']
console.log(yreg2.exec(str)); // null
console.log('=========================');

// y修饰符的设计本意，就是让头部匹配的标志^在全局匹配中都有效
// 单单一个y修饰符对match方法，只能返回第一个匹配，必须与g修饰符联用，才能返回所有匹配
var reg = /a/gy;
console.log('aaxa'.replace(reg, '-')); // --xa
console.log('aaaxa'.replace(/a/y, '-')); // -axa
console.log('=========================');

// y修饰符的一个应用，是从字符串提取 token（词元），y修饰符确保了匹配之间不会有漏掉的字符。
function tokenize(reg, str) {
  var result = [];
  var match;

  while ((match = reg.exec(str))) {
    result.push(match[1]);
  }
  return result;
}

var regy = /\s*(\+|[0-9]+)\s*/y;
var regg = /\s*(\+|[0-9]+)\s*/g;

var s1 = '3 + 4';
var s2 = '3x + 4';

console.log(tokenize(regg, s1)); // ['3', '+', '4']
console.log(tokenize(regy, s1)); // ['3', '+', '4']

console.log(tokenize(regg, s2)); // ['3', '+', '4']
console.log(tokenize(regy, s2)); // ['3']
console.log('=========================');

// 5. RegExp.prototype.stick 属性
// 表示是否设置了y修饰符

// 6. 修饰符 s
//.代表任意的单个字符，但是有两个例外。一个是四个字节的 UTF-16 字符，这个可以用u修饰符解决；另一个是行终止符（line terminator character）。
/**
 * 所谓行终止符，就是该字符表示一行的终结。以下四个字符属于“行终止符”
 * U+000A 换行符（\n）
 * U+000D 回车符（\r）
 * U+2028 行分隔符（line separator）
 * U+2029 段分隔符（paragraph separator）
 */

// ES2018 引入s修饰符，使得.可以匹配任意单个字符
console.log(/foo.bar/.test('foo\nbar')); // false
console.log(/foo.bar/s.test('foo\nbar')); // true
console.log('=========================');

// 7. RegExp.prototype.dotAll 属性
// 表示该正则表达式是否处在dotAll模式

// 8. 后行断言 后行否定断言
// 后行断言 -> (?<=y)x
// 后行否定断言 -> (?<!y)x
var str = 'arillajaydentexasjaydenphillipsjayden';
console.log(str.replace(/(?<=texas)jayden/g, '-')); // arillajaydentexas-phillipsjayden
console.log(str.replace(/(?<!texas)jayden/g, '-')); // arilla-texasjaydenphillips-
console.log('=========================');

// “后行断言”的实现，需要先匹配/(?<=y)x/的x，然后再回到左边，匹配y的部分。这种“先右后左”的执行顺序，与所有其他正则操作相反，导致了一些不符合预期的行为。

// 后行断言的组匹配，与正常情况下结果是不一样的
// 断言中的组也是会被匹配的
console.log(/(?<=(\d+)(\d+))\w$/.exec('1305b')); // ['b', '1', '053', index: 4, input: '1053b']
// 上面代码中，需要捕捉两个组匹配。没有“后行断言”时，第一个括号是贪婪模式，第二个括号只能捕获一个字符，所以结果是105和3。而“后行断言”时，由于执行顺序是从右到左，第二个括号是贪婪模式，第一个括号只能捕获一个字符，所以结果是1和053
console.log(/\w(?=(\d+)(\d+))/.exec('b1035')); // ['b', '103', '5', index: 0, input: 'b1035']
console.log('=========================');

// “后行断言”的反斜杠引用，也与通常的顺序相反，必须放在对应的那个括号之前
// 仅在断言部分
console.log(/(?<=(o)d\1)(r)\2/.exec('hodorr')); // null
console.log(/(?<=\1d(o))(r)\2/.exec('hodorr'));
console.log('=========================');

// 9. 具名组匹配
// 模式的头部添加“问号 + 尖括号 + 组名”（?<year>），然后就可以在exec方法返回结果的groups属性上引用该组名
// 如果具名组没有匹配，那么对应的groups对象属性会是undefined
var reg = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
console.log(reg.exec('2022-09-16'));
console.log('=========================');

// 9.1 解构赋值和替换
let {
  groups: { one, two },
} = /(?<one>\w+):(?<two>\w+)/.exec('jayden:alexis');
console.log(one, two);

// 字符串替换时，使用$<组名>引用具名组
let reg2 = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
console.log('2022-09-16'.replace(reg2, '$<day>/$<month>/$<year>'));

// replace方法的第二个参数也可以是函数，该函数的参数序列如下
console.log(
  '2022-09-16'.replace(
    reg2,
    (
      matched, // 整个匹配结果 2022-09-16
      capture1, // 第一个组匹配 2022
      capture2, // 第二个组匹配 09
      capture3, // 第三个组匹配 16
      position, // 匹配开始的位置 0
      S, // 原字符串 2022-09-16
      groups // 具名组构成的一个对象 {year, month, day}
    ) => {
      let { day, month, year } = groups;
      return `${day}/${month}/${year}`;
    }
  )
);
console.log('=========================');

// 9.2 引用
// 如果要在正则表达式内部引用某个“具名组匹配”，可以使用\k<组名>的写法
var reg1 = /(?<word>\w+)!\k<word>/;
console.log(reg1.test('abc!abc')); // true

// 数字引用（\1）依然有效
var reg11 = /(?<word>\w+)!\1/;
console.log(reg11.test('abc!abc')); // true

// 这两种引用语法还可以同时使用
var reg111 = /(?<word>\w+)!\k<word>!\1/;
console.log(reg111.test('abc!abc!abc')); //true

// 10. 修饰符 d -> indices -> 数组，匹配开始和结束的位置
// ES2022 新增了d修饰符，这个修饰符可以让exec()、match()的返回结果添加indices属性，在该属性上面可以拿到匹配的开始位置和结束位置
// 开始位置包含在匹配结果之中，相当于匹配结果的第一个字符的位置。但是，结束位置不包含在匹配结果之中，是匹配结果的下一个字符
const pornstr = 'ferrerajaydenwicky';
const result = /jayden/d.exec(pornstr);
console.log(result.index); // 7
console.log(result.indices[0]); //[7, 13]
console.log('=========================');

// 如果正则表达式包含组匹配，那么indices属性对应的数组就会包含多个成员，提供每个组匹配的开始位置和结束位置
// 第一个成员是整个匹配结果（abbcd）的开始位置和结束位置，第二个成员开始是组匹配（cd）的开始位置和结束位置
const text = 'zabbcdef';
const result2 = /ab+((cd)ef)/d.exec(text);
console.log(result2.indices); // [[1, 8], [4, 8], [4, 6]]
console.log('=========================');

// 如果正则表达式包含具名组匹配，indices属性数组还会有一个groups属性。该属性是一个对象，可以从该对象获取具名组匹配的开始位置和结束位置
const text2 = 'zabbcdef';
const result3 = /ab+(?<tail>(?<center>cd)ef)/d.exec(text2);
console.log(result3.indices.groups.center); // [4, 6]
console.log(result3.indices.groups.tail); // [4, 8]
console.log('=========================');

// 11. String.prototype.matchAll -> 必须g修饰符
const string = 'test1test2test3';
const iter = string.matchAll(/t(e)(st(\d?))/g);
for (const match of iter) {
  console.log(match);
}
console.log('=========================');

// 遍历器转为数组是非常简单的，使用...运算符和Array.from()方法就可以了
console.log([...string.matchAll(/t(e)(st(\d?))/g)]);
console.log(Array.from(string.matchAll(/t(e)(st\d?)/g)));
console.log('=========================');

// 12. v 修饰符 -> Unicode 属性类的计算

// 13. 字符串的正则方法
// String.prototype.search()/match()/replace()/split() 在语言内部全部调用RegExp的实例方法，从而做到所有与正则相关的方法，全都定义在RegExp对象上
// RegExp.prototype[Symbol.search]
// RegExp.prototype[Symbol.match]
// RegExp.prototype[Symbol.replace]
// RegExp.prototype[Symbol.split]

// 14. flags
// ES6 为正则表达式新增了flags属性，会返回正则表达式的修饰符

// 15. Unicode 属性
// ES2018 引入了 Unicode 属性类，允许使用\p{...}和\P{...}（\P是\p的否定形式）代表一类 Unicode 字符，匹配满足条件的所有字符
// \p{UnicodePropertyName=UnicodePropertyValue}
// \p{Script=Greek}表示匹配一个希腊文字母，可以匹配π
// \p{Decimal_Number} 匹配所有十进制字符
// \p{Number}甚至能匹配罗马数字
// \p{Block=Arrows}匹配所有的箭头字符
// \p{Emoji}匹配所有的箭头字符
// \p{ASCII}
// 对于某些属性，可以只写属性名，或者只写属性值 \p{UnicodePropertyName} \p{UnicodePropertyValue}
// 这两种类只对 Unicode 有效，所以使用的时候一定要加上u修饰符
//
