# Object

## 1. 概述

### 1.1 生成方法

- 什么是对象：简单说，对象就是一组“键值对”（key-value）的集合，是一种无序的复合数据集合。

```js
var obj = {
    foo: 'Hello',
    bar: 'World'
}
```

- 键名与键值之间用冒号分隔

- 两个键值对之间用逗号分隔。

### 1.2 键名

- 对象的所有键名都是字符串（ES6 又引入了 Symbol 值也可以作为键名），所以加不加引号都可以

- 如果键名是数值，会被自动转为字符串(小数，科学计数法，不同进制都可以)

- 如果键名不符合标识名的条件（比如第一个字符为数字，或者含有空格或运算符），且也不是数字，则必须加上引号，否则会报错;

- 每一个键名又称为“属性”（property），它的“键值”可以是任何数据类型

- 如果一个属性的值为函数，通常把这个属性称为“方法”，它可以像函数那样调用

- 如果属性的值还是一个对象，就形成了链式引用
  
  ```js

    var obj = {
    name: 'Jayden',
    };
    var o2 = {
    name: 'alexis',
    };

    obj.gay = o2;

    testHtml.innerText = obj.gay.name;
  ```

- 对象的属性之间用逗号分隔，最后一个属性后面可以加逗号（trailing comma），也可以不加

- 属性可以动态创建，不必在对象声明时就指定

  ```js
    var obj = {};
    obj.name = 'jayden'
    console.log(obj.name);
  ```

### 1.3 对象的引用

- 如果不同的变量名指向同一个对象，那么它们都是这个对象的引用，也就是说指向同一个内存地址

- 修改其中一个变量的属性，会影响到其他所有变量

- 如果取消某一个变量对于原对象的引用，不会影响到另一个变量

- 但是如果两个变量指向同一个原始类型的值。那么，变量这时都是值的拷贝，因为是不同的内存地址

### 1.4 表达式还是语句？

- 对象采用大括号表示，这导致了一个问题：如果行首是一个大括号，它到底是表达式还是语句？

- JavaScript 引擎的做法是，如果遇到这种情况，无法确定是对象还是代码块，一律解释为代码块。

  ```js
   { console.log('jadyen') }; // jayden
  ```

- 如果要解释为对象，最好在大括号前加上圆括号。因为圆括号的里面，只能是表达式。

  ```js
   console.log(eval('{name: "jayden"}')); // jayden
   console.log(eval('({name: "jayden"})')); // { name: jayden }
  ```

### 1.5 属性名唯一

- 对象的属性唯一： 属性名唯一，多个同名属性，最终只可能是最后一个属性值 

  ```js
    var obj = {
      name: 'jayden',
      name: 'alexis'
    };

    console.log(obj); // { name: 'alexis' }
  ```

## 2. 属性的操作

### 2.1 属性的读取

- 使用点运算符

- 使用方括号运算符

- 使用方括号运算符，键名必须放在引号里面，否则会被当作变量处理

- 方括号运算符内部还可以使用表达式

- 数值键名不能使用点运算符（因为会被当成小数点），只能使用方括号运算符

### 2.2 属性的赋值

- 点运算符和方括号运算符，不仅可以用来读取值，还可以用来赋值

  ```js
   var obj = {};
   obj.name = 'jayden'
  ```

- JavaScript 允许属性的“后绑定”，也就是说，你可以在任意时刻新增属性，没必要在定义对象的时候，就定义好属性。

### 2.3 属性的查看

- Object.keys() 方法

### 2.4 属性的删除 delete

- delete命令用于删除对象的属性，删除成功后返回true

- 删除一个不存在的属性，delete不报错，而且返回true, 因此，不能根据delete命令的结果，认定某个属性是存在的。

- 只有一种情况，delete命令会返回false，那就是该属性存在，且不得删除, 属性的元属性 configurable: false 的情况

- delete命令只能删除对象本身的属性，无法删除继承的属性

  ```js
  var obj = {};
  delete obj.toString // true
  obj.toString // function toString() { [native code] }
  ```

- 由上可知，即使delete返回true，该属性依然可能读取到值

### 2.5 属性是否存在: in 运算符 

- in运算符用于检查对象是否包含某个属性（注意，检查的是键名，不是键值）

- 如果包含就返回true，否则返回false

- 它的左边是一个字符串，表示属性名，右边是一个对象

- in 它不能识别哪些属性是对象自身的，哪些属性是继承的

- 可以使用对象的hasOwnProperty(Object.prototype.hasOwnProperty)方法判断一下，是否为对象自身的属性

### 2.6 属性的遍历：for...in 循环

- for...in循环用来遍历一个对象的全部属性。

- 它遍历的是对象所有可遍历（enumerable）的属性，会跳过不可遍历的属性

- 它不仅遍历对象自身的属性，还遍历继承的属性。

- 只想遍历对象自身的属性，所以使用for...in的时候，应该结合使用hasOwnProperty方法，在循环内部判断一下，某个属性是否为对象自身的属性。

  ```js
    var obj = {
        name: 'Jayden',
        sex: 'female',
    };

    for (key in obj) {
    if (obj.hasOwnProperty(key)) {
        console.log(key);
    }
    }
  ```

## 3. with语句

- with语句的格式如下：

  ```js
    width (对象) {
        语句;
    }
  ```

- 它的作用是操作同一个对象的多个属性时，提供一些书写的方便。

  ```js
    // example 1
    var obj = {
        name: 'jayden',
        age: 20
    }

    with (obj) {
        name = 'alexis';
        age = 25;
    }

    // 等同于
    obj.name = 'alexis';
    obj.age = 25;

    // example 2
    var link = document.getElementsByTagName('link')[0]

    with (link) {
        console.log(rel);
        console.log(href);
        console.log(style);
    }

    // 等同于
    console.log(link.rel);
    console.log(link.href);
    console.log(link.style);
  ```

- 如果with区块内部有变量的赋值操作，必须是当前对象已经存在的属性，否则会创造一个当前作用域的全局变量。

  ```js
    var fn = function () {
        var obj = {
            name: 'jayden',
            sex: 'female'
        }

        with(obj) {
            name = 'alexis';
            age = 16;
        }

        console.log(obj.age); // undefined
        console.log(age); // 16
    }

    console.log(age); // 16
  ```

- 造成上面情况是因为with区块没有改变作用域，它的内部依然是当前作用域。这造成了with语句的一个很大的弊病，就是绑定对象不明确

  ```js
    with(obj) {
        console.log(x); // 无法判断是全局变量还是obj的属性
    }
  ```

- 这非常不利于代码的除错和模块化，编译器也无法对这段代码进行优化，只能留到运行时判断，这就拖慢了运行速度。因此，建议不要使用with语句

- 可以考虑用一个临时变量代替with

  ```js
    with(obj1.obj2.obj3) {
        console.log(p1 + p2);
    }

    // 写成
    var temp = obj1.obj2.obj3;
    console.log(temp.p1 + temp.p2);
  ```
