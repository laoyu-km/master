# data type

## Introduction

### js 7 种数据类型

- number

- string

- boolean

- null 

- undefined

- object: 包含狭义对象(object), array, function

- Symbol()


### typeof 运算符(operator)

- js 中有三种方法，可以确定一个值到底是什么类型:

   1. typeof: operator
   
   2. instanceof: operator
   
   3. object.prototype.toString(): method

- 可判断的类型； number, string, boolean, undefiend, object, symbol, function

- typeof null 和 typeof arr 都是返回object， 所以typeof不能判断null和arr，可使用Object.prototype.toString() 来代替

- null 的类型是object是由于历史原因造成的， 1995年的 JavaScript 语言第一版，只设计了五种数据类型（对象、整数、浮点数、字符串和布尔值），没考虑null，只把它当作object的一种特殊值。后来null独立出来，作为一种单独的数据类型，为了兼容以前的代码，typeof null返回object就没法改变了。

- arr的判断方法： 

   1. Object.prototype.toString.call(arr); 
   
   2. Array.isArray()

   3. arr instanceof Array

- 用于检查没有声明的变量： typeof variable  -> 为声明变量 === undefiend


## null, undefined

- null与undefined都可以表示“没有”，含义非常相似;

- `null == undefined // true ` ->  将一个变量赋值为undefined或null，老实说，语法效果几乎没区别

- null 是一个表示“空”的对象，转为数值时为0

- undefiend 是一个表示"此处无定义"的原始值，转为数值时为NaN


### 用法和含义

- null表示空值，即该处的值现在为空。调用函数时，某个参数未设置任何值，这时就可以传入null

- undefined表示“未定义”

- 返回undefined的典型场景
```js
// 1. 变量声明未赋值
var a;
console.log(a) // undefined

// 2. 调用函数时，应该提供的参数没有提供，该参数为undefiend
function fn(x) {
  return x;
}
fn(); // undefined

// 3. 对象没有赋值的属性
var obj = {};
console.log(obj.a); //undefined 

// 4. 函数没有手动定义返回值时， 默认返回undefined
function fn() { }
test(); // undefined
```

- 注意：对象的属性没有声明，调用时返回undefined； 变量如果没有声明，直接报错； 变量声明了没有赋值，调用时返回undefiend;


## boolean 值

- boolean 值： true 和 false

- 会返回布尔值的运算符：

   - 前置逻辑运算符： ! (Not)
   
   - 相等运算符：===，!==，==，!=
   
   - 比较运算符：>，>=，<，<=

- 转换为false的值：
   - undefined
   - null
   - false
   - 0
   - NaN
   - ""或''（空字符串）：' '字符串是空格转换为true，因为空格也是字符

- 布尔值常用语流程控制，判断等

- 空数组[], 空对象{} 的布尔值是true；


## 数值

### 1. 概述

#### 1.1 整数和浮点数

- JavaScript 内部，所有数字都是以64位浮点数形式储存，即使整数也是如此。所以，1与1.0是相同的，是同一个数。1 === 1.0

- JavaScript 语言的底层根本没有整数，所有数字都是小数（64位浮点数）

- 某些运算只有整数才能完成，此时 JavaScript 会自动把64位浮点数，转成32位整数，然后再进行运算

- 浮点数不是精确的值，所以涉及小数的比较和运算要特别小心
```js
0.3 / 0.1 // 2.9999999999999996
0.2 / 0.1 // 2
3 / 1 // 3
```

#### 1.2 数值精度

- 根据国际标准 IEEE 754, Javascript 浮点数的64个二进制位的组成方式如下
   - 第1位：符号位，0表示正数，1表示负数
   - 第2位到第12位（共11位）：指数部分
   - 第13位到第64位（共52位）：小数部分（即有效数字）
   - 符号位决定了一个数的正负，指数部分决定了数值的大小，小数部分决定了数值的精度

- 指数部分一共有11个二进制位，因此大小范围就是0到2047

