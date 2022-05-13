# 原生Object

## 3.1 概述

- Object 对象静态方法(本身的方法): 就是直接定义在Object对象的方法 ->  原生方法 `Object.getOwnPropertysName()`, 自定义方法 `Object.selfDefine()`

- Object 的实例方法: 就是定义在Object原型对象Object.prototype上的方法。它可以被Object实例直接使用。

## 3.2 Object()

- Object本身是一个函数，可以当作工具方法使用，将任意值转为对象。这个方法常用于保证某个值一定是对象。

- 如果参数为空（或者为undefined和null），Object()返回一个空对象。

- 如果参数是原始类型的值，Object方法将其转为对应的包装对象(Number, Boolean, String)的实例

- 如果Object方法的参数是一个对象，它总是返回该对象，即不用转换。

- 利用这一点，可以写一个判断变量是否为对象的函数

  ```js
    function isObject(parement) {
        if (parement === Object(parement)) {
            console.log(true);
        }
        console.log(false);
    }

    var fn = function () { console.log ('yes'); }
    var arr = [1, 2, 3];

    isObject(fn); // true
    isObject(arr); // true
  ```

- instanceof运算符用来验证，一个对象是否为指定的构造函数的实例: ` obj instanceof Object `, 是返回true， 不是返回false

## 3.3 Object 构造函数

- Object不仅可以当作工具函数使用，还可以当作构造函数使用，即前面可以使用new命令

- Object构造函数的首要用途，是直接通过它来生成新对象。

- `var obj = new Object()` 等价于 `var obj = {}`

- Object构造函数的用法与工具方法很相似，几乎一模一样。

- 虽然用法相似，但是Object(value)与new Object(value)两者的语义是不同的，Object(value)表示将value转成一个对象，new Object(value)则表示新生成一个对象，它的值是value。

## 3.4 Object 的静态方法 

### Object.keys()

- 参数： 一个对象

- return: 一个数组。该数组的成员都是该对象自身的（而不是继承的）所有属性名。

- function: 得到对象自身的所有可枚举属性名

- 调用方式: `Object.keys(obj)`;

- tip: 返回的数组中只包含obj自身的可枚举属性

### Object.getOwnPropertyNames()

- 参数： 一个对象

- return: 一个数组。该数组的成员都是该对象自身的（而不是继承的）所有属性名(含不可枚举属性)。

- function: 得到对象自身的所有属性名

- 调用方式: `Object.getOwnPropertyNames(obj)`;

- tip: 返回的数组中只包含obj自身的所有属性包含不可枚举属性

### 计算对象属性个数的方法

- 由于 JavaScript 没有提供计算对象属性个数的方法，所以可以用这两个方法代替

- `Object.keys(obj).length`

- `Object.getOwnPropertyNames(obj).length`

### 其他静态方法

（1）对象属性模型的相关方法

- Object.getOwnPropertyDescriptor()：获取某个属性的描述对象。

- Object.getOwnPropertyDescriptors(): 获取对象的所有属性的描述对象

- Object.defineProperty()：通过描述对象，定义某个属性。

- Object.defineProperties()：通过描述对象，定义多个属性。

（2）控制对象状态的方法

- Object.preventExtensions()：防止对象扩展。

- Object.isExtensible()：判断对象是否可扩展。

- Object.seal()：禁止对象配置。

- Object.isSealed()：判断一个对象是否可配置。

- Object.freeze()：冻结一个对象。

- Object.isFrozen()：判断一个对象是否被冻结。

（3）原型链相关方法

- Object.create(proto, {属性: {属性描述对象}, 属性: {属性描述对象}, ...})：该方法可以指定原型对象和属性，返回一个新的对象。

- Object.getPrototypeOf(obj)：获取对象的Prototype对象。

- Objject.setPrototypeOf(obj, proto): 设置obj的原型对象

## 3.5 Object 的实例方法

### Object.prototype.valueOf()

- 参数： 无

- return: 返回当前对象对应的值

- function: 返回当前对象对应的值, 默认情况下返回对象本身

- 调用方式: `obj.valueOf()`;

- tip: valueOf方法的主要用途是，JavaScript 自动类型转换时会默认调用这个方法

