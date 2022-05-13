# Math

## 静态属性

- Math.E：常数e。

- Math.LN2：2 的自然对数。

- Math.LN10：10 的自然对数。

- Math.LOG2E：以 2 为底的e的对数。

- Math.LOG10E：以 10 为底的e的对数。

- Math.PI：常数π。

- Math.SQRT1_2：0.5 的平方根。

- Math.SQRT2：2 的平方根。

- 以上属性都是只读的，不能修改

## 静态方法

### Math.abs()：绝对值

- 返回参数值的绝对值

### Math.max()：最大值

- 返回多个参数之中最大的那个值

- 如果参数为空, 返回-Infinity
  
### Math.min()：最小值

- 返回多个参数中最小的那个值

- 如果参数为空, 返回Infinity

### Math.floor()：向下取整

- 对参数取整，返回小于或等于参数值的最大整数（地板值）

### Math.ceil()：向上取整

- 对参数取整，返回大于或等于参数值的最小整数（天花板值）

  ```js
  // 以上两个方法可以结合起来，实现一个总是返回数值的整数部分的函数
  function getInteger(x) {
    var num = Number(x);
    return num < 0 ? Math.ceil(num) : Math.floor(num);
  }
  ```

### Math.round()：四舍五入

- 用于四舍五入

- 注意，它对负数的处理（主要是对0.5的处理）, `Math.round(-1.5); // -1`

### Math.pow()：幂运算

- 返回以第一个参数为底数、第二个参数为指数的幂运算值

  ```js
  // 圆面积计算
  var radius = 10;
  var area = Mathi.Pi * Math.pow(radius, 2);
  ```

### Math.sqrt()：平方根

- 返回参数值的平方根

- 如果参数是一个负值，则返回NaN
 
### Math.log()：自然对数

- 返回以e为底的自然对数值

- 如果要计算以10为底的对数，可以先用Math.log求出自然对数，然后除以Math.LN10；求以2为底的对数，可以除以Math.LN2。

  ```js
  Math.log(100) / Math.LN10 //2
  Math.log(8) / Math.LN2 // 3
  ```

### Math.exp()：e的指数

- 返回常数e的参数次方

  ```js
  Math.exp(1); // 2.718281828459045
  Math.exp(3); // 20.085536923187668
  ```

### Math.random()：随机数

- 返回0到1之间的一个伪随机数，可能等于0，但是一定小于1

- 任意范围的随机数生成函数如下

  ```js
  function getRandom(min, max) {
    return Math.random * (max - min) + min;
  }
  ```

- 任意范围的随机整数生成函数如下

  ```js
  function getRandomInt(min, max) {
    return math.floor(Math.random() * (max - min + 1) + min);
  }
  ```

- 返回随机字符的例子如下

  ```js
  function randomStr (length) {
    var temStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    temStr += 'abcdefghijklmnopqrstuvwxyz';
    temStr += '0123456789-_';

    var str = '';

    for(var i = 0; i < length; i++) {
      var rand = math.floor(Math.random() * temStr.length);
      str += = temStr.subString(rand, rand + 1);
    }

    return str;
  }
  ```

### 三角函数方法

- Math.sin()：返回参数的正弦（参数为弧度值）

- Math.cos()：返回参数的余弦（参数为弧度值）

- Math.tan()：返回参数的正切（参数为弧度值）

- Math.asin()：返回参数的反正弦（返回值为弧度值）

- Math.acos()：返回参数的反余弦（返回值为弧度值）

- Math.atan()：返回参数的反正切（返回值为弧度值）