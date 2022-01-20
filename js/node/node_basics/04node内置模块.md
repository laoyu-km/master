# 常用内置模块

- node 调试： node --inspect --inspect-brk server.js

- 常用的内置模块：url, querystring, http, events, fs, stream, readline, crypto, zlib

## url

### parse

- url.parse(urlString[, parseQueryString[, slashesDenoteHost]])

```js
const url = require('url')
const urlString = 'https://www.baidu.com:443/ad/index.html?id=8&name=mouse#tag=110'
const parsedStr = url.parse(urlString)
console.log(parsedStr)
```

### format

- url.format(urlObject)

```js

const url = require('url')
const urlObject = {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'www.baidu.com:443',
  port: '443',
  hostname: 'www.baidu.com',
  hash: '#tag=110',
  search: '?id=8&name=mouse',
  query: { id: '8', name: 'mouse' },
  pathname: '/ad/index.html',
  path: '/ad/index.html?id=8&name=mouse',
  href: 'https://www.baidu.com:443/ad/index.html?id=8&name=mouse#tag=110'
}
const parsedObj = url.format(urlObject)
console.log(parsedObj)

```

### resolve

- url.resolve(from, to)

```js
const url = require('url')
var a = url.resolve('/one/two/three', 'four')
var b = url.resolve('http://example.com/', '/one')
var c = url.resolve('http://example.com/one', '/two')
console.log(a + "," + b + "," + c)

```

### URLSearchParams

- 浏览器对象也有这个方法

- new URLSearchParams()

```js
const { URL } = reuqire('url');

const urlStr = 'https://www.baidu.com:443/ad/index.html?id=8&name=mouse#tag=110';

const url = new URL(urlStr);

const newSearchParams = new URLSearchParams(url.searchParams);

console.log(newSearchParams);
```


## querystring

### parse

- querystring.parse(str[, sep[, eq[, options]]])

```js
const querystring = require('querystring')
var qs = 'x=3&y=4'
var parsed = querystring.parse(qs)
console.log(parsed)
```

### stringify

- querystring.stringify(obj[, sep[, eq[, options]]])

```js
const querystring = require('querystring')
var qo = {
  x: 3,
  y: 4
}
var parsed = querystring.stringify(qo)
console.log(parsed)

```

### escape/unescape

- escape: 编码 

- unescape: 解码

- querystring.escape(str)

```js
const querystring = require('querystring')
var str = 'id=3&city=北京&url=https://www.baidu.com'
var escaped = querystring.escape(str)
console.log(escaped)
querystring.unescape(str)
```

- querystring.unescape

```js
const querystring = require('querystring')
var str = 'id%3D3%26city%3D%E5%8C%97%E4%BA%AC%26url%3Dhttps%3A%2F%2Fwww.baidu.com'
var unescaped = querystring.unescape(str)
console.log(unescaped)
```

### 汇总示例

```js
const querystring = require('querystring');

var str = 'id=3&name=jayden&from=北京';
var str2 = 'id=4&name=alexis&from=北京';
var escapeQuery = 'id%3D5%26name%3Delle%26from%3D%E5%8C%97%E4%BA%AC';
var queryObj = { id: '2', name: 'wicky', from: '北京' };

console.log(querystring.parse(str));

console.log(querystring.escape(str));

console.log(querystring.unescape(escapeQuery));

console.log('str2', querystring.parse(str2, '/', ':'));

console.log(querystring.stringify(queryObj, '/', ':')); 

// 解决中文乱码
console.log(
  querystring.stringify(queryObj, null, null, {
    encodeURIComponent(string) {
      return querystring.unescape(string);
    },
  })
);
```

## http/https

### get

```js
var http = require('http')
var https = require('https')

// 1、接口 2、跨域
const server = http.createServer((request, response) => {
  var url = request.url.substr(1)

  var data = ''

  response.writeHeader(200, {
    'content-type': 'application/json;charset=utf-8', //默认是 text/html
    'Access-Control-Allow-Origin': '*'
  })

  https.get(`https://m.lagou.com/listmore.json${url}`, (res) => {

    res.on('data', (chunk) => {
      data += chunk
    }

    res.on('end', () => {
      response.end(JSON.stringify({
        ret: true,
        data
      }))
    })
  })

})

