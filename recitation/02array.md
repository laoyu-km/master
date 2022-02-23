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


### length 属性

- length属性：返回数组的成员数量

- length的max值：2的32次方-1 = 4294967295 -> 因为JavaScript使用一个32位整数，保存数组的元素个数

- 只要是数组，就一定有length属性。该属性是一个动态的值，等于键名中的最大整数加上1。

- 数组的数字键名不需要连续， length属性的值总是比最大的那个整数键大1

- length 属性可写：

   - 如果人为设置一个小于当前成员个数的值，该数组的成员数量会自动减少到length设置的值。

   - 人为设置length大于当前元素个数，则数组的成员数量会增加到这个值，新增的位置都是空位。

   - 人为设置length为不合法的值，JavaScript 会报错。
   

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

- 如果数组的某个位置是空位，in运算符返回false


### for...in循环和数组遍历

- for...in循环不仅可以遍历对象，也可以遍历数组

- for...in不仅会遍历数组所有的数字键，还会遍历非数字键. -> for...in会遍历出原型上的属性和方法名

- 不推荐使用for...in遍历数组

- 使用for循环遍历数组

- 使用while循环遍历数组

- 逆向遍历数组

### 数组的空位

- 什么是空位：即两个逗号之间没有任何**<font color="red">值</font>**，我们称该数组存在空位（hole）。

- 如何判断数组元素是空位: 使用 in 运算符
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


## Array 对象

### 1. 构造函数 Array

1. Array 是 JavaScript 的原生对象，同时也是一个构造函数

2. Array(3) === new Array(3) -> 效果一样，考虑到语义性，以及与其他构造函数用法保持一致，建议总是加上new

3. Array()构造函数有一个很大的缺陷，不同的参数个数会导致不一致的行为。不建议使用它生成新数组
```js
//1. 无参数，生成空数组
var arr = new Array();
console.log(arr); // []

//2. 1 参数，正整数，参数表示生成数组的长度，但是数组元素全是空元素
var arr = new Array(3);
console.log(arr); // [empty x 3];

//3. 1参数， 非正整数， 报错
new Array(-1); // RangeError: Invalid array length
new Array(3.2); // RangeError: Invalid array length

//4. 1参数，非数值，该参数为长度为1的数组的值
new Array('jayden'); // ['jayden']
new Array(true);     // [true]
new Array([2,3,4]);  // [[2,3,4]]

//5. 多参数，参数均作为数组成员
new Array(3, 'jayden', true, [2,3,4]); // [3, 'jayden', true, [2,3,4]]
```

4. <font color="red">**如果参数是一个正整数，返回数组的成员都是空位**</font>


### 2. 静态方法

#### 2.1 Array.isArray();

- 参数： arr

- return: Boolean

- function: 判断传入的参数是否为数组

- 调用方式: Array.isArray(arr);

- tip: typeof运算符只能显示数组的类型是Object，而Array.isArray方法可以识别数组。


### 3. 实例方法

#### 3.1 valueOf()

- 参数： 无

- return: 数组本身

- function: 表示对该对象求值

- 调用方式: arr.valueOf();

- tip: valueOf() 和 toString 都是对象的通用方法，不同对象所得到的的结果不尽一致;


#### 3.2 toString()

- 参数： 无

- return: 返回对象的字符串形式

- function: 表示对该对象求值

- 调用方式: arr.toString();


#### 3.3 push()

- 参数： 需要添加的元素

- return: 返回添加新元素后的数组长度: length

- function: 用于在数组的末端添加一个或多个元素, 有几个参数添加几个元素

- 调用方式: arr.push(parameter1, parameter2,...,parameterN);

- tip: 该方法会改变原数组


#### 3.4 pop()

- 参数： 无

- return: 返回被删除的元素

- function: 用于删除数组的最后一个元素

- 调用方式: arr.pop();

- tip: 该方法会改变原数组, 对空数组使用pop方法，不会报错，而是返回undefined

- tip2: push和pop结合使用，就构成了“后进先出”的栈结构（stack）。


#### 3.5 shift()

- 参数： 无

- return: 返回被删除的元素

- function: 用于删除数组的第一个元素

- 调用方式: arr.shift();

- tip: 该方法会改变原数组, shift()方法可以遍历并清空一个数组。

- tip2: push()和shift()结合使用，就构成了“先进先出”的队列结构（queue）。


#### 3.6 unshift()

- 参数： 需要添加的元素

- return: 返回被添加新元素后的数组长度：length

- function: 用于在数组的第一个位置添加元素,可以接受多个参数，这些参数都会添加到目标数组头部

- 调用方式: arr.unshift(parameter1, parameter2,...,parameterN);

- tip: 该方法会改变原数组


#### 3.7 join()

- 参数： 分隔符

- return: string

- function: 以指定参数作为分隔符，将所有数组成员连接为一个字符串返回，如果不提供参数，默认用逗号分隔。

- 调用方式: arr.join();

- tip: 如果数组成员是undefined或null或空位，会被转成空字符串。

- tip2: 通过call方法，这个方法也可以用于字符串或类似数组的对象。


#### 3.8 concat()