- IEEE 754 规定，如果指数部分的值在0到2047之间（不含两个端点），那么有效数字的第一位默认总是1 ,并且不保存在64位浮点数之中

- 这时有效数字总是1.xxx...xxx的形式，其中xx..xx的部分保存在64位浮点数之中，最长可能为52位

- 因此，JavaScript 提供的有效数字最长为53个二进制位。

- 数字公式： 符号位 * 1.xxx...xxx(有效数字) * 2sup^指数部分 （此公式只适用于正常情况，即指数部分在 0 到 2047 之间）

- js精度最多只能到53个二进制位，即绝对值小于2的53次方的整数， -2^53 到 2^53
```js
// 大于2的53次方以后，整数运算的结果开始出现错误

Math.pow(2, 53)
// 9007199254740992

Math.pow(2, 53) + 1
// 9007199254740992

Math.pow(2, 53) + 2
// 9007199254740994

Math.pow(2, 53) + 3
// 9007199254740996

Math.pow(2, 53) + 4
// 9007199254740996
```

- 由于2的53次方是一个16位的十进制数值(9007199254740992是16位)，所以简单的法则就是，JavaScript 对15位的十进制数都可以精确处理。
```js
console.log(9007199254740998111); // 9007199254740998000 大于2的53次方以后，多出来的有效数字（最后三位的111）都会无法保存，变成0。

```


#### 1.3 数值范围

- 64位浮点数的指数部分的长度是11个二进制位，意味着指数部分的最大值是2047（2的11次方减1）

- 分出一半表示负数，则 JavaScript 能够表示的数值范围为2^1024到2^-1023（开区间）

- 超出这个范围的数无法表示。

- 一个数大于等于2的1024次方，那么就会发生“正向溢出”，即 JavaScript 无法表示这么大的数，这时就会返回Infinity。
```js
Math.pow(2, 1024); // Infinity
```

- 一个数小于等于2的-1075次方（指数部分最小值-1023，再加上小数部分的52位），那么就会发生为“负向溢出”，即 JavaScript 无法表示这么小的数，这时会直接返回0
```js
Math.pow(2, -1075);// 0
```

- 实例
```js
var x = 0.5;

for (var i = 0; i < 25; i++) {
  x = x * x;
}
console.log(x); // 0

```

- JavaScript 提供Number对象的MAX_VALUE和MIN_VALUE属性，返回可以表示的具体的最大值和最小值。


### 数值表示法

- 科学计数法： 科学计数法允许字母e或E的后面，跟着一个整数，表示这个数值的指数部分

- 两种情况，JavaScript 会自动将数值转为科学计数法表示

1. 小数点前的数字多于21位

2. 小数点后的零多于5(不包含5)个

- 其他情况都采用字面形式直接表示。


### 数值的进制

- 使用字面量（literal）直接表示一个数值时，JavaScript 对整数提供四种进制的表示方法：十进制、十六进制、八进制、二进制

- 十进制：没有前导0的数值。

- 八进制：有前缀0o或0O的数值，或者有前导0、且只用到0-7的八个阿拉伯数字的数值

- 十六进制：有前缀0x或0X的数值。

- 二进制：有前缀0b或0B的数值。

- 默认情况下，JavaScript 内部会自动将八进制、十六进制、二进制转为十进制

- 如果八进制、十六进制、二进制的数值里面，出现不属于该进制的数字，就会报错。

- ES5 的严格模式和 ES6 废除了前导0表示八进制，因为处理时很容易造成混乱, 因为有前导0的数值会被视为八进制，但是如果前导0后面有数字8和9，则该数值被视为十进制


### 特殊数值

#### 正零和负零

- JavaScript 内部实际上存在2个0：一个是+0，一个是-0，区别就是64位浮点数表示法的符号位不同。它们是等价的。
```js
-0 === +0 // true
0 === -0 // true
0 === +0 // true
```

- 几乎所有场合，正零和负零都会被当作正常的0
```js
+0 // 0
-0 // 0
(-0).toString() // '0'
(+0).toString() // '0'
```

