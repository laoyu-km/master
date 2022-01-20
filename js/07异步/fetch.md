# fetch

- fetch()是 XMLHttpRequest 的升级版，用于在 JavaScript 脚本里面发出 HTTP 请求。

- 浏览器原生提供这个对象。



## 一、基本用法

- fetch()的功能与 XMLHttpRequest 基本相同，但有三个主要的差异。

   1. fetch()使用 Promise，不使用回调函数，因此大大简化了写法，写起来更简洁。
   
   2. fetch()采用模块化设计，API 分散在多个对象上（Response 对象、Request 对象、Headers 对象），更合理一些；相比之下，XMLHttpRequest 的 API 设计并不是很好，输入、输出、状态都在同一个接口管理，容易写出非常混乱的代码。
    
   3. fetch()通过数据流（Stream 对象）处理数据，可以分块读取，有利于提高网站性能表现，减少内存占用，对于请求大文件或者网速慢的场景相当有用。XMLHTTPRequest 对象不支持数据流，所有的数据必须放在缓存里，不支持分块读取，必须等待全部拿到后，再一次性吐出来。

- 在用法上，fetch()接受一个 URL 字符串作为参数，默认向该网址发出 GET 请求，返回一个 Promise 对象。它的基本用法如下。

```js
  <body>
    <div class="app">
      <h3>Jayden James</h3>
    </div>
    <script type="text/javascript">
      fetch('http://localhost:8080/pi/alexis')
      .then(response => response.json()) // json函数决定了response放回的结果必须是json格式，否则报错
      .then((res) => console.log(res));
    </script>
  </body>
```

- Promise 可以使用 await 语法改写，使得语义更清晰。
```js
  <body>
    <script type="text/javascript">
      let url = 'http://localhost:8080/api/data';

      async function fetchJson (url) {
        const response = await fetch(url);
        const result = await response.json();
        return result;
      }

      fetchJson(url).then(res => console.log(res));
    </script>
  </body>
```