- 参数： 需要添加的新数组

- return: new arr

- function: 用于多个数组的合并。它将新数组的成员，添加到原数组成员的后部

- 调用方式: originArr.concat(newArr1, newArr2,...,newArrN);

- tip: 原数组不变

- tip1: 除了数组作为参数，concat也接受其他类型的值作为参数，添加到目标数组尾部

- tip2: 如果数组成员包括对象，concat方法返回当前数组的一个浅拷贝


#### 3.9 reverse()

- 参数： 无

- return: 返回被改变后的原数组

- function: 用于颠倒排列数组元素

- 调用方式: arr.reverse();

- tip: 该方法会改变原数组


#### 3.10 slice()

- 参数： 起始位置(包含), 终止位置(不包含) 

- return: 一个新数组

- function: 用于提取目标数组的一部分

- 调用方式: arr.slice(startIndex, endIndex);

- tip: 原数组不变

- tip2: 如果省略第二个参数，则一直返回到原数组的最后一个成员。

- tip3: 没有参数，实际上等于返回一个原数组的拷贝

- tip4: 参数是负数，则表示倒数计算的位置, -2表示倒数计算的第二个位置，-1表示倒数计算的第一个位置

- tip5: 如果第一个参数大于等于数组长度，或者第二个参数小于第一个参数，则返回空数组

- tip6: slice()方法的一个重要应用，是将类似数组的对象转为真正的数组


#### 3.11 splice()

- 参数： 删除的起始位置, 被删除的元素个数, 插入数组的新元素s

- return: 返回被删除的元素

- function: 用于删除数组的第一个元素

- 调用方式: arr.splice(startindex, deleteNum, insertEles...);

- tip: 该方法会改变原数组 

- tip2: 起始位置如果是负数，就表示从倒数位置开始删除

- tip3: 如果只是单纯地插入元素，splice方法的第二个参数可以设为0，插入元素插入到参数1所提供的下标位置，其他元素后移

- tip4: 如果只提供第一个参数, 则会从指定位置删除到数组末


#### 3.12 sort()

- 参数：callback

- return: 被重新排序后的原数组

- function: 对数组成员进行排序, 默认按照字典顺序进行排序(ACSII码)

- 调用方式: arr.sort(callback(a, b));

- tip: 该方法会改变原数组

- tip2: callback(a, b) 接受两个参数，表示进行比较的两个数组成员

- tip3: callback(a, b) return 值 > 0 -> a 在 b 后面； return值 <= 0 a 在 b 前面

- tip4: callback(a, b) 应该返回数值，否则不同的浏览器可能有不同的实现，不能保证结果都一致
```js
[1, 2, 6, 0, 3, 8].sort((a, b) => a > b); // 不推荐
[1, 2, 6, 0, 3, 8].sort((a, b) => a - b); // 推荐
```

- 实例1： 按字节数排序
```js
var arr = [
  'jayden',
  'aleixs',
  'ai sayama',
  'elle',
  '波多野结衣',
  'white',
  'wicky',
  '黑池那智',
  'paul',
  '西野翔',
  'yui nikaido',
];

arr.sort((a, b) => {
  return getBytes(a) - getBytes(b);
});

console.log(arr);

function getBytes(str) {
  var bytes = str.length;

  for (var i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 255) {
      bytes++;
    }
  }
  return bytes;
}
```

实例2： 按大小排序
```js
var arr = [2, 1, 9, 5, 8, 3];

arr.sort((a, b) => {
  return a - b;
});

console.log(arr);
```

实例3： 按字符串长度排序
```js
var arrPorn = [
  'jayden',
  'aleixs',
  'ai sayama',
  'elle',
  '波多野结衣',
  'white',
  'wicky',
  '黑池那智',
  'paul',
  '西野翔',
  'yui nikaido',
];

arrPorn.sort((a, b) => {
  return a.length - b.length;
});

console.log(arrPorn);
```

实例4： 按年龄排序
```js
var arr = [
  {
    name: 'jayden',
    age: 28,
  },
  {
    name: 'lust',
    age: 40,
  },
  {
    name: 'alexis',
    age: 38,
  },
];

arr.sort((a, b) => {
  return a.age - b.age;
});

console.log(arr);
```


#### 3.13 map()

- 参数： callback, arr(用来绑定回调函数内部的this变量)

- return: new arr

- function: 将数组的所有成员依次传入参数函数，然后把每一次的执行结果组成一个新数组返回。

- 调用方式: arr.map(callback(elem [,index, arr]), thisArr)

- tip: 原数组不变

- tip2: callback: 有三个参数，elem为当前成员的值，index为当前成员的位置，arr为原数组

- tip3: map()方法还可以接受第二个参数，用来绑定回调函数内部的this变量

- tip4: 如果callback是使用箭头函数，会使tip3失效，因为箭头函数没有自身的this, 其所调用的this是箭头函数外部最近的一个this(比如function的this, 但是其包含了箭头函数)；也就是说如果map()的callback是箭头函数的话，callback内部的this其实是map()的this

- tip5: map()方法不会跳过undefined和null，但是会跳过空位。


#### 3.14 forEach()

