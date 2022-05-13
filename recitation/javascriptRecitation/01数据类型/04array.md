# Array

## 1. 定义definition

- 数组（array）是按次序排列的一组值。每个值的位置都有编号（从0开始），整个数组用方括号表示。

## 2. 本质

- 数组是对象

   ```js
   var arr = [1, 2, 3];
   typeof arr -> object
   ```

### 数组是特殊对象

1. 键名是按次序排列的一组整数(0, 1, 2...)

   ```js
   var arr = ['a', 'b', 'c'];
   Object.keys(arr); // ["0", "1", "2"]
   ```

2. 键名固定(默认总是0, 1, 2...)

3. 数组键名其实是字符串：JavaScript 语言规定，对象的键名一律为字符串，之所以可以用数值读取键名，是因为非字符串的键名会被转为字符串。

4. 一个值总是先转成字符串，再作为键名进行赋值。

   ```js
   var a = [];
   a[1.00] = 6;
   console.log(a[1]); // 6
   ```

5. 读取数值键名不能使用点建构，只能使用[]: arr.0是错误的只能是arr[0]

6. 必然有length属性

7. 数组的声明方式两种： 

   ```js
   var arr = new Array(1, 2, 3) // 参数不同获取到的结果不同
   
   var arr = [1, 2, 3]; //字面量方法
   ```

8. [...].toString() === [...].join();

### length 属性

- length属性：返回数组的成员数量

- length的max值：2的32次方-1 = 4294967295 -> 因为JavaScript使用一个32位整数，保存数组的元素个数

- 只要是数组，就一定有length属性。该属性是一个动态的值，等于键名中的最大整数加上1。

- 数组的数字键名不需要连续， length属性的值总是比最大的那个整数键大1

- length 属性可写：

  - 人为设置一个小于当前成员个数的值，该数组的成员数量会自动减少到length设置的值。

  - 设置length大于当前元素个数，则数组的成员数量会增加到这个值，新增的位置都是空位。

  - 设置length为不合法的值(lenth < 0 或者 length 被赋值为小数或者非数)，JavaScript 会报错。

- 清空数组的方法：将length属性设为0

- 可以为数组添加非正整数值属性，但是这不影响length属性的值。

```js
var a = [];

a['b'] = 'alexis';
a[2.2] = 'jayden'; // 添加小数属性
a[-1] = 'foxxx'; // 添加负数属性
console.log(a.length); // 0
```

- 如果数组的键名是添加超出范围的数值(键名> 2^32-1)，该键名会自动转为字符串。length属性不受影响

### in 运算符

- in: 检查某个键名是否存在, 适用于对象，也适用于数组。

```js
var arr = ['a', 'b', 'c']
2 in arr // true
3 in arr //false
```

- 返回 true 或者 false：true为存在该键名，false为不存在

- <font style="color:red;">**如果数组的某个位置是空位，in运算符返回false**</font>

### for...in循环和数组遍历

- for...in循环不仅可以遍历对象，也可以遍历数组

- for...in不仅会遍历数组所有的数字键，还会遍历非数字键. -> for...in会遍历出原型上的属性和方法名

- 不推荐使用for...in遍历数组

- 使用for循环遍历数组

- 使用while循环遍历数组

- 逆向遍历数组

### 数组的空位

- 什么是空位：即两个逗号之间没有任何**<font color="red">值</font>**，我们称该数组存在空位（hole）。

- 如何判断数组元素是空位: 

  1 使用 in 运算符, 这种方法判断数组最后一个元素不准确

    ```js
    // 使用in运算符判断空位，对判断数组最后一个元素不准确
    var arr = [1, 2, 3];
    delete(arr[2]);

    var arr2 = ['a', 'b'];

    console.log(2 in arr); // false
    console.log(2 in arr2); // false
    ```

  2 使用for循环结合in运算符来判断数组空位可完美对数组空位进行判断

    ```js
    var arr = [undefined, , null, , 5];
  
    for (var i = 0; i < arr.length; i++) {
      console.log(i in arr);
    }
    ```

- 由上可知，空位是取不到键名的

   ```js
   var arr = [1, , 3];
    
   console.log(0 in arr);// true
   console.log(1 in arr);// false
   console.log(2 in arr);// true
   ```

- 空位的产生：

  - 定义时，两个逗号之间不写值

  - 使用delete删除某个数组元素

  - 使用Array构造函数创建数组只给一个数字参数,就会创建空值数组：var arr = new Array(3);

  - 最后一个元素后面有逗号，并不会产生空位

- 数组的空位不影响length属性

- legnth属性不过滤空位：使用delete命令删除一个数组成员，会形成空位，但是不会影响length属性

- 数组的空位是可以读取的，返回undefined

- 数组的某个位置是空位，与某个位置是undefined，是不一样的

  - 如果是空位，使用数组的forEach方法、for...in结构、以及Object.keys方法进行遍历，空位都会被跳过

  - 如果是undefined, 则不会被跳过

  - 空位就是数组没有这个位置的值，所以不会被遍历到，而undefined则表示数组有这个位置的值，值是undefined，所以遍历不会跳过。

### 类数组对象

- 什么是类数组：如果一个对象的所有键名都是正整数或零，并且有length属性，那么这个对象就很像数组，语法上称为“类似数组的对象”（array-like object）。

- “类数组”并不是数组，因为它们不具备数组特有的方法

- “类数组”的根本特征，就是具有length属性。只要有length属性，就可以认为这个对象类似于数组。

- 类数组的length属性不是动态值， 不会随着成员的变化而变化

- 典型的类数组： arguments, 大多数DOM元素集(getElementsByTagName, getElementsByClassName等所获得的结果集)， 字符串

- instanceof运算符： 判断实例是否属于某个构造函数

- 数组的slice方法可以将“类似数组的对象”变成真正的数组

- 类数组还有一个办法可以使用数组的方法，就是通过call()把数组的方法放到类数组对象上面。 这种方法比直接使用数组原生的数组方法要慢，所以最好还是先将“类似数组的对象”转为真正的数组
