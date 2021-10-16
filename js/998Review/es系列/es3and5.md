# 01 语法规范
- 多变量声明的标准写法
- var 变量的特殊情况有哪些，结果是什么，举例说明
- 当前js代码块的错误是否会影响其他代js码块的执行,举例说明
当前代码块的错误不会影响其他代码块的执行
- 注释的分类和写法

# 02 运算符
## 算术运算符
### + 运算
```JavaScript
var a = 1,
    b = 2,
    pi = 3.14,
    c;

c = a + b; 
c = 5000000000000000 + 1.1; 
c = 500000000000000 + 1.1; 
c = 9999999999999999 + 31.1; 
c = 10000000000000011 * 10000000000000022; 
c = 1.0000000000000035e+32 * 1.0000000000000035e+32 

c = '2' + 10; 
c = '2' + 5.20e+3; 
c = '2' + pi; 

c = true + pi; 
console.log(c);

c = undefined + pi; 

c = null + pi; 

var str = '2';
c = 1 + str; 
c = pi + str; 
c = 5.02e+5 + str; 
c = '2b' + str; 
c = str + '2b'; 

c = false + str; 

c = undefined + str; 

c = null + str; 

c = pi + true; 
c = pi + false; 

c = str + true; 

c = true + true; 
c = false + true; 
c = false + false; 

c = undefined + true; 
c = undefined + false; 

c = null + false; 

c = pi + undefined; 

c = str + undefined; 

c = true + undefined; 

c = undefined + undefined; 

c = null + undefined; 

var arr = [1, 2, 3];
c = arr + undefined; 

c = pi + null; 

c = str + null; 

c = false + null; 

c = null + null; 

console.log(c);
```

### / 运算
```JavaScript
var a = 3,
    b = 6,
    c;

c = a / b; 

c = 0 / 0; 

c = 1 / 0; 
c = -88 / 0; 
c = 1 / -0;
```

### % 运算
```JavaScript
c = 5 % 3; 
c = 4 % 6; 
c = 5 % 0; 
c = 0 % 3; 
c = 'abac' % 3; 
```

### 交换值
```JavaScript
var num0 = 1,
    num1 = 2，
// 写出交换 num0 和 num1 的4种方法
```

### ++ --
```JavaScript
var n = 1;
console.log(n++); 
console.log(++n); 
console.log(n = n + 1); 

var n1 = 5,
    m1;

m1 = --n1 + n1++; 
```

## 比较运算符 > < >= <= == === != !==
```JavaScript
/**
 * 比较运算符：> < >= <> == === != !==
 */

var bool = 0 > 2; 
bool = 0 < 2; 

bool = 0 < '2'; 
bool = 0 > '2'; 
bool = 0 == 'a2b'; 
bool = 0 > 'a2'; 
bool = 0 < 'a2'; 

bool = 'a' > 'b'; 
bool = '3.5' > '11'; 
bool = 'alexis' > 'aleixs';

bool = 0 == ''; 
bool = 0 === ''; 

bool = NaN == NaN; 
```

## 逻辑运算符
### && 和 ||
-  undefined, null, NaN, "", '', 0, false 一定是假,除上述以外全部是真
-  && 遇到真就往后走，遇到假或者走到最后一个就返回当前值；
```JavaScript
var a = 1 && 2 && undefined && 10; 
```
-  || 遇到假就往后走，遇到真或者走到最后一个就返回当前值；
```JavaScript
var b = 0 || null || 1 || 0; 
```
-  if(... && ...){}只有真才能走入{}内的语句



- if(... || ...){}只有真才能走入{}内的语句



- 应用
```JavaScript
var name = '';
console.log(name || '未找到数据');
```
```JavaScript
 a.onclick = function(e) {
     
     var event = e || window.event;
 }
```

### ! 运算
- 1 为 true， ！1 为false
```JavaScript
var a = !1; 
var a = !!1; 
console.log(a);
```

