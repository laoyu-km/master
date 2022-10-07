# Number 对象

## 概述

- 作为构造函数时，它用于生成值为数值的对象

  ```js
    var n = new Number(2);
    console.log(typeOf n); // 'object'
  ```

- 作为工具函数时，它可以将任何类型的值转为数值

  ```js
    Number(true); // 1
  ```

## 静态属性

- Number.POSITIVE_INFINITY：正的无限，指向Infinity

- Number.NEGATIVE_INFINITY：负的无限，指向-Infinity

- Number.NaN：表示非数值，指向NaN

- Number.MIN_VALUE：表示最小的正数（即最接近0的正数，在64位浮点数体系中为5e-324），相应的，最接近0的负数为-Number.MIN_VALUE

- Number.MAX_SAFE_INTEGER：表示能够精确表示的最大整数，即9007199254740991

- Number.MIN_SAFE_INTEGER：表示能够精确表示的最小整数，即-9007199254740991

## 实例方法

### Number.prototype.toString()

- 参数： 可以接受一个参数，表示输出的进制, 如果省略这个参数，默认将数值先转为十进制，再输出字符串

- return: string

- function: 用来将一个数值转为字符串形式 

- 调用方式: num.toString(n进制)

- tip: num 一定要放在括号里，这样表明后面的点表示调用对象属性。如果不加括号，这个点会被 JavaScript 引擎解释成小数点，从而报错。

- tip2: 只要能够让 JavaScript 引擎不混淆小数点和对象的点运算符，各种写法都能用, 除了为10加上括号，还可以在10后面加两个点，JavaScript 会把第一个点理解成小数点（即10.0），把第二个点理解成调用对象属性，从而得到正确结果。

- tip3: 可以直接对一个小数使用toString方法

- tip4: 通过方括号运算符也可以调用toString方法

- tip5: toString方法只能将十进制的数，转为其他进制的字符串。如果要将其他进制的数，转回十进制，需要使用parseInt方法。

  ```js
  10..toString(2); // '1010'
  10 .toString(8); // '12'
  10['toString'](16); // 'a'

  10.5.toString(); // 10.5
  ```

### Number.prototype.toFixed()

- 参数: 参数为小数位数，有效范围为0到100，超出这个范围将抛出 RangeError 错误。 

- return: string

- function: 先将一个数转为指定位数的小数，然后返回这个小数对应的字符串

- 调用方式: num.toFixed(位数)

- tip: 由于浮点数的原因，小数5的四舍五入是不确定的，使用的时候必须小心, 特别 5 及以上

### Number.prototype.toExponential()

- 参数: 参数是小数点后有效数字的位数，范围为0到100，超出这个范围，会抛出一个 RangeError 错误。

- return: string

- function: 将一个数转为科学计数法形式

- 调用方式: num.toExponential(位数)

- tip: 

### Number.prototype.toPrecision() 

- 参数: 参数为有效数字的位数，范围是1到100，超出这个范围会抛出 RangeError 错误

- return: string

- function: 用于将一个数转为指定位数的有效数字

- 调用方式: num.toPrecision()

- tip: 该方法用于四舍五入时不太可靠，跟浮点数不是精确储存有关

### Number.prototype.toLocaleString()

- 参数: 方法接受一个地区码作为参数, 接受第二个参数配置对象，用来定制指定用途的返回字符串

- return: string

- function: 接受一个地区码作为参数，返回一个字符串，表示当前数字在该地区的当地书写形式。

- 调用方式: num.toLocaleString(地区码， 配置)

- tip: 第二个参数配置对象，用来定制指定用途的返回字符串。该对象的style属性指定输出样式，默认值是decimal，表示输出十进制形式。如果值为percent，表示输出百分数。
  
  ```js
  (123).toLocaleString('zh-Hans-CN', { style: percent}); // 12300%
  ```

- tip2: 如果style属性的值为currency，则可以搭配currency属性，输出指定格式的货币字符串形式

  ```js
    (123).toLocaleString('zh-Hans-CN', { style: 'currency', currency: 'CNY'}); // ¥123.00

    (123).toLocaleString('de-DE', { style: 'currency', currency: 'EUR'}); // €123.00

    (123).toLocaleString('en-US', { style: 'currency', currency: 'USD'}); // $123.00
  ```

- 如果Number.prototype.toLocaleString()省略了参数，则由浏览器自行决定如何处理，通常会使用操作系统的地区设定

- 该方法如果使用浏览器不认识的地区码，会抛出一个错误


## 自定义方法

- Number.prototype对象上面可以自定义方法，被Number的实例继承

- 实现链式调用

  ```js
    Number.prototype.add = function(x) {
      // return this.valueOf + x;
      return this + x;
    }

    Number.prototype.substract = function(x) {
      return this - x;
    }

    console.log(10.add(5).substract(6)); // 9
  ```

- 更复杂的方法

  ```js
    Number.prototype.iterator = function() {
      var result = [];

      for(var i = 0; i < this; i++) {
        result.push(i);
      }

      return result;
    };

    (8).iterator(); // [0,1,2,3,4,5,6,7]
  ```

- 数值的自定义方法，只能定义在它的原型对象Number.prototype上面，数值本身是无法自定义属性的(正常来说原型上只定义方法)。

