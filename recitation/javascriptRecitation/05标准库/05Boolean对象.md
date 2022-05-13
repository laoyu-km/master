# Boolean 对象

## 概述

- 作为构造函数，它主要用于生成布尔值的包装对象实例

- false 对应的包装对象实例，布尔运算结果也是true

- false 实例的valueOf方法，则返回实例对应的原始值，本例为false

  ```js
    if (new Boolean(false)) console.log(true); // true

    if (new Boolean(false).valueOf()) console.log(true); // 无输出
  ```

## Boolean 函数的类型转换作用

- Boolean对象除了可以作为构造函数，还可以单独使用，将任意值转为布尔值。这时Boolean就是一个单纯的工具方法。

  ```js
  Boolean(undefined); // false
  Boolean(null); // false
  Boolean(''); // false
  Boolean(0); // false
  Boolean(NaN); // false

  Boolean(1);  //true
  Boolean('false');  //true
  Boolean([]);  //true
  Boolean({});  //true
  Boolean(function() {});  //true
  Boolean(/.*?/);  //true
  ```

- 使用双重的否运算符（!）也可以将任意值转为对应的布尔值

  ```js
  !!undefined //false
  !!null //false
  !!'' //false
  !!0 //false
  !!NaN //false

  !!1  // true
  !!'false'  // true
  !![]  // true
  !!{}  // true
  !!function() {}  // true
  !!/.*?/  // true
  ```

- 对于一些特殊值，Boolean对象前面加不加new，会得到完全相反的结果，必须小心

  ```js
    // 1
    if(Boolean(false)) console.log(true); //无输出
    if(new Boolean(false)) console.log(true); // true

    // 2
    if(Boolean(null)) console.log(true); // 无输出
    if(new Boolean(null)) console.log(true); //true

    // ...等等
  ```