- 参数： callback, arr(用来绑定回调函数内部的this变量)

- return: undefined

- function: 与map()方法很相似，也是对数组的所有成员依次执行参数函数。但是，forEach()方法不返回值，只用来操作数据

- 调用方式: arr.forEach(callback(elem [,index, arr]), thisArr)

- tip: 原数组不变

- tip2: 同map()

- tip3: 同map()

- tip4: 同map()

- tip5: 同map()

- tip6: 如果数组遍历的目的是为了得到返回值，那么使用map()方法，否则使用forEach()方法。

- tip7: forEach()方法无法中断执行，总是会将所有成员遍历完。如果希望符合某种条件时，就中断遍历，要使用for循环。


#### 3.15 filter()

- 参数： callback, arr(用来绑定回调函数内部的this变量)

- return: new arr

- function: 用于过滤数组成员，满足条件(callback返回Boolean值)的成员组成一个新数组返回。

- 调用方式: arr.filter(callback(elem [,index, arr]), thisArr)

- tip: 原数组不变

- tip2: 所有数组成员依次执行callback()，返回结果为true的成员组成一个新数组返回

- tip3: 其他tips同map()


#### 3.16 some()

- 参数： callback(返回Boolean值), arr(用来绑定回调函数内部的this变量)

- return: Boolean

- function: 类似“断言”（assert）,只要一个成员的返回值是true，则整个some方法的返回值就是true，否则返回false。

- 调用方式: arr.some(callback(elem [,index, arr]), thisArr)

- tip: 原数组不变

- tip2: 只要callback一个成员的返回值是true，则整个some方法的返回值就是true，否则返回false。

- tip3: 对于空数组，some方法返回false, 回调函数都不会执行。

- tip4: 其他tips同map()


#### 3.17 every()

- 参数： callback(返回Boolean值), arr(用来绑定回调函数内部的this变量)

- return: Boolean

- function: 类似“断言”（assert）,所有成员的返回值都是true，整个every方法才返回true，否则返回false。

- 调用方式: arr.every(callback(elem [,index, arr]), thisArr)

- tip: 原数组不变

- tip2: 所有成员的返回值都是true，整个every方法才返回true，否则返回false。

- tip3: 对于空数组，every方法返回true, 回调函数都不会执行。

- tip4: 其他tips同map()


#### 3.18 reduce()

- 参数： callback, prev

- return: 累计的一个值

- function: 依次处理数组的每个成员，最终累计为一个值返回

- 调用方式: arr.reduce(callback(prev, cur, [index, arr]), prev)

   - prev: 累积变量。第一次执行时，默认为数组的第一个成员；以后每次执行时，都是上一轮的返回值, callback执行arr.length - 1 次。如果reduce(callback, prev)提供了第二个参数, 这时cur是从数组的第一个成员开始遍历，参数函数会执行arr.length次。

   - cur: 当前变量。第一次执行时，默认为数组的第二个成员；以后每次执行时，都是下一个成员。如果reduce(callback, prev)提供了第二个参数, 这时cur是从数组的第一个成员开始遍历，参数函数会执行arr.length次

   - index: 当前位置。一个整数，表示第二个参数（当前变量）的位置，默认为1。

   - arr: 原数组。

- tip: 原数组不变

- tip2: 建议总是加上第二个参数，这样比较符合直觉，每个数组成员都会依次执行reduce()方法的参数函数。另外，第二个参数可以防止空数组报错。

- tip3: reduce()如果没有第二个参数，空数组调用为报错


#### 3.19 reduceRight()

- 同reduce() 

- reduce()方法和reduceRight它们的差别是，reduce()是从左到右处理（从第一个成员到最后一个成员），reduceRight()则是从右到左（从最后一个成员到第一个成员），其他完全一样。


#### 3.20 indexOf()

- 参数： ele startIndex(表示搜索的开始位置)

- return: index

- function: 返回给定元素在数组中第一次出现的位置，如果没有出现则返回-1

- 调用方式: arr.indexOf(ele, startIndex);

- tip: 原数组不变

- tip2: indexOf() 如果省略第二个参数，则默认从0位置开始搜索

- tip3: indexOf 和 lastIndexOf不能用来搜索NaN的位置，即它们无法确定数组成员是否包含NaN。因为这两个方法内部，使用严格相等运算符（===）进行比较，而NaN是唯一一个不等于自身的值。


#### 3.21 lastIndexOf()

- 参数： ele startIndex(表示搜索的开始位置)

- return: index

- function:  返回给定元素在数组中最后一次出现的位置，如果没有出现则返回-1。

- 调用方式: arr.lastIndexOf(ele, startIndex);

- tip: 原数组不变

- tip2: lastIndexOf() 如果省略第二个参数，则默认从0位置开始搜索

- tip3: indexOf 和 lastIndexOf不能用来搜索NaN的位置，即它们无法确定数组成员是否包含NaN。因为这两个方法内部，使用严格相等运算符（===）进行比较，而NaN是唯一一个不等于自身的值。


#### 3.16 链式使用

- 上面这些数组方法之中，有不少返回的还是数组，所以可以链式使用













