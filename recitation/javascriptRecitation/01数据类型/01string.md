# String

## 1. Overview

### 1.1 定义

- 字符串就是零个或多个排在一起的字符，放在单引号或双引号之中。

- 单引号字符串的内部，可以使用双引号。双引号字符串的内部，可以使用单引号

- 如果要在单引号字符串的内部，使用单引号，就必须在内部的单引号前面加上反斜杠，用来转义。双引号字符串内部使用双引号，也是如此

- 由于 HTML 语言的属性值使用双引号，所以很多项目约定 JavaScript 语言的字符串只使用单引号

- 字符串默认只能写在一行内，分成多行将会报错

- 如果长字符串在编写时必须分成多行，可以在每一行的尾部使用反斜杠, 输出是单行

   ```js
   var longString = 'Long \
   long \
   long \
   string';
   
   console.log(longString); // "Long long long string"
   ```

- 反斜杠的后面必须是换行符，而不能有其他字符（比如空格），否则会报错。

- 连接运算符（+）可以连接多个单行字符串，将长字符串拆成多行书写，输出的时候也是单行。

   ```js
   var longString = 'Long '
     + 'long '
     + 'long '
     + 'string';
   
   console.log(longString); // 'Long long long string'
   ```

- 如果想输出多行字符串，有一种利用多行注释的变通方法。

   ```js
   (function () { /*
     line1
     line2
     line3 
   */}).toString().split('\n').slice(1, -1).join('\n'); // 输出的就是多行文本
   ```

### 1.2 转义

- 反斜杠（\）在字符串内有特殊含义，用来表示一些特殊字符，所以又称为转义符

- 常用的转义符

  - \0 ：null (\u0000)  
  - \b ：后退键（\u0008）
  - \f ：换页符（\u000C）
  - \n ：换行符（\u000A）
  - \r ：回车键（\u000D）
  - \t ：制表符（\u0009）
  - \v ：垂直制表符（\u000B）
  - \' ：单引号（\u0027）
  - \" ：双引号（\u0022）
  - \\ ：反斜杠（\u005C）

- 反斜杠还有三种特殊用法

  - \HHH: 反斜杠后面紧跟三个八进制数（000到377），代表一个字符。HHH对应该字符的 Unicode 码点，比如\251表示版权符号。这种方法只能输出256种字符

  - \xHH: \x后面紧跟两个十六进制数（00到FF），代表一个字符。HH对应该字符的 Unicode 码点，比如\xA9表示版权符号。这种方法也只能输出256种字符

  - \uXXXX: \u后面紧跟四个十六进制数（0000到FFFF），代表一个字符。XXXX对应该字符的 Unicode 码点，比如\u00A9表示版权符号

   ```js
   '\251' // "©"
   '\xA9' // "©"
   '\u00A9' // "©"
   
   '\172' === 'z' // true
   '\x7A' === 'z' // true
   '\u007A' === 'z' // true
   ```

- 如果在非特殊字符前面使用反斜杠，则反斜杠会被省略

   ```js
   '\a' // "a"
   ```

- 如果字符串的正常内容之中，需要包含反斜杠，则反斜杠前面需要再加一个反斜杠，用来对自身转义

   ```js
   "prev \\ Next"; // 'prev \ Next'
   ```

### 1.3 字符串与数组

- 字符串可以被视为字符数组，因此可以使用数组的方括号运算符，用来返回某个位置的字符（位置编号从0开始）

- 如果方括号中的数字超过字符串的长度，或者小于0 ，或者方括号中根本不是数字，则返回undefined

- 字符串与数组的相似性仅此而已。实际上，无法改变或删除字符串之中的单个字符

   ```js
   var s = 'hello';
   
   delete s[0];
   s // "hello"
   
   s[1] = 'a';
   s // "hello"
   
   s[5] = '!';
   s // "hello"
   ```

### 1.4 length属性

- length属性返回字符串的长度，该属性也是无法改变的。

## 字符集

- JavaScript 使用 Unicode 字符集。JavaScript 引擎内部，所有字符都用 Unicode 表示

