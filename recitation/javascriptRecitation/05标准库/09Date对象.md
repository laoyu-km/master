# Date对象

## 普通函数的用法

- Date对象可以作为普通函数直接调用，返回一个代表当前时间的字符串
  ```js
  Date(); //Wed May 11 2022 18:11:08 GMT+0800 (中国标准时间)
  ```

- 即使带有参数，Date作为普通函数使用时，返回的还是当前时间

## 构造函数的用法

- new Date();

- 不加参数，实例代表的就是当前时间

- Date实例有一个独特的地方。其他对象求值的时候，都是默认调用.valueOf()方法, 默认调用的是toString()方法。这导致对Date实例求值，返回的是一个字符串，代表该实例对应的时间

- 参数为时间零点开始计算的毫秒数: `new Date(1378218728000)`

- 参数为日期字符串: `new Date('January 6, 2022')`

- 参数为多个整数: `new Date(2022, 5, 11, 0, 0, 0, 0) // 代表年、月、日、小时、分钟、秒、毫秒`

- 参数可以是负整数，代表1970年元旦之前的时间

- 只要是能被Date.parse()方法解析的字符串，都可以当作参数

  - `new Date('2013-2-15')`
  - `new Date('2013/2/15')`
  - `new Date('02/15/2013')`
  - `new Date('2013-FEB-15')`
  - `new Date('FEB, 15, 2013')`
  - `new Date('FEB 15, 2013')`
  - `new Date('February, 15, 2013')`
  - `new Date('February 15, 2013')`
  - `new Date('15 Feb 2013')`
  - `new Date('15, February, 2013')`

- 参数为年、月、日等多个整数时，年和月是不能省略的，其他参数都可以省略的。也就是说，这时至少需要两个参数，因为如果只使用“年”这一个参数，Date会将其解释为毫秒数

- 各个参数的取值范围如下年：
 
  - 使用四位数年份，比如2000。如果写成两位数或个位数，则加上1900，即10代表1910年。如果是负数，表示公元前。
  - 月：0表示一月，依次类推，11表示12月。
  - 日：1到31。
  - 小时：0到23。
  - 分钟：0到59。
  - 秒：0到59
  - 毫秒：0到999。

- 这些参数如果超出了正常范围，会被自动折算。比如，如果月设为15，就折算为下一年的4月。

- 参数还可以使用负数，表示扣去的时间

## 日期的运算

- 类型自动转换时，Date实例如果转为数值，则等于对应的毫秒数

- 如果转为字符串，则等于对应的日期字符串

- 两个日期实例对象进行减法运算时，返回的是它们间隔的毫秒数；进行加法运算时，返回的是两个字符串连接而成的新字符串。

## 静态方法

### Date.now()

- 有无参数都返回当前时间距离时间零点（1970年1月1日 00:00:00 UTC）的毫秒数，相当于 Unix 时间戳乘以1000。


  ```js
  Date.now(); //1652269030179
  ```

### Date.parse()

- 用来解析日期字符串，返回该时间距离时间零点（1970年1月1日 00:00:00）的毫秒数。

- 日期字符串应该符合 RFC 2822 和 ISO 8061 这两个标准，即YYYY-MM-DDTHH:mm:ss.sssZ格式，其中最后的Z表示时区。但是，其他格式也可以被解析，

- 如果解析失败，返回NaN `Date.parse('jayden'); // NaN`

### Date.UTC()

- 接受年、月、日等变量作为参数，返回该时间距离时间零点（1970年1月1日 00:00:00 UTC）的毫秒数

- UTC: 世界标准时间

- 格式: `Date.UTC(year, mouth[, date[, hrs[, min[, sec[, ms]]]]])`

- 该方法的参数用法与Date构造函数完全一致，比如月从0开始计算，日期从1开始计算

- 区别在于Date.UTC方法的参数，会被解释为 UTC 时间（世界标准时间），Date构造函数的参数会被解释为当前时区的时间。

## 实例方法

- Date的实例对象，有几十个自己的方法，除了valueOf和toString，可以分为以下三类

- to类: 从Date对象返回一个字符串，表示指定的时间

- get类: 获取Date对象的日期和时间

- set类:  设置Date对象的日期和时间

### Date.prototype.valueOf()

- 返回实例对象距离时间零点（1970年1月1日00:00:00 UTC）对应的毫秒数，该方法等同于getTime方法

- 预期为数值的场合，Date实例会自动调用该方法，所以可以用下面的方法计算时间的间隔(调用valueOf())

  ```js
  var sart = new Date();
  setTimeout = (() => {
    var end = new Date();
    console.log(end - start); //201
  }, 200);
  ```

### to 类方法

- Date.protype.toString(): 返回一个完整的日期字符串, 因为toString是默认的调用方法，所以如果直接读取Date实例，就相当于调用这个方法

