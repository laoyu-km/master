# JSON 格式

## JSON格式

- JSON 格式（JavaScript Object Notation 的缩写）是一种用于数据交换的文本格式

- 相比 XML 格式，JSON 格式有两个显著的优点：书写简单，一目了然；符合 JavaScript 原生语法，可以由解释引擎直接处理，不用另外添加解析代码。

- 每个 JSON 对象就是一个值，可能是一个数组或对象，也可能是一个原始类型的值。总之，只能是一个值，不能是两个或更多的值

- JSON 对值的类型和格式有严格的规定

  - 复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象。

  - 原始类型的值只有四种：字符串、数值（必须以十进制表示）、布尔值和null（不能使用NaN, Infinity, -Infinity和undefined）。

  - 字符串必须使用双引号表示，不能使用单引号。

  - 对象的键名必须放在双引号里面。

  - 数组或对象最后一个成员的后面，不能加逗号。

- 合法JSON示例

  ```js
  ["one", "two", "three"]

  { "one": 1, "two": 2, "three": 3 }

  {"names": ["张三", "李四"] }

  [ { "name": "张三"}, {"name": "李四"} ]
  ```

- 不合法JSON示例

  ```js
  { name: "张三", 'age': 32 }  // 属性名必须使用双引号

  [32, 64, 128, 0xFFF] // 不能使用十六进制值

  { "name": "张三", "age": undefined } // 不能使用 undefined

  { "name": "张三",
    "birthday": new Date('Fri, 26 Aug 2011 07:13:10 GMT'),
    "getName": function () {
        return this.name;
    }
  } // 属性值不能使用函数和日期对象
  ```

- null、空数组和空对象都是合法的 JSON 值

## JSON 对象

- JSON对象是 JavaScript 的原生对象，用来处理 JSON 格式数据。它有两个静态方法：JSON.stringify()和JSON.parse()

## JSON.Stringify()

### 基本用法

- SON.stringify()方法用于将一个值转为 JSON 字符串。该字符串符合 JSON 格式，并且可以被JSON.parse()方法还原

  ```js
  JSON.stringify(1) // "1"
  JSON.stringify(false) // "false"
  JSON.stringify([]) // "[]"
  JSON.stringify({}) // "{}"

  JSON.stringify([1, "false", false])
  // '[1,"false",false]'

  JSON.stringify({ name: "张三" })
  // '{"name":"张三"}'
  ```

- 对于原始类型的字符串，转换结果会带双引号

  ```js
  SON.stringify('foo') === "foo" // false
  JSON.stringify('foo') === "\"foo\"" // true

  JSON.stringify(false) // "false"
  JSON.stringify('false') // "\"false\""
  ```

- 如果对象的属性是undefined、函数或 XML 对象，该属性会被JSON.stringify()过滤

  ```js
  var obj = {
    a: undefined,
    b: function () {}
  };

  JSON.stringify(obj) // "{}"
  ```

- 如果数组的成员是undefined、函数或 XML 对象，则这些值被转成null

  ```js
  var arr = [undefined, function () {}];
  JSON.stringify(arr) // "[null,null]"
  ```

- 正则对象会被转成空对象

  ```js
  JSON.stringify(/foo/) // "{}"
  ```

- JSON.stringify()方法会忽略对象的不可遍历的属性

### 第二个参数

- JSON.stringify()方法还可以接受一个数组，作为第二个参数，指定参数对象的哪些属性需要转成字符串

  ```js
  var obj = {
    'prop1': 'value1',
    'prop2': 'value2',
    'prop3': 'value3'
  };

  var selectedProperties = ['prop1', 'prop2'];

  JSON.stringify(obj, selectedProperties)
  // "{"prop1":"value1","prop2":"value2"}"
  ```

- 这个类似白名单的数组，只对对象的属性有效，对数组无效

- 第二个参数还可以是一个函数，用来更改JSON.stringify()的返回值

  ```js
  function fn(key, value) {
    if(typeof value === 'number') {
      return 2 * value;
    }
    return value;
  }

  JSON.stringify({a:1, b:1});
  // '{"a":2, "b":4}'
  ```

- 这个处理函数是递归处理所有的键

  ```js
  function fn(key, value) {
    console.log("[" + key +"]: " + value);
    return value;
  }

  var obj = {a: {b: 1}};

  JSON.stringify(obj, fn);
  // []:[object Object]
  // [a]:[object Object]
  // [b]:1
  // '{"a":{"b":1}}'
  ```