# 03 判断

## 判断分支作业
1. 作业：填写星期几，填写上午，下午，弹出日程安排
2. 用switch的方式写查询成绩
```js

```

# 04 循环，数据类型转换，typeof()
## 循环练习
1. 从0开始做加法，加到什么时候总和是小于100的
```js

```

2. 100以内的数跳过7的整数或者含7的数
```

```

3. 100以内可以被4,5,6整除的数
```js

```

4. 打印0-100的数，()只能有一句，不能写比较
```js

```

5. 10 的N次方
```js

```

6. n的阶乘
```

```

7. 将789打印成987
```js

```

8. 打印三个数中最大的数
```js

```

9. 打印100以内的质数
```js

```

10. 证明 do...while 至少执行一次
```js

```

11.  什么是死循环，如何停止
12. 用for实现死循环，并在循环到第10次的时候停止

## typeof 能打印那几个数据类型

- number, string, boolean, object, undefined, function

## js中基本引用类型有哪些

* 

## 显示类型转化和隐式类型转化
1. Number() 和 parseInt() 的不同
```
Number(null) == 0
parseInt(null).toString() == 'NaN'

Number('2b').toString() == 'NaN'
parseInt('2b') == 2

Number(true) = 1;
parseInt(true).toString(); == 'NaN'

Number(false) = 0;
parseInt(false).toString(); == 'NaN'

Number('3.8') = 3.8;
parseInt('3.8') = 3;
```

2. parseInt(value, radix) 和 toString(radix)的不同
- parseInt(value, 16), 16进制转10进制；
- value.toString(16), 10进制转16进制；
```js
var a = 'b2';
var b = parseInt(a, 16);
console.log(b); 
console.log(b.toString(16)); 
```

3. 转换为String类型的几种方法



4. console.log(toString('123')); 等于什么, 为什么



5. 以下语句结果是什么
var a = '1' > 2; 
var a = 1 > '2'; 
var a = 'a' > 'b'; 
var a = 1 == '1'; 
var a = 1 === '1'; 
var a = NaN == NaN; 
var a = 2 > 1 > 3; 
var a2 = 2 > 1 == 1; 
var a3 = 2 > 1 === 1; 
console.log(a, a2, a3);
var a = undefined == 1; 
var a = undefined > 0; 
var a = undefined < 0; 
var a = null == 1; 
var a = null > 0; 
var a = null < 0; 
var a = null == 0; 
var a = undefined == null; 
var a = undefined === null; 
console.log(typeof(+'123') + '-' + +'123'); 
console.log(typeof(+'123b') + '-' + +'123b'); 
console.log(typeof(-'123') + '-' + -'123'); 

6. 以下语句结果是什么
console.log(isNaN(NaN)); 
console.log(isNaN(123)); 
console.log(isNaN('123')); 
console.log(isNaN('a')); 
console.log(isNaN(null)); 
console.log(isNaN(undefined)); 
console.log(null + '1') 

7. null 的 特点



8. 隐式类型转换的特点
- 基本类型除了字符串外其他类型的> < >= <=都将转化为数字
- 引用类型除了'+'运算符外，其他> < >= <=都将转化为数字类型 
> 我现在的理解是先调用哪一个是由解释器决定的，默认是先调用valueOf方法，但具体决定的规则我还不清楚。比如console.log(''+{})会先调用valueOf方法，如果valueOf方法返回的不是primitive value，再调用toString方法;console.log([{}].join(""))会先调用匿名对象的toString方法，如果toString方法返回的不是primitive value，再调用valueOf方法。

## 循环作业
1. 用 for 循环算出斐波拉切数列，手动输入n
```js

```

# 05 函数
## 函数的特点
1. 什么是函数
2. 什么是耦合，如何解耦合，js怎么解耦合
3. 编码原则是什么
4. 函数的命名规则
5. 函数的几种声明方式
6. 什么是字面量，有哪些字面量，如何表示
## 练习
1. 下面函数执行会发生什么，如何结束
```
var test = function fun() {
    var a = 1,
        b = 2;
    console.log(a, b);

    
    for (var i = 0; i < 10; i++) {
        if (i == 9) {
            break; //无法阻止自身调用
        } else {
            fun();
        }
    }
}

test(); 
```

2. 获取函数的实参和形参数量, js中形参没有类型约束

3. 函数被调用时，求他的实参的和

4. 实参和形参的映射关系 (写代码说明)

5. 修改实参值(写代码说明)

6. 为什么会存在修改不了实参值的情况？(写代码说明) -> 映射关系未达成

7. function中 var a = b = 2; 存在的问题

8. return 返回值的作用，是否必须写？

9. 什么是函数作用域，函数作用域的特点是什么，什么是函数作用域链？

10. 同级函数，是否能互相访问函数内定义的变量？


## 作业
1. 定义一个函数， 从wp接收一个饮料的名称，函数返回对应的价格；
2. 定义个函数， 从wp接收第一个数，接收运算符号，再接收第二个数，利用这个函数做运算并返回运算结果
3. 定义一个函数，从wp接收一个n， 算出n的阶乘，不能用 for
4. 定义一个函数， 从wp接收一个n，算出斐波那契数列的第N位，不能用for循环

# 06 函数参数默认值，递归，预编译，暗示全局变量
1. ES5 和 ES6 的参数默认值的设置方法
2. 形参与实参的关系
3. 为什么ES5中形参和实参会一直保持映射关系
4. 什么是递归
5. 事递归求阶乘
6. 递归求斐波拉切数列
7. 什么是暗示全局变量
8. 下面的console.log打印的是什么

案例1
```JavaScript

function test(a, b) {
    console.log(a); 
    console.log(c); 
    c = 0;
    console.log(c); 
    var c;
    a = 5;
    console.log(b); 
    b = 6;
    console.log(b); 

    function b() {}

    function d() {}
    console.log(b); 

    b = function() {}
    console.log(b); 
}

test(1);
```


### 案例 2 全局预编译
```JavaScript
var a = 1;

function a() {
    console.log(2);
}

console.log(a); 
```

### 案例3
```JavaScript
console.log(a, b); 
function a() {}
var b = function() {}
```

### 案列4
```JavaScript
var b = 1

function test() {
    var a = 2,
        b = 3;
    console.log(b); 
}

test();
```


### 案例5
```JavaScript
var b = 3;
console.log(a); 

function a(a) {
    console.log(a); 
    var a = 2;
    console.log(a); 

    function a() {
        var b = 5;
        console.log(b); 
    }
}

a(1);
```

### 案例6

```JavaScript
a = 1;

function test() {
    console.log(a); 
    a = 2;
    console.log(a); 
    var a = 3;
    console.log(a); 
}

test();
var a;
```

### 案例7
```JavaScript
function test() {
    console.log(b); 
    if (a) {
        var b = 2;
    }

    c = 3;
    console.log(c); 
}

var a;
test();
a = 1;
console.log(a); 
```

7. 作业： 下面的console.log()打印的是什么

第一题 
```JavaScript
function test() {
    return a; 
    a = 1;

    function a() { 
        var a = 2;
    }
}
console.log(test()); 
```

第二题
```JavaScript
function test() {
    a = 1;

    function a() {}
    console.log(a); 
    var a = 2;
    return a;
}
console.log(test());
test();
```

第三题
```JavaScript
a = 1;

function test(e) {
    function e() {}
    
    arguments[0] = 2;
    
    console.log(e); 
    if (a) {
        var b = 3;
    }
    var c;
    a = 4;
    var a;
    console.log(b); 
    f = 5;
    console.log(c); 
    console.log(a); 
}
var a;
test(1);
console.log(a); 
console.log(f); 
```

8. 小练习
第一题
```JavaScript
var a = 1,
    b = 2,
    c = 3,
    d;

d = a + b + (c + 2);
console.log(d);
```

第二题
```JavaScript
window.a || (window.a = '1');
```

第三题
```JavaScript
var b = 2;
console.log(b);
```

特例
```JavaScript
 a = 2;

sole.log(a, b);
```

++ 小练习
```JavaScript
var c = 2;

```

# 07 作用域-作用域链-预编译-闭包
1. 如何查看系统或者函数的[[scope]]属性

2. 函数如何通过[[Scopes]]来实现作用域链的

3. 作用域链练习
```JavaScript
function a() {
    function b() {
        function c() {

        }
        c();
    }
    b();
}
a();
```

4. 闭包练习
### No.1 闭包实现 n 加1， 减1
```JavaScript

```

### No.2 面包管理，闭包实现 供给一次+10，销售一次-3
```JavaScript

```

### No.3 闭包实现设置星期日日程
```JavaScript

```

### No.4 d.fun() 打印出什么 
```JavaScript
function a(f) {
    var f = arguments[0] || 3;

    var obj = {
        b: function() {
            var f1 = 22;

            var f2 = {
                fun: function() {
                    f = f1 + 20;
                    console.log(f);
                }
            }
            return f2;
        }
    }
    return obj;
}

var d = a(10).b();
console.log(d);
d.fun(); 
```
## 作业
1. 写一个累加器，执行一次就加1，并打印

2. 写一个缓存器，把一个班级的学生名字保存在数组里，写两个方法，放入函数中的一个对象中
第一个方法加入班级，第二个方法离开班级，每次加入或离开都要打印新的学生名单


# 08 立即执行函数-闭包深入-逗号运算符
1. 函数表达式与函数声明的区别, 为什么函数声明不能形参匿名函数；

2. 立即执行函数函数名的意义和用处；

3. 除加()外，立即执行函数还有那些实现方法 

## 练习
1. 下面写法报错吗？
```JavaScript

function test(a) {

}(6); 


function test1(a, b) {

}(8, 9, 10);

function test2(a, b) {

}();
```

2. 下面语句执行结果是什么，如何修改得到正确结果
```JavaScript
    
    
function test() {
    var arr = [];
    for (var i = 0; i < 10; i++) {
        arr[i] = function() {
            document.write(i + ' ');
        }
    }

    return arr;
}

var myArr = test();

console.log(myArr);

for (var j = 0; j < 10; j++) {
    myArr[j]();
}
```

3. 下面语句结果是什么，如何修改
```JavaScript
varr oLi = document.querySelectorAll('li');

for (var i = 0; i < oLi.length; i++) {
    oLi[i].onclick = function() {
        console.log(i);
    }
}
```

4. 逗号分隔符
```JavaScript
var fn = (

    function test1() {
        return 1;
    },

    function test2() {
        return '2';
    }
)();

console.log(typeof(fn)); 
```
5. ()表达式忽略函数名
```JavaScript
var a = 10;
if (function b() {}) {
    a += typeof(b); 
}

console.log(a); 
```

6. 下面语句输出什么
```JavaScript
test();

(function test(){
    console.log('alexis)
})
```

# 09 对象-构造函数-实例化-闭包高级
1. 对象增删改查属性和方法的办法

## 作业
1. 写一个构造函数，接收数字类型的参数，参数数量不定, 完成参数的相加和相乘

2. 写一个构造车的函数，可设置车的品牌，颜色，排量,在写一个构造消费者的函数，设置用户的名字，年龄，收入，通过一个方法实例化用户喜欢的车，再实例化的时候设置车的属性


# 10 构造函数及实例化原理-包装类
1. 根据构造函数原理，自行实现构造函数

2. 构造函数return的特点是什么

3. 包装类如何增删改查属性和方法

4. 包装类参与运算的结果是什么？

5. 普通数字如何能够使用属性和方法，在什么地方能用

6. 如何为undefined和null设置方法和属性