- 唯一有区别的场合是，+0或-0当作分母，返回的值是不相等的
```js
(1 / +0) === (1 / -0); // false
1 / +0; // Infinity
1 / -0; // -Infinity
```

#### NaN

- NaN是 JavaScript 的特殊值，表示“非数字”（Not a Number）

- 主要出现在将字符串解析成数字出错的场合, 和一些其他场合
```js
5 - 'x'; // NaN
Math.acos(2); // NaN
Math.log(-1); // NaN
Math.sqrt(-1); // NaN
0 / 0;  // NaN
```

- NaN 的数据类型依然属于Number, typeof NaN === 'number'

- NaN 不等于任何值， 包括他本身
```js
NaN === NaN //false
[NaN, 1, 2].indexOf(NaN); // -1 indexOf内部使用的是严格相等运算符
Boolean(NaN); // false
```

- NaN 与任何数（包括它自己）的运算，得到的都是NaN

#### Infinity 

- Infinity表示“无穷”，用来表示两种场景。一种是一个正的数值太大，或一个负的数值太小，无法表示

- 另一种是非0数值除以0，得到Infinity -> 1 / 0 = Infinity

- Infinity有正负之分，Infinity表示正的无穷，-Infinity表示负的无穷

- 非零正数除以-0，会得到-Infinity，负数除以-0，会得到Infinity

- Infinity大于一切数值（除了NaN），-Infinity小于一切数值（除了NaN）

- Infinity与NaN比较，总是返回false
```js
Infinity > NaN // false
-Infinity > NaN // false

Infinity < NaN // false
-Infinity < NaN // false

Infinity == NaN // false
-Infinity === NaN // false
```

- Infinity的四则运算，符合无穷的数学计算规则。
```js
5 * Infinity // Infinity
5 - Infinity // -Infinity
Infinity / 5 // Infinity
5 / Infinity // 0
```

- 0乘以Infinity，返回NaN；0除以Infinity，返回0；Infinity除以0，返回Infinity

- Infinity加上或乘以Infinity，返回的还是Infinity

- Infinity与null计算时，null会转成0，等同于与0的计算

- Infinity与undefined计算，返回的都是NaN

- Infinity / Infinity = NaN



### 与数值相关的全局方法

#### parseInt()

- 用于将字符串转为整数

- 如果字符串头部有空格，空格会被自动去除

- 参数不是字符串，则会先转为字符串再转换 

- 字符串转为整数的时候，是一个个字符依次转换，如果遇到不能转为数字的字符，就不再进行下去，返回已经转好的部分

- 如果字符串的第一个字符不能转化为数字（后面跟着数字的正负号除外），返回NaN

- parseInt的返回值只有两种可能，要么是一个十进制整数，要么是NaN

- 如果字符串以0x或0X开头，parseInt会将其按照十六进制数解析

- 如果字符串以0开头，将其按照10进制解析

- 对于那些会自动转为科学计数法的数字，parseInt会将科学计数法的表示方法视为字符串，因此导致一些奇怪的结果

- parseInt方法还可以接受第二个参数（2到36之间），表示被解析的值的进制，返回该值对应的十进制数。

- 默认情况下，parseInt的第二个参数为10，即默认是十进制转十进制
```js
parseInt('1000') // 1000
// 等同于
parseInt('1000', 10) // 1000
```

- 二进制、六进制、八进制的1000，分别等于十进制的8、216和512。这意味着，可以用parseInt方法进行进制的转换。
```js
parseInt('1000', 2) // 8
parseInt('1000', 6) // 216
parseInt('1000', 8) // 512
```

- 如果第二个参数不是数值，会被自动转为一个整数。这个整数只有在2到36之间，才能得到有意义的结果，超出这个范围，则返回NaN。如果第二个参数是0、undefined和null，则直接忽略。
```js
parseInt('10', 37) // NaN
parseInt('10', 1) // NaN
parseInt('10', 0) // 10
parseInt('10', null) // 10
parseInt('10', undefined) // 10
parseInt('10', NaN) // 10
parseInt('10', '1a') // 10
parseInt('10', '1') // NaN
parseInt('10', '16') // 16
```