- tip2: valueOf 方法可自定义

  ```js
    var obj = {}
    1 + obj // "1[object Object]"

    // 重写obj.valueOf(), 覆盖Object.prototype.valueOf()
    obj.valueOf = function () { return 2; }
    1 + obj // 3
  ```

### Object.prototype.toString()

- 参数： 无

- return: 返回当前对象对应的字符串形式, [object Object]

- function: 返回当前对象对应的字符串形式, 默认情况下返回类型字符串

- 调用方式: `obj.toString()`;

- tip: 数组、字符串、函数、Date 对象都分别部署了自定义的toString方法，覆盖了Object.prototype.toString方法。

#### Object.prototype.toString() 的应用

- 返回值[object Object] -> 其中第二个Object表示该值的构造函数。这是一个十分有用的判断数据类型的方法

- 由于实例对象可能会自定义toString方法，覆盖掉Object.prototype.toString方法，所以为了得到类型字符串，最好直接使用Object.prototype.toString方法

- 通过函数的call方法，可以在任意值上调用这个方法，帮助我们判断这个值的类型。

- 不同数据类型的Object.prototype.toString方法返回值如下
  
|:---:|:---:|
|数值|返回[object Number]|
|字符串|返回[object String]|
|布尔值|返回[object Boolean]|
|undefined|返回[object Undefined]|
|null|返回[object Null]|
|数组|返回[object Array]|
|arguments 对象|返回[object Arguments]|
|函数|返回[object Function]|
|Error 对象|返回[object Error]|
|Date 对象|返回[object Date]|
|RegExp 对象|返回[object RegExp]|
|其他对象|返回[object Object]|

- 写出一个比typeof运算符更准确的类型判断函数

  ```js
    // 方法1
    function myTypeOf(o) {
        var str = Object.prototype.toString.call(o);
        return str.match(/\[object (.*?)\]/)[1].toLowerCase();
    } 

    // 方法2
    function myTypeOf(o) {
        var obj = {
            '[object Object]': 'object',
            '[object Number]': 'number',
            '[object String]': 'string',
            '[object Boolean]': 'boolean',
            '[object Undefined]': 'undefined',
            '[object Null]': 'null',
            '[object Array]': 'array',
            '[object Arguments]': 'arguments',
            '[object Function]': 'function',
            '[object Error]': 'error',
            '[object Date]': 'date',
            '[object RegExp]': 'regexp',
        }

        return obj[Object.prototype.toString.call(o)];
    }
  ```

- 在上面这个myTypeOf函数的基础上，还可以加上专门判断某种类型数据的方法

  ```js
    function myTypeOf = function(o) {
        var str = Object.prototype.toString(o);
        return str.match(/\[object (.*?)\]/)[1].toLowerCase();
    }

    [
        'Number',
        'Boolean',
        'String',
        'Null',
        'Undefined',
        'Object',
        'Array',
        'Function',
        'Date',
        'RegExp',
        'Error',
    ].forEach(function(item) {
        myTypeOf['is' + item] = function (o) {
            return myTypeOf(o) === item.toLowerCase();
        }
    });

    myTypeOf.isNumber(1); // true
    myTypeOf.isNumber([]); //false
  ```

#### Object.prototype.toLocaleString()

- 参数： 无

- return: 与toString的返回结果相同，也是返回一个值的字符串形式。

- function: 主要作用是留出一个接口，让各种不同的对象实现自己版本的toLocaleString，用来返回针对某些地域的特定的值。

- 调用方式: `obj.toLocaleString()`;

- tip: 主要有三个对象自定义了toLocaleString方法。

  - Array.prototype.toLocaleString()

  - Number.prototype.toLocaleString()

  - Date.prototype.toLocaleString()

- 日期的实例对象的toString和toLocaleString返回值就不一样，而且toLocaleString的返回值跟用户设定的所在地域相关。

  ```js
    var porn = {
        toString: function () {
            return 'jayden';
        },
        toLocaleString: function() {
            return '鸡蛋';
        }
    }

    console.log(porn.toString()); // 'jayden'
    console.log(pron.toLocleString()); // '鸡蛋'
  ```

#### Object.prototype.hasOwnProperty()

- 参数： 属性名

- return: boolean

- function: 该实例对象自身是否具有该属性。

- 调用方式: `obj.hasOwnProperty()`;

- tip:
