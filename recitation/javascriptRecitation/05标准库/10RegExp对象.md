# RegExp 对象

## 概述 

- 使用字面量新建正则表达式: `var regex = /jayden/;`

- 使用RegExp构造函数新建正则表达式: `var regex = new RegExp('xyz')`

- 第一种方法在引擎编译代码时，就会新建正则表达式, 第二种方法在运行时新建正则表达式，所以前者的效率较高。而且，前者比较便利和直观

- 所以实际应用中，基本上都采用字面量定义正则表达式

- RegExp构造函数还可以接受第二个参数，表示修饰符

## 实例属性

- `RegExp.prototype.ignoreCase:` 返回一个布尔值，表示是否设置了i修饰符
- `RegExp.prototype.global:` 返回一个布尔值，表示是否设置了g修饰符
- `RegExp.prototype.multiline:` 返回一个布尔值，表示是否设置了m修饰符
- `RegExp.prototype.flags:` 返回一个字符串，包含了已经设置的所有修饰符，按字母排序

- 上面四个属性都是只读的

- `RegExp.prototype.lastIndex:` 返回一个整数，表示下一次开始搜索的位置。该属性可读写，但是只在进行连续搜索时有意义

- `RegExp.prototype.source:` 返回正则表达式的字符串形式（不包括反斜杠），该属性只读。

## 实例方法

### Reg.prototype.test();

- 返回一个布尔值，表示当前模式是否能匹配参数字符串

- 如果正则表达式带有g修饰符，则每一次test方法都从上一次结束的位置开始向后匹配

  ```js
  var reg = /jayden/g;
  var s = '_jayden_jayden';

  reg.lastIndex; // 0
  reg.test(s); // true

  reg.lastIndex; // 7
  reg.test(s); // true

  reg.lastIndex; // 14
  reg.test(s); // false
  ```

- 带有g修饰符时，可以通过正则对象的lastIndex属性指定开始搜索的位置

- 带有g修饰符时，正则表达式内部会记住上一次的lastIndex属性，这时不应该更换所要匹配的字符串，否则会有一些难以察觉的错误

  ```js
  var reg = /bb/g
  r.test('bb'); //true
  r.test('_bb_'); //false
  ```

- lastIndex属性只对同一个正则表达式有效，所以下面这样写是错误的

  ```js
  var count = 0
  while (/a/g.test('babaaa')) count++;
  ```

- 如果正则模式是一个空字符串，则匹配所有字符串

### RegExp.prototype.exec()

- 用来返回匹配结果。如果发现匹配，就返回一个数组，成员是匹配成功的子字符串，否则返回null

- 如果正则表示式包含圆括号（即含有“组匹配”），则返回的数组会包括多个成员

- 第一个成员是整个匹配成功的结果，后面的成员就是圆括号对应的匹配成功的组。也就是说，第二个成员对应第一个括号，第三个成员对应第二个括号，以此类推

- 整个数组的length属性等于组匹配的数量再加1;

  ```js
  var reg = /_(x)/;
  var s = '_x_x';

  reg.exec(s); // ['_x', 'x'];
  ```

- exec()方法的返回数组还包含以下两个属性

  - input：整个原字符串。
  - index：模式匹配成功的字符串开始位置（从0开始计数）

- 如果正则表达式加上g修饰符，则可以使用多次exec()方法，下一次搜索的位置从上一次匹配成功结束的位置开始。

  ```js
  var reg = /a/g;
  var s = '_abc_abc_abc';

  var arr1 = reg.exec(s);
  arr1 // ['a']
  arr1.index // 1
  reg.lastIndex // 2

  var arr2 = reg.exec(s);
  arr2 // ['a']
  arr2.index // 5
  reg.lastIndex // 6

  var arr3 = reg.exec(s);
  arr3 // ['a']
  arr3.index // 9
  reg.lastIndex //10

  var arr4 = reg.exec(s);
  arr3 // null
  reg.lastIndex // 0
  ```