server.listen(8080, () => {
  console.log('localhost:8080')
})

```

### post：服务器提交（攻击）

> insomnia： 请求工具

```js
const https = require('https')
const querystring = require('querystring')

const postData = querystring.stringify({
  province: '上海',
  city: '上海',
  district: '宝山区',
  address: '同济支路199号智慧七立方3号楼2-4层',
  latitude: 43.0,
  longitude: 160.0,
  message: '求购一条小鱼',
  contact: '13666666',
  type: 'sell',
  time: 1571217561
})

const options = {
  protocol: 'https:',
  hostname: 'ik9hkddr.qcloud.la',
  method: 'POST',
  port: 443,
  path: '/index.php/trade/add_item',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
}

function doPost() {
  let data

  let req = https.request(options, (res) => {
    res.on('data', chunk => data += chunk)
    res.on('end', () => {
      console.log(data)
    })
  })

  req.write(postData)
  req.end()
}

// setInterval(() => {
//   doPost()
// }, 1000)
```

### 跨域：jsonp

- 常用的cdn: bootcdn

- jsonp: (JSON with Padding) 是 json 的一种"使用模式"，可以让网页从别的域名（网站）那获取资料，即跨域读取数据。 

- 利用浏览器可以跨域请求css, js, 图片，流媒体的特性实现跨域

- 临时打开前端服务器： npx http-server -p 9000

- 临时打开前端服务器且不设置缓存：npx http-server -p 9000 -c-1

```html
  <body>
    <h1>Jayden' home</h1>
    <script type="text/javascript">
      function getData(data) {
        let h1 = document.getElementsByTagName('h1')[0];
        h1.innerText = data;
      }

      function getFalse () {
        let h1 = document.getElementsByTagName('h1')[0];
        h1.innerText = '404 访问地址错误';
      }
    </script>
    <script type="text/javascript" src="http://localhost:8080/api/data?name=getData"></script>
  </body>
```

```js
// 后端代码, 使用url
```
const server = http.createServer();

server.on('request', (req, res) => {
  let urlStr = req.url;

  // // 新版url的URLSearchParams对象方法
  // let paramsStr = urlStr.split('?')[1];
  // // let urlObj = querystring.parse(paramsStr); // querystring是旧版，新版使用URLSearchParams
  // let urlObj = new url.URLSearchParams(paramsStr);
  // console.log(urlObj);

  // url旧版的parse()方法
  let strObj = url.parse(urlStr, true); // 第二参数true，然返回的对象的query属性也是一个对象

  if (strObj.pathname === '/api/data') {
    res.end(`${strObj.query.name}('Hello ALexis')`);
  } else {
    res.end('getFalse()');
  }
});

server.listen(8080, () => {
  console.log('localhost:8080');
});

```js
// 后端代码，不使用url模块

const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
  let urlStr = req.url;

  let urlArr = urlStr.split('?');

  if (urlArr[0] === '/api/data') {
    res.write(`${urlArr[1].split('=')[1]}('Hello Alexis')`);
    res.end();
  } else {
    res.end('false');
  }
});

server.listen(8080, () => {
  console.log('localhost:8080');
});
```

### 跨域：CORS

- Access-Control-Allow-Origin: '*'/'url'

```html
// 前端代码

<body>
 <h1>Jayden James</h1> 
 <script type="text/javascript">
  //  fetch('http://localhost:8080/api/data')
  //  .then(response => response.json())
  //  .then(res => console.log(res));

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log(xhr.response);
      }else {
        console.error(xhr.statusText);
      }
    }
  }
  xhr.open('get', 'http://localhost:8080/api/data', true);
  xhr.send(null);
 </script>
</body>
```
```js
// 后端代码

const http = require('http');

