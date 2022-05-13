# String 对象

## 概述

- String对象是 JavaScript 原生提供的三个包装对象之一，用来生成字符串对象

  ```js
  var s1 = 'abc';
  var s2 = new String('abc');

  typeOf s1; // string
  typeOf s2; // object

  s2.valueOf(); // 'abc'
  ```

- 字符串对象是一个类似数组的对象（很像数组，但不是数组）

- String对象还可以当作工具方法使用，将任意类型的值转为字符串

## 静态方法

### String.fromCharCode()

- 参数：一个或多个数值 

- return: 参数码点组成的字符串

- function:  参数是一个或多个数值，代表 Unicode 码点，返回值是这些码点组成的字符串

- 调用方式: `String.fromCharCode(charCode, charCode...)`

- tip: 该方法不支持 Unicode 码点大于0xFFFF的字符，即传入的参数不能大于0xFFFF（即十进制的 65535）

- tip2: String.fromCharCode发现参数值大于0xFFFF，就会忽略多出的位（即忽略0x20BB7里面的2）

- 这种现象的根本原因在于，码点大于0xFFFF的字符占用四个字节，而 JavaScript 默认支持两个字节的字符。这种情况下，必须把0x20BB7拆成两个字符表示。

  ```js
  String.fromCharCode(0x20BB7); //ஷ 码点0x20BB7 实际是'𠮇'
  String.fromCharCode(0x20BB7) === String.fromCharCode(0x0BB7); // true

  String.fromCharCode(0xD842, 0xDf87); // 𠮇
  ```

## 实例属性

- String.prototype.length: 字符串实例的length属性返回字符串的长度

## 实例方法

### Stirng.prototype.charAt()

- 参数: 从0开始编号的位置

- return: 指定位置的字符

- function:  返回指定位置的字符

- 调用方式: `string.charAt(index)`

- tip: 这个方法完全可以用数组下标替代: `'abc'.charAt(1) === 'abc'[1]`

- tip2: 如果参数为负数，或大于等于字符串的长度，charAt返回空字符串

### String.prototype.charCodeAt()

- 参数: 从0开始编号的位置

- return: Unicode 码点（十进制表示）

- function:  返回字符串指定位置的 Unicode 码点（十进制表示）

- 调用方式: `string.charCodeAt(index)`

- tip: 如果没有任何参数，charCodeAt返回首字符的 Unicode 码点

- tip2: 如果参数为负数，或大于等于字符串的长度，charAt返回NaN

- charCodeAt方法返回的 Unicode 码点不会大于65536（0xFFFF），也就是说，只返回两个字节的字符的码点

- 如果遇到码点大于 65536 的字符（四个字节的字符），必须连续使用两次charCodeAt，不仅读入charCodeAt(i)，还要读入charCodeAt(i+1)，将两个值放在一起，才能得到准确的字符

### String.prototype.concat()

- 参数: string, 可以接受多个参数

- return: 返回一个新字符串，不改变原字符串

- function:  用于连接两个或多个字符串

- 调用方式: `string.concat(str1, str2, ... )`

- tip: 如果参数不是字符串，concat方法会将其先转为字符串，然后再连接

- tip2: 如果参数为负数，或大于等于字符串的长度，charAt返回空字符串

  ```js
  var one = 1;
  var two = 2;
  var three = '3';

  ''.concat(one, two, three); // 123
  one + two + three; // 33
  ```

### String.prototype.slice()

- 参数: 第一个参数是子字符串的开始位置，第二个参数是子字符串的结束位置（不含该位置）

- return: 取出的子字符串, 不改变原字符串

- function:  用于从原字符串取出子字符串并返回，不改变原字符串

- 调用方式: `string.slice(startIndex, endIndex)`

- tip: 如果参数是负值，表示从结尾开始倒数计算的位置，即该负值加上字符串长度

- tip2: 如果第一个参数大于第二个参数（正数情况下），slice()方法返回一个空字符串

- tip3: 如果省略第二个参数，则表示子字符串一直到原字符串的结束

### String.prototype.substring()

- 参数: 第一个参数是子字符串的开始位置，第二个参数是子字符串的结束位置（不含该位置）

- return: 取出的子字符串, 不改变原字符串

- function:  用于从原字符串取出子字符串并返回，不改变原字符串

- 调用方式: `string.substring(startIndex, endIndex)`

- tip: 如果省略第二个参数，则表示子字符串一直到原字符串的结束

- tip2: 如果第一个参数大于第二个参数，substring方法会自动更换两个参数的位置

- tip3: 如果参数是负数，substring方法会自动将负数转为0;