- 利用g修饰符允许多次匹配的特点，可以用一个循环完成全部匹配

  ```js
  var reg = /a/g;
  var s = '_abc_abc_abc';

  while (true) {
    var match = reg.exec(s);
    if (!match) break;
    console.log('#' + match.index + ' : ' + match[0]);
  }
  ```

- 正则实例对象的lastIndex属性不仅可读，还可写。设置了g修饰符的时候，只要手动设置了lastIndex的值，就会从指定位置开始匹配

## 字符串的实例方法

### String.prototype.match

- 对字符串进行正则匹配，返回匹配结果

- 匹配成功返回一个数组，匹配失败返回null

- 如果正则表达式带有g修饰符，则该方法与正则对象的exec方法行为不同，会一次性返回所有匹配成功的结果

  ```js
  var reg = /a/g;
  var s = 'abba';

  s.match(reg) // ['a', 'a']
  reg.exec(s) // ['a']
  ```

- 设置正则表达式的lastIndex属性，对match方法无效，因为总是从字符串的第一个字符开始匹配

  ```js
  var reg = /a|b/g
  reg.lastIndex = 6;
  'xaxb'.match(reg); // ['a', 'b']
  reg.lastIndex // 0
  ```

- 使用组匹配时，不宜同时使用g修饰符，否则match方法不会捕获分组的内容

  ```js
  var str = '2abcabc';

  str.match(/(.)b(.)/); // ['abc', 'a', 'c', index: 1, input: '2abcabc']
  str.match(/(.)b(.)/g); // ['abc', 'abc']
  ```

### String.prototype.search()

- 返回第一个满足条件的匹配结果在整个字符串中的位置。如果没有任何匹配，则返回-1

- 正则带不带g修饰符， RegExp.prototype.lastIndex 是否修改， 都不影响search()

### String.prototype.replace()

- 可以替换匹配的值。它接受两个参数，第一个是正则表达式，表示搜索模式，第二个是替换的内容

- 则表达式如果不加g修饰符，就替换第一个匹配成功的值，否则替换所有匹配成功的值

  ```js
  'aaa'.replace('a', 'b'); // 'baa'
  'aaa'.replace(/a/, 'b'); // 'baa'
  'aaa'.replace(/a/g, 'b'); // 'bbb'
  ```

- 消除字符串首尾两端的空格

  ```js
  var str = '   #id div.class  ';
  
  str.replace(/^\s*|\s*$/g, ''); // '#id div.class'
  ```