- 递归处理中，每一次处理的对象，都是前一次返回的值

  ```js
  function fn(key, value) {
    if(typeof value === 'object') {
      return {b: 2};
    }
    return value * 2;
  }

  var obj = {a: 1};

  JSON.stringify(obj, fn);
  // "{"b": 4}"
  ```

- 如果处理函数返回undefined或没有返回值，则该属性会被忽略

  ```js
  function fn (key, value) {
    if(typeof value === 'string'){
      return undefined;
    }
    return value;
  } 

  JSON.stringify({a: 'jayden', b: 123}, fn);
  // '{"b": 123}'
  ```

### 第三个参数

- JSON.stringify()还可以接受第三个参数，用于增加返回的 JSON 字符串的可读性

- 第三个参数使得每个属性单独占据一行，并且将每个属性前面添加指定的前缀（不超过10个字符）

  ```js
  / 默认输出
  JSON.stringify({ p1: 1, p2: 2 })
  // JSON.stringify({ p1: 1, p2: 2 })

  // 分行输出
  JSON.stringify({ p1: 1, p2: 2 }, null, '\t')
  // {
  // 	"p1": 1,
  // 	"p2": 2
  // }
  ```

- 第三个属性如果是一个数字，则表示每个属性前面添加的空格（最多不超过10个）

  ```js
  JSON.stringify({ p1: 1, p2: 2 }, null, 2);
  /*
  "{
    "p1": 1,
    "p2": 2
  }"
  */
  ```

### 参数对象的 toJSON() 方法

- 如果参数对象有自定义的toJSON()方法，那么JSON.stringify()会使用这个方法的返回值作为参数，而忽略原对象的其他属性

- 下面是一个普通的对象

  ```js
  var user = {
    firstName: '三',
    lastName: '张',

    get fullName(){
      return this.lastName + this.firstName;
    }
  };

  JSON.stringify(user)
  // "{"firstName":"三","lastName":"张","fullName":"张三"}"
  ```

- 现在，为这个对象加上toJSON()方法

  ```js
  var user = {
    firstName: '三',
    lastName: '张',

    get fullName(){
      return this.lastName + this.firstName;
    },

    toJSON: function () {
      return {
        name: this.lastName + this.firstName
      };
    }
  };

  JSON.stringify(user)
  // "{"name":"张三"}"
  ```

- Date对象就有一个自己的toJSON()方法

  ```js
  var date = new Date('2015-01-01');
  date.toJSON() // "2015-01-01T00:00:00.000Z"
  JSON.stringify(date) // ""2015-01-01T00:00:00.000Z"
  ```

- oJSON()方法的一个应用是，将正则对象自动转为字符串。因为JSON.stringify()默认不能转换正则对象，但是设置了toJSON()方法以后，就可以转换正则对象了

  ```js
  var obj = { reg: /foo/ }

  // 不设置 toJSON 方法时
  JSON.stringify(obj); // '{"reg": {}}'

  // 设置 toJSON 方法
  RegExp.prototype.toJSON = RegExp.prototype.toString;
  JSON.stringify(obj); // '{"reg": "/foo/"}'
  ```

## JSON.parse()

- JSON.parse()方法用于将 JSON 字符串转换成对应的值

  ```js
  JSON.parse('{}') // {}
  JSON.parse('true') // true
  JSON.parse('"foo"') // "foo"
  JSON.parse('[1, 5, "false"]') // [1, 5, "false"]
  JSON.parse('null') // null

  var o = JSON.parse('{"name": "张三"}');
  o.name // 张三
  ```

- 如果传入的字符串不是有效的 JSON 格式，JSON.parse()方法将报错, 为了处理解析错误，可以将JSON.parse()方法放在try...catch代码块中

  ```js
  try {
    JSON.parse("'jayden'");
  } catch {
    console.log('JSON parsing wrong');
  }
  console.log('done');
  // JSON parsing wrong
  ```

- JSON.parse()方法可以接受一个处理函数，作为第二个参数，用法与JSON.stringify()方法类似

- 解析方向以stirngify方向相反，由内而外

  ```js
  function fn(key, value) {
    if (key === 'a') {
      return value + 10;
    }
    return value;
  }
  
  JSON.parse('{"a": 1, "b": 2}', fn);
  // {a: 11, b: 2}
  ```