7. 自动包装类如何执行, 下面语句打印的是什么
```
var a = 123;
a.length = 3;

console.log(a.length);
console.log(new Number(a).toString());
console.log(a.toString());
```

8. 下面的语句打印的是什么，为什么能够打印
```
var str = 'abc';
console.log(new String(str).length);
console.log(str.length);
```

9. 如何实现数组截断

10. str 修改length 为什么不能截断字符串

## 练习

- Q1: 下面最后输出什么, 需要正确输出要怎么修改
```JavaScript
var name = 'fox';
name += 10;
var type = typeof(name);
if (type.length === 6) {
    type.text = 'string';
}
console.log(type.text); 
```

- Q2 car里面的brand 和 color 是什么
```JavaScript
function Car(brand, color) {
    this.brand = 'Benz';
    this.color = 'red';
}

var car = new Car('Mazda', 'black')
console.log(car); 
```

-  Q3 下面语句，最终打印的是什么
```JavaScript
function Test(a, b, c) {
    var d = 1;
    this.a = a;
    this.b = b;
    this.c = c;

    function f() {
        d++;
        console.log(d);
    }

    this.g = f;
}

var test1 = new Test();
test1.g(); 
test1.g(); 

var test2 = new Test();
test2.g();
```

- Q4 ,最后输出什么
```JavaScript
var x = 1,
    y = z = 0;

function add(n) {
    return n = n + 1;
}
y = add(x);

function add(n) {
    return n = n + 3;
}
z = add(x);

console.log(x, y, z); 
```

- Q5 下面函数哪个可以输出1,2,3,4,5
```JavaScript
function foo(x) {
    console.log(arguemnts);
    return x;
}
foo(1, 2, 3, 4, 5);

function foo(x) {
    console.log(arguments);
    return x
}(1, 2, 3, 4, 5);

(function foo(x) {
    console.log(arguments);
    return x;
})(1, 2, 3, 4, 5)
```

- Q6 问打印出什么
```JavaScript
function b(x, y, a) {
    a = 10;
    console.log(arguemtns[2]);
}
b(1, 2, 3); 

function b(x,y,a){
    arguments[2] = 10
    console.log(a);
}

b(1,2,3)
```


## 作业
- 写一个函数，接收任意一个字符串，算出这个字符串的总字节数
> ASCII码 表1 0-127   表2 128 255 长度都是一个字节 1 byte
> UNICODE码，涵盖ASCII码，前255位是ASCII, 之后都是2个byte表示一个码
> charCodeAt(),参数是字符在字符串中的位置

```JavaScript
var pos = str.charCodeAt(0);
console.log(pos);
```


# 11 原型-原型链-闭包立即执行函数-插件开发
1.为什么把方法和不需传参的属性写入prototype, 需要传参的部分才写入构造函数，代码如何实现

2. 实例能否增删改查prototype的属性和方法，代码举例说明

3. 原型上的constructor指向哪里，prototype的推荐写法是什么

4. 如何改变原型上constructor的指向

5. __proto__ 的特点，模拟写__proto__

## 测试题
- 考题1 问结果是什么？
```JavaScript
function Car() {}
Car.prototype.name = 'Benz';
var car = new Car();

Car.prototype.name = 'Toyota';
console.log(car.name); 
```

- 考题2 问结果是什么？
```JavaScript
Car.prototype.name = 'Benz';

function Car() {}
var car = new Car();


Car.prototype = {
    name: 'Toyota'
}

console.log(car); 
```

## JavaScript 属性修改和对象重写的区别

## 闭包立即执行函数
1. 使用window. 实现闭包

2. 闭包立即执行函数的两种写法

3. 为什么在立即执行函数前面加分号

## JavaScript 插件的写法, 闭包立即执行函数，构造函数

## 作业
<font color=red>写一个插件，任意传两个数字 ，调用插件内部方法可以进行加减乘除,</font>


# 12 原型与原型链深入-对象继承