- replace方法的第二个参数可以使用美元符号$，用来指代所替换的内容

  - $&：匹配的子字符串。
  - $`：匹配结果前面的文本。
  - $'：匹配结果后面的文本。
  - $n：匹配成功的第n组内容，n是从1开始的自然数。
  - $$：指代美元符号$

  ```js
  'hello jayden'.replace(/(\w+)\s(\w+)/, '$2 $1'); // jayden hello

  'abc'.replace(/b/, '[$`-$&-$\']'); //'a[a-b-c]c'
  ```

- replace方法的第二个参数还可以是一个函数，将每一个匹配内容替换为函数返回值

  ```js
  '3 and 5'.replace(/[0-9]+/g, function(match) {
    return 2 * match;
  }); 
  // '6 and 10'

  var s = 'jayden and alexis has big bottom';
  s.replace(/jayden|alexis/ig, function(match) {
    return match.UpperCase();
  });
  // JAYDEN and ALEXIS has big bottom
  ```

- replace方法第二个参数的替换函数，可以接受多个参数。其中，第一个参数是捕捉到的内容，第二个参数是捕捉到的组匹配（有多少个组匹配，就有多少个对应的参数）

- 替换函数最后还可以添加两个参数，倒数第二个参数是捕捉到的内容在整个字符串中的位置（比如从第五个位置开始），最后一个参数是原字符串

  ```js
  // 网页模板替换
  var price = {
    p1: '$12.10',
    p1: '$12.20',
    p1: '$12.30',
  }

  var str = '<div id="p1"></div><div id="p1"></div><div id="p1"></div>';

  var reg = /(<div id=")(.*?)(">)(<\/div>)/g

  console.log(str.replace(reg, function(match, $1, $2, $3, $4) {
    return $1 + $2 + $3 + price[$2] + $4;
  }));
  ```

### String.prototype.split()

- 按照正则规则分割字符串，返回一个由分割后的各个部分组成的数组

- `string.split(separator, [limit])`

- 接受两个参数，第一个参数是正则表达式，表示分隔规则，第二个参数是返回数组的最大成员数

- 正则默认是贪婪匹配的现象, 正则加不加g修饰符结果一样

  ```js
  'aaa*aa*a'.split(/a*/); //['', '*', '*', '']

  'aaa**a*'.split(/a*/); // ['', '*', '*', '*']
  ```

- 如果正则表达式带有括号，则括号匹配的部分也会作为数组成员返回

  ```js
  'aaa*aa*a*'.split(/(a*)/); // ['', 'aaa', '*', 'aa', '*', 'a', '*']
  ```

## 匹配规则

### 字面量字符

- 字面量字符某个字符只表示它字面的含义（就像前面的a和b），那么它们就叫做“字面量字符”（literal characters）

### 元字符

- 字符有特殊含义，不代表字面的意思。它们叫做“元字符”（metacharacters）

#### 点字符 ( . )

- 点字符（.）匹配除回车（\r）、换行(\n) 、行分隔符（\u2028）和段分隔符（\u2029）以外的所有字符

- 对于码点大于0xFFFF字符，点字符不能正确匹配，会认为这是两个字符

#### 位置字符

- 位置字符用来提示字符所处的位置，主要有两个字符

- ^: 表示字符串的开始位置

- $: 表示字符串的结束位置

#### 选择符（|）

- 竖线符号（|）在正则表达式中表示“或关系”（OR），即cat|dog表示匹配cat或dog

- 多个选择符可以联合使用 `/jayden|alexis|wicky/`

- 选择符会包括它前后的多个字符，比如/ab|cd/指的是匹配ab或者cd，而不是指匹配b或者c

- 如果想修改这个行为，可以使用圆括号

  ```js
  /a |\tb/.exec('a b')[0]; // 'a '
  /a( |\t)b/.exec('a\tb')[0]; // 'a\tb'
  ```

- 其他的元字符还包括\、*、+、?、()、[]、{}等

### 转义符

- 有特殊含义的元字符，如果要匹配它们本身，就需要在它们前面要加上反斜杠

- 需要反斜杠转义的，一共有12个字符：^、.、[、$、(、)、|、*、+、?、{ 和 \

- 需要特别注意的是，如果使用RegExp方法生成正则对象，转义需要使用两个斜杠，因为字符串内部会先转义一次

### 特殊字符

- 正则表达式对一些不能打印的特殊字符，提供了表达方法

- \cX: 表示Ctrl-[X]，其中的X是A-Z之中任一个英文字母，用来匹配控制字符。

- [\b]: 匹配退格键(U+0008)，不要与\b混淆。

- \n: 匹配换行键。

- \r: 匹配回车键。

- \t: 匹配制表符 tab（U+0009）。

- \v: 匹配垂直制表符（U+000B）。

- \f: 匹配换页符（U+000C）。

- \0: 匹配null字符（U+0000）。

- \xhh: 匹配一个以两位十六进制数（\x00-\xFF）表示的字符。

- \uhhhh: 匹配一个以四位十六进制数（\u0000-\uFFFF）表示的 Unicode 字符

### 字符类

- 表示有一系列字符可供选择，只要匹配其中一个就可以了。所有可供选择的字符都放在方括号内，比如[xyz] 表示x、y、z之中任选一个匹配

#### 脱字符 (^)

- 脱字符 (^): 如果方括号内的第一个字符是[^]，则表示除了字符类之中的字符，其他字符都可以匹配

- 如果方括号内没有其他字符，即只有[^]，就表示匹配一切字符，其中包括换行符。相比之下，点号作为元字符（.）是不包括换行符的

- 脱字符只有在字符类的第一个位置才有特殊含义，否则就是字面含义

#### 连字符 (-)

- 对于连续序列的字符，连字符（-）用来提供简写形式，表示字符的连续范围。比如

- [abc]可以写成[a-c]，[0123456789]可以写成[0-9]，同理[A-Z]表示26个大写字母

- 以下都是合法的字符类简写形式

  - [0-9.,]

  - [0-9a-fA-F]

  - [a-zA-Z0-9-]

  - [1-31]: 不代表1到31，只代表1到3

- 连字符还可以用来指定 Unicode 字符的范围

- `/[\u0128-\uFFFF]/`: 表示匹配码点在0128到FFFF之间的所有字符

- 不要过分使用连字符，设定一个很大的范围，否则很可能选中意料之外的字符

- 最典型的例子就是[A-z]，表面上它是选中从大写的A到小写的z之间52个字母，但是由于在 ASCII 编码之中，大写字母与小写字母之间还有其他字符，结果就会出现意料之外的结果

  ```js
  /[A-z]/.test('\\'); // true
  ```

### 预定义模式

- \d: 匹配0-9之间的任一数字，相当于[0-9]。

- \D: 匹配所有0-9以外的字符，相当于[^0-9]。

- \w: 匹配任意的字母、数字和下划线，相当于[A-Za-z0-9_]

- \W: 除所有字母、数字和下划线以外的字符，相当于[^A-Za-z0-9_]。

- \s: 匹配空格（包括换行符、制表符、空格符等），相等于[ \t\r\n\v\f]。

- \S: 匹配非空格的字符，相当于[^ \t\r\n\v\f]。

- \b: 匹配词的边界。

- \B: 匹配非词边界，即在词的内部

  ```js
  // \s 例
  /\s\w*/.exec('hello world')[0]; // ' world'

  // \b 例
  /\bworld/.test('hello world'); // true
  /\bworld/.test('hello-world'); // true
  /\bworld/.test('helloworld'); // false

  // \B 例
  /\Bworld/.test('hello world'); // false
  /\Bworld/.test('helloworld'); // true
  ```

### 重复类

- 模式的精确匹配次数，使用大括号（{}）表示

- {n}表示恰好重复n次

- {n,}表示至少重复n次

- {n,m}表示重复不少于n次，不多于m次

### 量词符

- 量词符用来设定某个模式出现的次数

- ?: 问号表示某个模式出现0次或1次，等同于{0, 1}。

- *: 星号表示某个模式出现0次或多次，等同于{0,}。

- +: 加号表示某个模式出现1次或多次，等同于{1,}。

### 贪婪模式

- ?, *, . 默认情况下都是最大可能匹配，即匹配到下一个字符不满足匹配规则为止。这被称为贪婪模式

- 非贪婪模式，即最小可能匹配。只要一发现匹配，就返回结果，不要往下检查。如果想将贪婪模式改为非贪婪模式，可以在量词符后面加一个问号

- +?：表示某个模式出现1次或多次，匹配时采用非贪婪模式。

- *?：表示某个模式出现0次或多次，匹配时采用非贪婪模式。

- ??：表格某个模式出现0次或1次，匹配时采用非贪婪模式。

- 贪婪模式或非贪婪模式都是根据正则的上下文来匹配的，比如

  ```js
  'class="p1 p2"'.replace(/class="(.*?)"/, function(match, $1){
    return $1;
  });
  // 'p1 p2' -> 正则中$1后面跟 " -> $1 === 'p1 p2'

  'class="p1 p2"'.replace(/class="(.*?)1/, function(match, $1) {
    return $1;
  });
  // 'p p2"' -> 正则中$1后面跟 1 -> $1 === 'p' -> 'p' 替换了 'class="p1'

  var s = 'jadyen jayden jayden';

  s.replace(/.*?/, 'alexis'); 
  // alexisjayden jayden jayden

  s.replace(/.*?\s/, 'alexis');
  // alexisjayden jayden

  s.replace(/.*\s/, 'alexis');
  // alexisjayden
  ```

### 修饰符

- 修饰符（modifier）表示模式的附加规则，放在正则模式的最尾部

- 修饰符（modifier）表示模式的附加规则，放在正则模式的最尾部: `/\w*?/gim`

#### g 修饰符

- 修饰符表示全局匹配（global），加上它以后，正则对象将匹配全部符合条件的结果，主要用于搜索和替换

#### i 修饰符

- 默认情况下，正则对象区分字母的大小写，加上i修饰符以后表示忽略大小写

#### m 修饰符

- m修饰符表示多行模式（multiline），会修改^和$的行为

- 默认情况下（即不加m修饰符时），^和$匹配字符串的开始处和结尾处

- 加上m修饰符以后，^和\$还会匹配行首和行尾，即^和\$会识别换行符（\n）

  ```js
  /jayden$/.test('hello jadyen\n'); // false
  /jayden$/m.test('hello jadyen\n'); // true

  /^b/.test('a\nb'); // false
  /^b/.test('a\nb'); // true
  ```

### 组匹配

#### 概述

- 正则表达式的括号表示分组匹配，括号中的模式可以用来匹配分组的内容

  ```js
  'abcabc'.match(/(.)b(.)/);
  // ['abc', 'a', 'c']
  ```

- 使用组匹配时，不宜同时使用g修饰符，否则match方法不会捕获分组的内容

  ```js
  'abcabc'.match(/(.)b(.)/g);
  // ['abc', 'abc']
  ```

- 正则表达式内部，还可以用\n引用括号匹配的内容，n是从1开始的自然数，表示对应顺序的括号

  ```js
  /y(..)(.)\2\1/.test('yabccab'); //true
  ```

- 括号还可以嵌套

  ```js
  /y((..)\2)\1/.test('yabababab'); //true
  ```

- 组匹配非常有用，下面是一个匹配网页标签的例子

  ```js
  /<([^>]+)>[^<>]*<\/\1>/.exec('<b>jayden</b>')[1]; // b
  ```

- 上面代码略加修改，就能捕获带有属性的标签

  ```js
  var reg = /<(\w+)([^<>]*)>(.*?)<\/\1>/g;
  var html = '<b class="jayden">jayden</b><i>alexis</i>';

  var exe1 = reg.exec(html); 
  // exe1[1] -> 'b'
  // exe1[2] -> 'class="jayden"'
  // exe1[3] -> 'jadyen'

  var exe2 = reg.exe(html);
  // exe2[1] -> 'i'
  // exe2[2] -> ''
  // exe2[3] -> 'alexis'
  ```

#### 非捕获组 (?:x)

- (?:x)称为非捕获组（Non-capturing group），表示不返回该组匹配的内容，即匹配的结果中不计入这个括号

  ```js
  'abc'.match(/(?:.)b(.)/); //['abc', 'c']

  var reg1 = /(http|ftp):\/\/([^\/\s]+)(\/\S*)/;
  reg1.exec('http://www.google.com/');
  // ['http://www.google.com/', 'http', 'www.google.com', '/']

  var reg2 = /(?:http|ftp):\/\/([^\/\s]+)(\/\S*)/;
  // ['http://www.google.com/', 'www.google.coml', '/']
  ```

#### 先行断言

- x(?=y)称为先行断言（Positive look-ahead），x只有在y前面才匹配，y不会被计入返回结果

- 比如，要匹配后面跟着百分号的数字，可以写成/\d+(?=%)/

- “先行断言”中，括号里的部分是不会返回的

  ```js
  'abjaydcdbjayden'.match(/b(?=jayden)/);
  // ['b', index: 8, input: 'abjaydcdbjayden', groups: undefined]
  ```

#### 先行否定断言

- x(?!y)称为先行否定断言（Negative look-ahead），x只有不在y前面才匹配，y不会被计入返回结果。

- 比如，要匹配后面跟的不是百分号的数字，就要写成/\d+(?!%)/

- “先行否定断言”中，括号里的部分是不会返回的

  ```js
  'abjaydedbjayden'.match(/b(?!jayden)/);
  // ['b', index: 1, input: 'abjaydedbjayden', groups: undefined]
  ```