const server = http.createServer((req, res) => {
  let urlStr = req.url;
  console.log(urlStr);

  switch (urlStr) {
    case '/api/data':
      res.writeHead(200, {
        'content-type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      });
      res.end('{"id":"101", "name":"Jayden"}');
      break;
    default:
      res.writeHead(200, {
        'content-type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      });
      res.end('{"error": "wrong path"}');
      break;
  }
});

server.listen(8080, () => {
  console.log('localhost:8080');
});
```

### 跨域：middleware（http-proxy-middware）

- 代理： 将后端接口代理到前端

- npm install http-proxy-middware -S

```html
  <body>
    <h2>Jayden</h2>
    <script type="text/javascript">
      let url = 'http://localhost:8080/api/v1/entry/positionsearch/searchPosition/v2';
      let xhr = new XMLHttpRequest();

      xhr.addEventListener('readystatechange', () => {
        if(xhr.readyState === 4) {
          if(xhr.status === 200) {
            console.log(xhr.response);
          } else {
            console.error(xhr.statusText);
          }
        }
      });

      xhr.addEventListener('error', () => {
        console.error(xhr.statusText);
      });

      xhr.open('get', url, true);
      xhr.send(null);
    </script>
  </body>
```

```js
// 后端代码
const http = require('http');
const { createProxyMiddleware } = require('http-proxy-middleware');

const server = http.createServer((req, res) => {
  let url = req.url;

  if (/^\/api/.test(url)) {
    let apiProxy = createProxyMiddleware('/api', {
      target: 'https://gate.lagou.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    });

    res.writeHead(200, {
      'content-type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    });

    apiProxy(req, res);

    res.end('{"name": "alexis"}');
  } else {
    res.writeHead(200, {
      'content-type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    });

    res.end('{"error": "wrong path"}');
  }
});

server.listen(8080, () => {
  console.log('localhost:8080');
});
```

### 爬虫

```html
// 前端
  <body>
    <h2>Jayden James</h2>
    <script type="text/javascript">

      let url = 'http://localhost:8080/api';
      let xhr = new XMLHttpRequest();

      xhr.addEventListener('readystatechange', () => {
        if(xhr.readyState === 4) {
          if(xhr.status === 200) {
            console.log(JSON.parse(xhr.response));
          } else {
            console.error(xhr.statusText);
          }
        }
      });

      xhr.addEventListener('error', () => {
        console.error(xhr.statusText);
      });

      xhr.open('get', url, true);
      xhr.send(null);
    </script>
  </body>
```

```js
// 服务端
const http = require('http');
const https = require('https');
const cheerio = require('cheerio');

const server = http.createServer((req, response) => {
  let data = [];
  let resArr = [];

  https.get('https://www.meizu.com/', (res) => {
    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      const $ = cheerio.load(data);
      $('.index-center-wrapper img').each((index, el) => {
        resArr.push($(el).attr('data-src'));
      });

      response.writeHead(200, {
        'content-type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      });

      response.end(JSON.stringify(resArr));
    });
  });
});

server.listen(8080, () => {
  console.log('localhost:8080');
});
```


## Events

```js
const EventEmitter = require('events');

class MyEventEmitter extends EventEmitter {}

const event = new MyEventEmitter();

let i = 0;

event.on('mv', (name) => console.log(name));

event.on('mv', () => console.log('没有电影'));

event.once('weiya', () => console.log(++i));

event.emit('mv', '柯南');

event.emit('mv');

event.emit('weiya');
event.emit('weiya');
```


## File System

### 文件夹操作

- 创建文件夹
```js
fs.mkdir('./logs', (err) => {
  console.log('done.')
})
```

- 文件夹改名
```js
fs.rename('./logs', './log', () => {
  console.log('done')
})
```

- 删除文件夹
```js
fs.rmdir('./log', () => {
  console.log('done.')
})
```

- 读取文件夹
```js
fs.readdir('.logs', (err, data) => {
    console.log(data);
});
```

### 文件操作

```js
const fs = require('fs')
const fsP = require('fs').promises

```

- 写内容到文件里
```js
fs.writeFile(
  './logs/log1.txt',
  'hello',
  // 错误优先的回调函数
  (err) => {
    if (err) {
      console.log(err.message)
    } else {
      console.log('文件创建成功')
    }
  }
)

```

- 给文件追加内容
```js
fs.appendFile('./logs/log1.txt', '\nworld', () => {
  console.log('done.')
})
```

- 读取文件内容
```js
fs.readFile('./logs/log1.txt', 'utf-8', (err, data) => {
  console.log(data)
})
```

- 删除文件
```js
fs.unlink('./logs/log1.txt', (err) => {
  console.log('done.')
})

```

- 批量写文件
```js
for (var i = 0; i < 10; i++) {
  fs.writeFile(`./logs/log-${i}.txt`, `log-${i}`, (err) => {
    console.log('done.')
  })
}
```

- 读取文件/目录信息
```js
// callback 方法

const fs = require('fs');

function recursionDir(dir) {
  fs.readdir(dir, (err, res) => {
    if (err) {
      throw new Error(err);
    } else {
      res.forEach((item, index) => {
        fs.stat(dir + '/' + item, (err, res) => {
          if (err) {
            throw new Error(err);
          } else {
            if (res.isDirectory()) {
              recursionDir(dir + '/' + item);
            } else {
              fs.readFile(dir + '/' + item, 'utf-8', (err, data) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(data);
                }
              });
            }
          }
        });
      });
    }
  });
}
let dir = './js';
recursionDir(dir);
```

### 同步读取文件
```js
try {
  const content = fs.readFileSync('./logs/log-1.txt', 'utf-8')
  console.log(content)
  console.log(0)
} catch (e) {
  console.log(e.message)
}

console.log(1)

```

### 异步读取文件

- 异步读取文件：方法一
```js
fs.readFile('./logs/log-0.txt', 'utf-8', (err, content) => {
  console.log(content)
  console.log(0)
})
console.log(1)

```

- 异步读取文件：方法二
```js
fs.readFile('./logs/log-0.txt', 'utf-8').then(result => {
  console.log(result)
})

```

- 异步读取文件：方法三
```js
function getFile() {
  return new Promise((resolve) => {
    fs.readFile('./logs/log-0.txt', 'utf-8', (err, data) => {
      resolve(data)
    })
  })
}

;(async () => {
  console.log(await getFile())
})()

```

- 异步读取文件：方法四
```js
const fsp = fsP.readFile('./logs/log-1.txt', 'utf-8').then((result) => {
  console.log(result)
})

console.log(fsP)

```

###  watch / watchFile 监测文件变化

- watch 有系统平台要求

- watchFile 没有系统平台要求

- 优先使用watchFile

```js
fs.watch('./logs/log-0.txt', () => {
  console.log(0)
})

```

### Stream

-  readStream & writeStream

```js
const fs = require('fs')

const readstream = fs.createReadStream('./note.txt')
const writestream = fs.createWriteStream('./note2.txt')

writestream.write(readstream)

```

### Zlib
```js
const fs = require('fs');
const zlib = require('zlib');

const gzip = zlib.createGzip();

const readStream = fs.createReadStream('./read.txt');
const writeStream = fs.createWriteStream('./write.txt');

//readStream.pipe(writeSteam) // 直接将readStream 写入 writeStream

readStream
  .pipe(gzip) // 压缩
  .pipe(writeStream); //执行writeStream写入
```

### ReadLine
```js
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('What do you think of Node.js? ', (answer) => {
  // TODO: Log the answer in a database
  console.log(`Thank you for your valuable feedback: ${answer}`)

  rl.close()
})
```

### Crypto

#### 简单实现加密

```js
const crypto = require('crypto');

let password = 'laoyu';

let ps = crypto
  .Hash('sha1') // 设置加密算法 sha1, md5, sha256
  .update(password) // 被编码的数据 password
  .digest('hex'); // 返回值的编码16进制

console.log(ps);
```

#### 加密

- 使用 Cipher 对象作为流
```js
const crypto = require('crypto');

const algorithm = 'aes-128-cbc-hmac-sha1';

const password = 'Jayden James';

const str = 'elle has a big button';

// cryto.scrypt 基于密码的密钥派生函数
crypto.scrypt(password, 'salt', 16, (err, key) => {
  // const iv = crypto.randomBytes(16); -> 建议使用
  // const iv = Buffer.alloc(16, 0);
  const iv = '1111111111111111'; // 测试用

  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = '';

  cipher.on('readable', () => {
    let chunk;
    while (null !== (chunk = cipher.read())) {
      encrypted += chunk.toString('hex');
    }
  });

  cipher.on('end', () => {
    console.log(encrypted);
  });

  cipher.write(str);
  cipher.end();
});
```

- 使用Cipher和管道流

```js
const crypto = require('crypto');
const fs = require('fs');

const algorithm = 'aes-128-cbc-hmac-sha1';

const password = 'I like Jayden James';

crypto.scrypt(password, 'salt', 16, (err, deriveKey) => {
  const iv = 'jaydenjamesalexi';

  const cipher = crypto.createCipheriv(algorithm, deriveKey, iv);

  const input = fs.createReadStream('./read.txt');
  const output = fs.createWriteStream('./write.txt');

  input.pipe(cipher).pipe(output); // 将input中的内容经过cipher处理后输出到output
});
```

- 使用 cipher.update() 和 cipher.final() 方法：

```js
const crypto = require('crypto');
const fs = require('fs');
const { resolve } = require('path');

const path = resolve(__dirname, 'read.bak.txt');

const algorithm = 'aes-128-cbc-hmac-sha1';

const password = 'Jayden James';

function createSipher(passwd, callback) {
  crypto.scrypt(password, 'alexis', 16, (err, deriveKey) => {
    const iv = '1111111111111111'; // 16位

    const cipher = crypto.createCipheriv(algorithm, deriveKey, iv);

    let encrypted = cipher.update(passwd, 'utf-8', 'hex');

    encrypted += cipher.final('hex'); //final('hex') 必须加载在第一个

    callback(encrypted);
  });
}

function cipherReadInFile(passwd) {
  createSipher(passwd, (res) => {
    fs.appendFile(path, res + '\n', (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('done');
      }
    });
  });
}

cipherReadInFile('elle test');
```


#### 解密

- 解密必须保证 password, algorithm, salt, iv 必须与加密一致，否则解密错误

- decipher 作为流对象

```j
const crypto = require('crypto');

const algorithm = 'aes-128-cbc-hmac-sha1';

const password = 'Jayden James';

crypto.scrypt(password, 'salt', 16, (err, deriveKey) => {
  if (err) {
    throw new Error(err);
  }

  const iv = 'aaaaaaaaaaaaaaaa';

  const decipher = crypto.createDecipheriv(algorithm, deriveKey, iv);

  let decrypted = '';

  decipher.on('readable', () => {
    while (null !== (chunk = decipher.read())) {
      decrypted += chunk.toString('utf-8');
    }
  });

  decipher.on('end', () => {
    console.log(decrypted);
  });

  const encrypted = 'd6018771ffc89d8f08cab0c94cb477f5';

  decipher.write(encrypted, 'hex');
  decipher.end();
});
```

- 使用 Decipher 和管道流

```js
const crypto = require('crypto');
const fs = require('fs');

const algorithm = 'aes-128-cbc-hmac-sha1';

const password = 'Jayden James';

crypto.scrypt(password, 'salt', 16, (err, deriveKey) => {
  if (err) console.log(err);

  const iv = 'aaaaaaaaaaaaaaaa';

  const decipher = crypto.createDecipheriv(algorithm, deriveKey, iv);
  const input = fs.createReadStream('./read.txt');
  const output = fs.createWriteStream('./write.txt');

  input.pipe(decipher).pipe(output);
});
```

- 使用 decipher.update() 和 decipher.final() 方法：
```js
const crypto = require('crypto');
const fs = require('fs');

const password = 'Jayden James';
const algorithm = 'aes-128-cbc-hmac-sha1';

function createDecipher(encrypted, callback) {
  crypto.scrypt(password, 'salt', 16, (err, deriveKey) => {
    const iv = 'aaaaaaaaaaaaaaaa';

    const decipher = crypto.createDecipheriv(algorithm, deriveKey, iv);

    let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');

    callback && callback(decrypted);
  });
}

function decipherToFile(filePath, encrypted, callback) {
  createDecipher(encrypted, (res) => {
    fs.appendFile(filePath, '\n' + res + '\n', 'utf-8', (err) => {
      if (err) throw new Error(err);

      callback && callback();
    });
  });
}

fs.readFile('./read.txt', 'utf-8', (err, data) => {
  if (err) console.log(err);

  let dataArr = data.replace(/\n$/, '').split('\n');

  let encrypted = dataArr[dataArr.length - 1];

  decipherToFile('./write.txt', encrypted, () => {
    console.log('write is ok');
  });
});

```















