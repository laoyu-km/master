# 01 语言的编译过程

## 什么是NodeJS

- Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.

### 特性

> Node.js 可以解析JS代码（没有浏览器安全级别的限制）提供很多系统级别的API，如：

- 文件的读写 (File System)
- 进程的管理 (Process)
- 网络通信 (HTTP/HTTPS)
- 等等……

<font color="red">** NodeJS 13 以后支持import方式引入模块**</font>

- 举例：

#### 1. 跨域安全级别限制

- 浏览器默认不支持跨域

```js
// 报错：'Access-Control-Allow-Origin' header is present on the requested resource.
const xhr = new XMLHttpRequest();

let url = 'https://www.baidu.com';

xhr.open('get', url, false);
xhr.send();
```

- node.js默认支持跨域

```js
const https = require('https');

https.get('https://www.baidu.com', (res) => {
  let resArr = [];
  res.on('data', (chunk) => {
    resArr.push(chunk);
  });

  res.on('end', () => {
    console.log(resArr.toString());
  });
});
```

#### 2. 文件读写

```js
const fs = require('fs');

fs.writeFile('./file.txt', 'Hello Kitty', (err, data) => {
  if (err) {
    throw new Error(err);
  } else {
    console.log('write file successful! ' + data);
  }
});

```

#### 3. 进程管理(Process)

```js
// process 可以不进行引入，直接调用
function main(argv) {
  console.log(argv)
}

main(process.argv.slice(2))

//运行 node ./nodetext.js argv1 argv2

```

#### 4. 网络通信(HTTP/HTTPS)

```js
const http = require('http');

http
  .createServer((request, response) => {
    let url = request.url;
    response.write(url);
    response.end(); // 如果不写浏览器会一直处于等待状态，等待服务器数据传输完成
  })
  .listen(8080, 'localhost', () => {
    console.log('服务器已启动');
  });

```


## NodeJS 比 Java 高级 
1. var 形参 undefined， 统一， function,执行

## 语言解析步骤
1. 词法分析(分词:tokenizing), 
2. 语法分析(parsing), 
3. 语义分析(代码生成)

### 词法分析 (分词：tokenizing)
1. 识别关键字：var function;
2. 标识符: var a = 1; function test(){};
3. 分界符: 划分界限的作用 () {}
4. 运算符：+ — * / ^ & | && || 

### 语法分析：
1. 树， 数组， 栈， 堆， [1,2,3,4,5]
2. 语法抽象树：(非线性解构) Abstract Syntax Tree -> AST

### 语义分析：
- AST -> (目标平台 -> 操作系统)可执行的二进制码(机器码)

> 前端的对象 --> 浏览器

### 何为同一种语言

- 公认词法分析，语法分析，语义分析 三个相同就是同一种语言

//=========================================

// NODEJS 和 JS 是一种语言吗？ -> 不是
// 词法分析和语法分析相同，但是语义分析不同，所以不是一种语言
// NODEJS 是运行在不同的操作系统上，在Windows 和 Linux 等系统上调用的API不同，所以它和JS不是同一种语言 -> 运行时不一样

// I/O --> input/output --> 硬盘中的输入和输出，内存中的输入和输出
// 关系型数据库 --> MySQL, 非关系型数据库 --> mongoDB(一半存硬盘，一半存内存), redis(存储到内存中)
// I/O --> 写入和读取数据库操作
// I/O 非常费时 内存 ns (纳秒) 10E-9s -- 硬盘(ram) ms 10E-3s
// 读写速度 内存 > 硬盘 -- 10E6倍
// 读写速度 内存GB/s(CPU 可执行30亿条指令) --- 硬盘MB/s

//阻塞I/O模型 : 等待的I/O完成才进行下一步操作
//非阻塞I/O模型 : 不等待的I/O完成就进行下一步操作
//异步非阻塞I/O模型 : 不等待的I/O完成才进行下一步操作 -- 异步方法

// I/O 密集 和 CPU 密集
// CPU密集: 压缩，解压，加密，解密，图形计算
// I/O密集：文件操作，http的网络操作，

// 2009.3 Ryan Dahl
// 为什么叫Node --> 一开始叫Web.js, 由于发展的好，成为了很多服务的中间节点概念的应用，所以就更名为Node

// 单线程：存在的问题
// 前端 -> DOM 冲突
// 后端 -> 
//1. 多核CPU性能浪费；node采用, cluster(集群),child_process来解决
//2.阻塞代码的运行; node采用 cluster,child_process来解决
//总结： node 是多线程 --> 但是只要一个主线程

// node 利用 libuv 来实现跨平台的使用 --> libuv 是一个C++编写的模块


// node 的作用
// 后端： Web层(高并发，高性能), 服务层(复杂的业务逻辑)，持久层(庞大的吞吐量)
// 随着发展，后端的Web层由前端来处理，前端处理Web层的最好的工具就是node
// 构建前端工具：webpack, glup, babel 等等
// 游戏向：pomelo(基于nodejs 的游戏框架)
// 云计算：AWS (微软采用nodejs开发的云计算平台)


//=========================================

// // nodejs CentOS8的安装
// mkdir /usr/software/nodejs
// wget https://nodejs.org/dist/v14.16.0/node-v14.16.0-linux-x64.tar.xz
// tar xf node-v16.16.0-linux-x64.tar.xz
// mv ./node-v14.16.0-linux-x64.tar.xz/*  /usr/software/nodejs/

// // 创建软连接
// ln -s /usr/software/nodejs/bin/npm   /usr/local/bin/ 
// ln -s /usr/software/nodejs/bin/node   /usr/local/bin/
// // 查看 node he  npm 
// node -v
// npm -v

// // 更改 npm 源
// npm install nrm -g
// ln -s /usr/software/nodejs/bin/nrm   /usr/local/bin/
// // 列出可用下载地址列表
// nrm ls
// // 切换npm下载源
// nrm use 下载源名称

// // npm 不按装nrm直接使用淘宝镜像
// npm install -g cnpm --registry=https://registry.npm.taobao.org