- 如果第一个参数包含对于指定进制无意义的字符，则从最高位开始，只返回可以转换的数值。如果最高位无法转换，则直接返回NaN
```js
parseInt('1546', 2) // 1
parseInt('546', 2) // NaN
```

- 如果parseInt的第一个参数不是字符串，会被先转为字符串。这会导致一些令人意外的结果。
```js
parseInt(0x11, 36) // 43
parseInt(0x11, 2) // 1

// 等同于
parseInt(String(0x11), 36)
parseInt(String(0x11), 2)

// 等同于
parseInt('17', 36)
parseInt('17', 2)
```

- 处理方式，对于八进制的前缀0，尤其需要注意
```js
parseInt(011, 2) // NaN

// 等同于
parseInt(String(011), 2) // -> 011 会被当做8进制处理

// 等同于
parseInt(String(9), 2)

parseInt('011', 2); // 3 -> '011' 会被当做2进制处理
```


#### parseFloat()

- parseFloat方法用于将一个字符串转为浮点数

- 如果字符串符合科学计数法，则会进行相应的转换
```js
parseFloat('314e-2') // 3.14
parseFloat('0.0314E+2') // 3.14
```

- 如果字符串包含不能转为浮点数的字符，则不再进行往后转换，返回已经转好的部分
```js
parseFloat('3.14more non-digit characters') // 3.14
```

- parseFloat方法会自动过滤字符串前导的空格。
```js
parseFloat('\t\v\r12.34\n ') // 12.34
```

- 参数先转化为字符串,字符串的第一个字符不能转化为浮点数，则返回NaN
```js
parseFloat([]) // NaN
parseFloat('FF2') // NaN
parseFloat('') // NaN
```

- parseFloat 和 parseInt 会将空字符串转为NaN

- 这些特点使得parseFloat的转换结果不同于Number函数。
```js
parseFloat(true)  // NaN
Number(true) // 1

parseFloat(null) // NaN
Number(null) // 0

parseFloat('') // NaN
Number('') // 0

parseFloat('123.45#') // 123.45
Number('123.45#') // NaN
```

#### isNaN()

- isNaN方法可以用来判断一个值是否为NaN
```js
isNaN(NaN) // true
isNaN(123) // false
```

- isNaN为true的值，有可能不是NaN，而是一个字符串, 因为isNaN只对数值有效，如果传入其他值，会被先转成数值。比如，传入字符串的时候，字符串会被先转成NaN，所以最后返回true

- 出于同样的原因，对于对象和数组，isNaN也返回true。
```js
isNaN({}) // true
// 等同于
isNaN(Number({})) // true

isNaN(['xzy']) // true
// 等同于
isNaN(Number(['xzy'])) // true
```

- 但是，对于空数组和只有一个数值成员的数组，isNaN返回false, 因为这些数组能被Number函数转成数值
```js
isNaN([]) // false
isNaN([123]) // false
isNaN(['123']) // false
```

- 由于以上原因，使用isNaN之前，最好判断一下数据类型
```js
// 改善版的isNaN
function myIsNaN(value) {
  return typeof value === 'number' && isNaN(value);
}
```

- 判断NaN更可靠的方法是，利用NaN为唯一不等于自身的值的这个特点，进行判断
```js
function myIsNaN(value) {
  return value !== value;
}
```

#### isFinite()

- isFinite方法返回一个布尔值，表示某个值是否为正常的数值
```js
isFinite(Infinity) // false
isFinite(-Infinity) // false
isFinite(NaN) // false
isFinite(undefined) // false
isFinite(null) // true
isFinite(-1) // true
```

- 除了Infinity、-Infinity、NaN和undefined这几个值会返回false，isFinite对于其他的数值都会返回true
