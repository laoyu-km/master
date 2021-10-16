## 语言的编译过程-I/O操作-node应用场景
1. 为什么说NODEJS 比 JAVA 高级

2. 语言解析步骤分为哪3个步骤，各个步骤执行什么操作

3. AST 是什么，全拼怎么写

4. 几种编程方式，在什么情况下说它们是同一门语言

5. 前端的对象是什么

6. NODEJS 和 JavaScript 是一种语言吗？为什么？

7. 什么是I/O

8. 什么是数据库，数据库的分类，各分类中比较常用的数据库有哪些

9. 数据库I/O是什么

10. I/O读写速度收什么影响比较大，内存和硬盘中的读写速度各是什么级别，

11. 什么是I/O模型， 阻塞I/O模型和非阻塞I/O模型的区别是什么？

12. 什么是异步非阻塞I/O模型

13. 服务器从服务侧重面看主要分那两种类型

14. I/O密集型和CPU密集型有什么不同，主要处理什么工作

15. node 是什么时候由谁编写发明的，为什么叫Node

16. 什么是单线程，前端单线程存在的问题是什么，如何解决

17. 后端单线程存在的问题是什么，Node是如何解决的，实际Node是单线程吗

18. Node使用什么来实现跨平台的使用

19. Node的作用主要提现在哪些方面


## commonJS-后端的分层
1. I/O密集型服务我们认为除了请求处理外，文件传输等过程是不占用CPU资源的

2. 什么是MVC模式，这三个部分是否分前后端处理

3. 什么出现后，前后端区分更明确

4. 新的前后端分层是怎么分的

5. nodejs 作为后端语言是如何进行模块管理的

6. CommonJS模块化规范主要内容

7. node.js 的全局对象是什么，如何查看和使用全局对象，如何定义全局对象

8. 为什么说node.js 一个文件就是一个模块，模拟其写法

9. 什么是REPL, 英文全屏是什么

10. node.js 中，模块加载的方式有哪几种？能够加载的模块文件类型有哪几种？

11. 如果在加载文件模块时，没有写文件的后缀名，node.js是如何来查找文件模块的

12. 在一个文件加载多次同样的模块，为什么只有一次有效

13. 文件引入模块的方法，举例说明

14. 什么是循环依赖，会产生什么问题，node.js是如何处理循环依赖的，其他语言又是如何处理循环依赖的

15. 为当前项目安装一个chalk模块，如何安装，如何引入

16. 为什么使用是使用核心模块的方式引入chalk，chalk的引入步骤是什么？

17. 为什么安装chalk时还安装了其他的包，老版本node和新版本node对这些包的处理有什么不同

18. 查看当前文件的module对象，熟悉module的每个字段的含义

19. 模块导出的几种方法

20. node主要对哪几种文件进行解析编译，解析编译方法是否相同，解析后如何处理

## package 与 npm

1. 包是什么

2. npm 是什么

3. commonjs 是什么

4. commonjs 的包规范是什么

5. package.json 在哪些地方有这个文件

6. package.json 必须要有的字段是哪些

7. package.json 中 dependencies 和 devDependencies 的区别

8. 版本号的的细节说明："[>=, ^, ~, <]2.1.3"

9. npm官网地址是什么，在不知道包名的情况下如何搜索包

10. npm 常用命令

11. npm 安装和卸载包命令的格式有什么不同，3个参数各代表什么意思

12. npm init -y 中 -y 代表什么意思

13. 如何在另一台机器上安装配置相同的npm

14. npm 安装工具有哪些

## buffer

1. buffer是什么，node中的buffer是什么

2. 字符集是什么， 字符编码是什么

3. utf-8, utf-16, utf-32 代表什么，2进制码如何表示，各自可用多少字节表示字符

4. JavaScript 默认的字符编码是什么

5. buffer 用来做什么，有什么特点，为什么length固定

6. 实例化buffer 的几种方法，各自特点是什么

7. npm 的哪个包可以增加字符编码，还有什么包

8. Buffer.from() - 有哪些参数类型，各自特点是什么，

9. buffer[index] 的使用，buffer的常用函数

10. buffer 的实际应用分段截取中文 "最爱看雪中悍刀行"
```js
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder();
const buf = Buffer.from('中文字符串');
for (let i = 0; i < buf.length; i += 5) {
    const b = Buffer.alloc(5);
    buf.copy(b, 0, i);
    console.log(decoder.write(b));
}
```

## path

17. node.js path模块 和 其常用函数

## events

18. node.js events模块-> 事件绑定，事件触发，

19. 事件触发有次数限制吗？ 能够传参吗

20. 前端事件和后端事件的不同

21. 什么是通用事件，通用事件举例(error) 通用事件的手动触发

22. 如何设置只响应一次的事件

23. 如何移除事件

24. 如何获取和设置linstener 的数量，默认listeners数量是多少

25. 为什么不要取名 newListener

26. 能注册多个同名事件吗？

## fs

26. node.js fs模块

27. 什么是错误优先原则，为什么要使用错误优先原则

28. fs方法中，同步方法和异步方法的区别

29. 文件的增删改查方法

30. 文件夹的增删改查方法

31. 文件监听函数，文件及文件夹监听函数，如何使


## process-node事件循环机制

1. node.js process 是什么

2. 为什么process不需要 require 就可以使用，还有哪个模块和它类似

3. process 常用方法： 

4. 如何判断process属于全局对象

5. 什么是宏任务和微任务

6. 哪些任务是宏任务，哪些任务是微任务

7. node事件循环的6个步骤是什么， 各个步骤执行哪些回调

8. node 轮询示例,下题打印的顺序是什么，为什么，如果放入一个I/O中呢？写代码证明
```js
setTimeout(console.log(1));
setImmidiate(console.log(2));
new Promise().resolve().then(()=>console.log(3));
process.nextTick(()=>console.log(4));
(()=>console.log(5))();
```

9. 轮询示例2， 下题在浏览器中的打印顺序是什么，在node中的顺序又是什么，为什么
```js
setTimeout(() => {
    console.log('timer1');
    Promise.resolve().then(() => {
        console.log('promises1');
    });
});

setTimeout(() => {
    console.log('timer2');
    Promise.resolve().then(() => {
        console.log('promise2')
    });
});
```

10. 举例说明为什么在插入代码时，setImmediate() 比 process.nextTick() 好

## net 模块

1. 5层网络协议是哪五层，各自的常用协议有哪些

2. TCP/IP 解构分几层，各自的常用协议有哪些

3. 如果前后端通讯时，要遵守什么协议，依照什么进行通讯

4. net模块主要处理什么工作

5. net模块扮演了哪两大角色

6. net扮演的两大角色中，各自常用的事件，属性和方式是什么，那些是重点

7. 客户端向服务端发送请求如果没有响应，有几种处理方法

8. net模块如何进行超时处理

9. 简单的服务器与浏览器交互演示