1. 什么是原型链

2. 原型链产生的原理

3. 原型链的增删改查

4. 引用值永远显示最后状态

5. Object.create()方法的作用

6. 创建一个不继承自object.prototype的对象, 实现该对象的toString方法

7. 系统内部构造函数原型方法的重写

8. call 和 apply 的作用，以及二者的不同

9. constructor 的特点

## 测试题
1. 最终输出的this.brand是谁
```JavaScript
function Car() {
    this.brand = 'Benz';
}

Car.prototype = {
    brand: 'mazda',
    intro: function() {
        console.log('我是' + this.brand + '车');
    }
}

var car = new Car();
car.intro(); 
Car.prototype.intro();
```

2. 最终打印的是什么
```JavaScript
function Person() {
    this.smoke = function() {
        this.weight--;
        
    }
}

Person.prototype = {
    weight: 130
}

var person = new Person();
person.smoke(); 
console.log(person); 
```

3. 公司常用的对象声明方式  
```JavaScript
var obj1 = {
    name: 'jay'
};
console.log(obj1);

var obj2 = new Object();
obj2.name = 'jay';
console.log(obj2);

function Obj(){}
var obj3 = new Obj();
console.log(obj3);
```

4. 原型的终点一定是系统定义的Object.prototype;
```JavaScript
function Test() {}
var obj = new Obj();

console.log(obj.__proto__); 
console.log(obj.__proto__.__proto__); 
```

5. 案例 1 让Fullcompute 获得 加 减 法
```JavaScript
function Computer() {
    this.plus = function(a, b) {
        console.log(a + b);
    }
    this.minus = function(a, b) {
        console.log(a - b);
    }
}

function FullCompute() {
    Computer.apply(this)
    this.mul = function(a, b) {
        console.log(a * b);
    }

    this.div = function(a, b) {
        console.log(a / b);
    }
}

var compute = new FullCompute();
compute.plus(1, 2);
compute.minus(1, 2);
compute.mul(1, 2);
compute.div(1, 2);
```

## 作业
年龄未多少岁姓名为XX 买了一辆排量为XX的什么颜色的什么牌子的车
要求用两个构造函数来完成


# 13 继承深入-call-apply-圣杯模式-模块化

1. call 或者 apply实现继承，代码实现

2. 完美的继承方式是什么？

3. 封装圣杯模式，代码实现

4. 普通闭包，对象闭包，构造函数闭包各自怎么实现

5. 圣杯模式闭包怎么实现

6. 什么是模块化开发, 写一个实例，输出一个人名字，工作，用到的工具，主要做什么，每天工作多长时间，需要用到什么语言

7. 企业协同开发分哪两种，各自怎么实现，有什么异同，为什么要用到这样的开发方式

8. 网页的圣杯模式布局- 三列布局

## 作业
1. 打印给定一个数，打印从0到这个数中能被3或5或7整除的数
2. 打印斐波那契数列，指定数为n
3. 打印从0到n的累加值


# 14 对象属性遍历-this-caller-callee

1. 什么是链式操作，如何实现

2. 对象属性的两种访问方式，有什么区别

3. 对象枚举，实现下面对象的枚举
```JavaScript
var car = {
    'brand': 'benz',
    color: 'pink',
    displacement: '3.0',
    width: '2.5',
    long: '5'
}

var arr = [1, 2, 3, 4, 5];

var jay = {
    'No1': 'Html',
    'No2': 'CSSl',
    'No3': 'javascript',
}
```

4. 判断对象是否有某属性的两种方法，hasOwnProperty() 和 in, 两种方法的异同，用代码实现

5. instanceof 的作用和原理

6. 判断 a 是数组还是对象的3中方法

7. 接收数据时，判断数据类型的最佳方法

8. 全局this，预编译函数this，apply()或者call()，构造函数的this，各有什么不同，能够使用代码证明


# 特别
- 字符串的不可变性

