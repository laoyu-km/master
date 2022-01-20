# nodejs get online file

## nodejs get gzip file online

- m3u8文件为例 url="https://hls1.gslb.ru/hls/Cen/DKTM-027.mp4/index.m3u8"

1. 使用fs.readFile无效，不是有效的文件路径

```js
// 路径不能使用url
fs.readFile(urlM3u8, 'utf-8', (err, data) => {
  err ? console.log(err) : console.log(data);
});

```

2. 使用http.get方法获得的还是乱码

3. 发现请求后的头文件中有'content-encoding': 'gzip'
```js
console.log(JSON.stringify(rse.headers));
```

4. 引入zlib模块，调用zlib.gunzip() 对服务器返回的流数据进行解压后获得最终结果
```js
const http = require('https');
const fs = require('fs');
const zlib = require('zlib');

let urlM3u8 = 'https://hls1.gslb.ru/hls/Cen/DKTM-027.mp4/index.m3u8';
let url2 = 'https://hls1.gslb.ru/hls/Cen/DKTM-027.mp4/cdn-1-v1-a1.ts';
let data;
let gzipData;

http.get(urlM3u8, (res) => {
  res.on('data', (chunk) => {
    gzipData = chunk;
  });

  res.on('end', () => {
    zlib.gunzip(gzipData, (err, buf) => {
      if (err) throw new Error(err);

      data = buf.toString().replace(/^#.+\n/gm, '');

      fs.writeFile('./dk.m3u8', data, (err) => {
        if (err) throw new Error(err);
        console.log('done');
      });
    });
  });
});
```

## buffer 类型写入文件，依然可用
```js
const https = require('https');
const fs = require('fs');
const { Buffer } = require('buffer');

let urlM3u8 = 'https://hls1.gslb.ru/hls/Cen/DKTM-027.mp4/index.m3u8';
let url = urlM3u8.replace(/\w+\.m3u8/, '');
let arr = [];
let buffer = new Buffer.from('');

fs.readFile('./dk.m3u8', 'utf-8', (err, data) => {
  if (err) throw new Error(err);
  arr = data.replace(/\n$/, '').split('\n');

  https.get(url + arr[6], (res) => {
    res.on('data', (chunk) => {
      // console.log(Buffer.isBuffer(chunk));
      buffer = Buffer.concat([buffer, chunk]);
    });

    res.on('end', () => {
      console.log('done');

      fs.writeFile('./dk.ts', buffer, (err) => {
        err ? console.log(err) : console.log('done');
      });
    });
  });
});
```

## 可读，可写流下载ts文件

- 方式1
```js
const https = require('https');
const fs = require('fs');
const { Readable } = require('stream');

let urlM3u8 = 'https://hls1.gslb.ru/hls/Cen/DKTM-027.mp4/index.m3u8';
let url = urlM3u8.replace(/\w+\.m3u8/, '');
let arr = [];

const inStream = new Readable({
  read() {},
});

const outStream = fs.createWriteStream('./dk.ts');

fs.readFile('./dk.m3u8', 'utf-8', (err, data) => {
  if (err) throw new Error(err);
  arr = data.replace(/\n$/, '').split('\n');
  https.get(url + arr[100], (res) => {
    console.log(res.statusCode);

    res.on('data', (chunk) => {
      inStream.push(chunk);
    });

    res.on('end', () => {
      inStream.push(null);
      inStream.pipe(outStream);
      console.log('done');
    });
  });
});
```

## 下载.m3u8中的所有文件

- version 1.0.0
```js
const https = require('https');
const fs = require('fs');
const { Readable } = require('stream');

let urlM3u8 = 'https://hls1.gslb.ru/hls/Cen/DKTM-027.mp4/index.m3u8';
let url = urlM3u8.replace(/\w+\.m3u8/, '');
let arr = [];

fs.readFile('./dk.m3u8', 'utf-8', (err, data) => {
  if (err) throw new Error(err);
  arr = data.replace(/\n$/, '').split('\n');
  let i = 395;
  let arrLen = arr.length - i;

  let timer = setInterval(() => {
    let wStream = fs.createWriteStream(
      './movie/' + arr[i].split('-')[1] + '.ts'
    );
    https.get(url + arr[i], (res) => {
      res.pipe(wStream);

      res.on('end', () => console.log(i + ' : ' + arrLen));
    });
    i++;
    arrLen--;

    if (arrLen <= 0) {
      clearInterval(timer);
    }
  }, 5000);

  // // 连接速度过快会造成服务器端提前断开链接
  // for (let i = 0; i < arr.length; i++) {
  //   https.get(url + arr[i], (res) => {
  //     if (res.statusCode !== 200) {
  //       fs.appendFile(
  //         './error.txt',
  //         arr[i] + ' : ' + res.statusCode + res.statusMessage,
  //         (err) => console.log(err)
  //       );
  //     }

  //     let outStream = fs.createWriteStream(
  //       './movie/' + arr[i].split('-')[1] + '.ts'
  //     );

  //     res.pipe(outStream);

  //     res.on('end', () => {
  //       console.log('done');
  //     });
  //   });
  // }
});
```

## 未成功下载文件的补充下载
```js
const https = require('https');
const fs = require('fs');

let url = 'https://hls1.gslb.ru/hls/Cen/DKTM-027.mp4/index.m3u8'.replace(
  /\w+\.m3u8/,
  ''
);

let tail = 'cdn-1184-v1-a1.ts'.split('-');

let ps = new Promise((resolve, reject) => {
  fs.readdir('./movie/gw', 'utf-8', (err, files) => {
    if (err) reject(err);
    resolve(files);
  });
});

ps.then((files) => {
  let arr = files;
  let arrLen = arr.length;

  let timer = setInterval(() => {
    tail[1] = arr[arrLen - 1].split('.')[0];
    let wStream = fs.createWriteStream('./movie/' + tail[1] + '.ts');
    let tsurl = url + tail.join('-');

    https.get(tsurl, (res) => {
      res.pipe(wStream);
      res.on('end', () => {
        console.log(tail[1] + ' : ' + arrLen);
      });
    });

    arrLen--;

    if (arrLen <= 0) {
      clearInterval(timer);
      console.log('下载完成');
    }
  }, 3000);
}).catch((err) => {
  throw new Error(err);
});
```


## 问题

1. 未下载成功的.ts文件如何获知

2. 如何读取文件夹内容

3. 如何在下载前获取下载内容的信息



