- Date.prototype.toUTCString(): 方法返回对应的 UTC 时间，也就是比北京时间晚8个小时

- Date.prototype.toISOString(): 返回对应时间的 ISO8601 写法, 返回的总是 UTC 时区的时间

- Date.prototype.toJSON(): 返回一个符合 JSON 格式的 ISO 日期字符串，与toISOString方法的返回结果完全相同

- Date.prototype.toDateString(): 返回日期字符串（不含小时、分和秒）

- Date.prototype.toTimeString(): 返回时间字符串（不含年月日）

#### 本地时间

- Date.prototype.toLocaleString([locales[, options]]): 完整的本地时间

- Date.prototype.toLocaleDateString([locales[, options]]): 本地日期（不含小时、分和秒）

- Date.prototype.toLocaleTimeString([locales[,options]]): 本地时间（不含年月日）

- locales是一个指定所用语言的字符串，options是一个配置对象

- locales: 'en-US', 'zh-CN'

- options 配置对象有以下属性

  - dateStyle：可能的值为full、long、medium、short。
  - timeStyle：可能的值为full、long、medium、short。
  - month：可能的值为numeric、2-digit、long、short、narrow。
  - year：可能的值为numeric、2-digit。
  - weekday：可能的值为long、short、narrow。
  - day、hour、minute、second：可能的值为numeric、2-digit。
  - timeZone：可能的值为 IANA 的时区数据库。
  - timeZoneName：可能的值为long、short。
  - hour12：24小时周期还是12小时周期，可能的值为true、false。

### get 类方法

- getTime()：返回实例距离1970年1月1日00:00:00的毫秒数，等同于valueOf方法。

- getDate()：返回实例对象对应每个月的几号（从1开始）。

- getDay()：返回星期几，星期日为0，星期一为1，以此类推。

- getFullYear()：返回四位的年份。

- getMonth()：返回月份（0表示1月，11表示12月）。

- getHours()：返回小时（0-23）。

- getMilliseconds()：返回毫秒（0-999）。

- getMinutes()：返回分钟（0-59）。

- getSeconds()：返回秒（0-59）。

- getTimezoneOffset()：返回当前时间与 UTC 的时区差异，以分钟表示，返回结果考虑到了夏令时因素。

- 所有这些get*方法返回的都是整数，不同方法返回值的范围不一样

  - 分钟和秒：0 到 59
  - 小时：0 到 23
  - 星期：0（星期天）到 6（星期六）
  - 日期：1 到 31
  - 月份：0（一月）到 11（十二月）

- 计算本年度还剩几天

  ```js
  function leftDays() {
    var today = new Date();
    var endYear = new Date(toDay.getFullYear(), 11, 31, 23, 59, 59, 999);
    var msPerDay = 24 * 60 * 60 * 1000;
    return Math.round((endYear.getTime() - today.getTime()) / msPerDay);
  }
  ```

- 这些get*方法返回的都是当前时区的时间，Date对象还提供了这些方法对应的 UTC 版本，用来返回 UTC 时间。

  - getUTCDate()
  - getUTCFullYear()
  - getUTCMonth()
  - getUTCDay()
  - getUTCHours()
  - getUTCMinutes()
  - getUTCSeconds()
  - getUTCMilliseconds()

### set 类方法

- Date对象提供了一系列set*方法，用来设置实例对象的各个方面

- setDate(date)：设置实例对象对应的每个月的几号（1-31），返回改变后毫秒时间戳。

- setFullYear(year [, month, date])：设置四位年份。

- setHours(hour [, min, sec, ms])：设置小时（0-23）。

- setMilliseconds()：设置毫秒（0-999）。

- setMinutes(min [, sec, ms])：设置分钟（0-59）。

- setMonth(month [, date])：设置月份（0-11）。

- setSeconds(sec [, ms])：设置秒（0-59）。

- setTime(milliseconds)：设置毫秒时间戳。

- 这些方法基本是跟get*方法一一对应的，但是没有setDay方法，因为星期几是计算出来的，而不是设置的。另外，需要注意的是，凡是涉及到设置月份，都是从0开始算的，即0是1月，11是12月。

- set*方法的参数都会自动折算。以setDate()为例，如果参数超过当月的最大天数，则向下一个月顺延，如果参数是负数，表示从上个月的最后一天开始减去的天数

- set类方法和get类方法，可以结合使用，得到相对时间

  ```js
  var today = new Date();

  today.setDate(today.getDate() + 100);
  today.setHours(today.getHours() + 6);
  today.setFullYear(today.getFullYear() -1);
  ```

- set*系列方法除了setTime()，都有对应的 UTC 版本，即设置 UTC 时区的时间

  - setUTCDate()
  - setUTCFullYear()
  - setUTCHours()
  - setUTCMilliseconds()
  - setUTCMinutes()
  - setUTCMonth()
  - setUTCSeconds()