### String.prototype.substr()

- 参数: 第一个参数是子字符串的开始位置，第二个参数是子字符串的长度。

- return: 取出的子字符串, 不改变原字符串

- function:  用于从原字符串取出子字符串并返回，不改变原字符串

- 调用方式: `string.substr(startIndex, childLength)`

- tip: 如果省略第二个参数，则表示子字符串一直到原字符串的结束

- tip2: 如果第一个参数是负数，表示倒数计算的字符位置

- tip3: 如果第二个参数是负数，将被自动转为0，因此会返回空字符串

### String.prototype.indexOf()

- 参数: string, 接受第二个参数，表示从该位置开始向后匹配

- return: 匹配开始的位置。如果返回-1，就表示不匹配

- function: 用于确定一个字符串在另一个字符串中第一次出现的位置

- 调用方式: `string.indexOf(string, startIndex)`

- tip: 

### String.prototype.lastIndexOf()

- 参数: string, 接受第二个参数，表示从该位置开始向前匹配

- return: 匹配开始的位置。如果返回-1，就表示不匹配

- function: 用于确定一个字符串在另一个字符串中最后一次出现的位置

- 调用方式: `string.lastIndexOf(string, startIndex)`

- tip: lastIndexOf从尾部开始匹配

- tip2: 第二个参数表示从该位置起向前匹配

### String.prototype.trim()

- 参数: 无

- return: 返回一个新字符串，不改变原字符串

- function:  用于去除字符串两端的空格

- 调用方式: `string.trim()`

- tip: 该方法去除的不仅是空格，还包括制表符（\t、\v）、换行符（\n）和回车符（\r）

### String.prototype.toLowerCase()

- 参数: 无

- return: 返回一个新字符串, 不改变原字符串

- function:  将一个字符串全部转为小写

- 调用方式: `string.toLowerCase()`

- tip: 

### String.prototype.toUpperCase()

- 参数: 无

- return: 返回一个新字符串, 不改变原字符串

- function:  将一个字符串全部转为大写

- 调用方式: `string.toUpperCase()`

- tip: 

### String.prototype.match()

- 参数: string (或者正则表达式)

- return: 数组 -> 成员为匹配的第一个字符串。如果没有找到匹配，则返回null, 返回的数组还有index属性和input属性，分别表示匹配字符串开始的位置和原始字符串

- function:  用于确定原字符串是否匹配某个子字符串

- 调用方式: `string.match(string|regexp)`

- tip: 

### String.prototype.search()

- 参数: string (或者正则表达式)

- return: 匹配的第一个位置。如果没有找到匹配，则返回-1

- function:  用于确定原字符串中是否有子字符串

- 调用方式: `string.search(string|regexp)`

- tip: 

### String.prototype.replace()

- 参数: 被替换的string (或者正则表达式), 替换的string(或者正则)

- return: 返回一个新字符串，不改变原字符串

- function:  用于替换匹配的子字符串，一般情况下只替换第一个匹配（除非使用带有g修饰符的正则表达式）

- 调用方式: `string.search(string|regexp)`

- tip: 

### String.prototype.split()

- 参数: 分割规则(string|正则)， 返回数组的成员数

- return: 数组

- function: 按照给定规则分割字符串，返回一个由分割出来的子字符串组成的数组

- 调用方式: `string.split(string|regexp, number)`

- tip: 如果分割规则为空字符串，则返回数组的成员是原字符串的每一个字符

- tip2: 如果省略参数，则返回数组的唯一成员就是原字符串

- tip3: 如果满足分割规则的两个部分紧邻着（即两个分割符中间没有其他字符），则返回数组之中会有一个空字符串。

- tip4: 如果满足分割规则的部分处于字符串的开头或结尾（即它的前面或后面没有其他字符），则返回数组的第一个或最后一个成员是一个空字符串

- string.split()还可以使用正则表达式作为参数

### String.prototype.localeCompare()

- 参数: 被比较的string， 第二个参数，指定所使用的语言（默认是英语），然后根据该语言的规则进行比较

- return: 数组

- function: 一个整数，如果小于0，表示第一个字符串小于第二个字符串；如果等于0，表示两者相等；如果大于0，表示第一个字符串大于第二个字符串

- 调用方式: `string.localeCompare(string, 'language')`

- tip: 该方法的最大特点，就是会考虑自然语言的顺序。举例来说，正常情况下，大写的英文字母小于小写字母`'B' > 'a'; // false`

- tip2: localeCompare方法会考虑自然语言的排序情况，将B排在a的前面 `'B'.localeCompare('a'); // 1`