- JavaScript 不仅以 Unicode 储存字符，还允许直接在程序中使用 Unicode 码点表示字符，即将字符写成\uxxxx的形式，其中xxxx代表该字符的 Unicode 码点

  ```js
    var s = '\u00A9';
    s // '©'
  ```

- 解析代码的时候，JavaScript 会自动识别一个字符是字面形式表示，还是 Unicode 形式表示。输出给用户的时候，所有字符都会转成字面形式

  ```js
    var f\u006F\u006F = 'jayden';
    foo // 'jayden'
  ```

- 每个字符在 JavaScript 内部都是以16位（即2个字节）的 UTF-16 格式储存。也就是说，JavaScript 的单位字符长度固定为16位长度，即2个字节

- UTF-16 有两种长度：
  
  - 对于码点在U+0000到U+FFFF之间的字符，长度为16位（即2个字节）

  - 对于码点在U+10000到U+10FFFF之间的字符，长度为32位（即4个字节），而且前两个字节在0xD800到0xDBFF之间，后两个字节在0xDC00到0xDFFF之间。

  - 举例来说，码点U+1D306对应的字符为𝌆，它写成 UTF-16 就是0xD834 0xDF06

- 由于历史原因,JavaScript 对 UTF-16 的支持是不完整的, 只支持两字节的字符，不支持四字节的字符, 这是因为 JavaScript 第一版发布的时候，Unicode 的码点只编到U+FFFF，因此两字节足够表示了。后来，Unicode 纳入的字符越来越多，出现了四字节的编码。但是，JavaScript 的标准此时已经定型了，统一将字符长度限制在两字节，导致无法识别四字节的字符。

- 𝌆，浏览器会正确识别这是一个字符，但是 JavaScript 无法识别，会认为这是两个字符, length = 2

- 总结: 对于码点在U+10000到U+10FFFF之间的字符，JavaScript 总是认为它们是两个字符（length属性为2）。所以处理的时候，必须把这一点考虑在内，也就是说，JavaScript 返回的字符串长度可能是不正确的。

### Base64 转码

- 有时，文本里面包含一些不可打印的符号，比如 ASCII 码0到31的符号都无法打印出来，这时可以使用 Base64 编码，将它们转成可以打印的字符。另一个场景是，有时需要以文本格式传递二进制数据，那么也可以使用 Base64 编码

- Base64 就是一种编码方法，可以将任意值转成 0～9、A～Z、a-z、+和/这64个字符组成的可打印字符。使用它的主要目的，不是为了加密，而是为了不出现特殊字符，简化程序的处理。

- JavaScript 原生提供两个 Base64 相关的方法
  
  - btoa()：任意值转为 Base64 编码 -> ascii to base64

  - atob()：Base64 编码转为原来的值 -> base64 to ascii

  ```js
   var string = 'Hello Jayden';
   console.log(btoa(string)); // 'SGVsbG8gSmF5ZGVu'
   console.log(atob('SGVsbG8gSmF5ZGVu')); // 'Hello Jayden'
  ```

- 注意，这两个方法不适合非 ASCII 码(str.charCodeAt(i)>255)的字符，会报错

- 解决办法: 必须中间插入一个转码环节

  ```js
    function base64Encode(str) {
       return btoa(encodeURIComponent(str));
    }

    function base64Decode(str) {
       return decodeURIComponent(atob(str));
    }

    base64Encode('王'); // JUU3JThFJThC
    base64Decode('JUU3JThFJThC'); // 王
  ```

## 问题

### 1. 如何输出多行字符串

### 2. 如何判断空对象

- 三种方式： for...in, JSON.stringify(), Object.keys()

1. function 01

   ```js
   function isEmptyObj(obj) {
     for(var key in obj) {
       return false;
     }
     return true;
   }
   ```

2. function 02

   ```js
   function isEmptyObj(obj) {
     return JSON.stringify(obj) === '{}' ? true : false;
   }
   ```

3. function 03

   ```js
   function isEmptyObj(obj) {
     return Object.keys(obj).length === 0 ? true : false;
   }
   ```
