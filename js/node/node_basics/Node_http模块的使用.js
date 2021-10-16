// node.js http 模块的原始使用
const fs = require('fs');

const http = require('http');

// function reqListen(req, res) {

// }

// http.createServer(requListen);
const server = http.createServer(function(req, res) {
    // req => 请求的信息
    // res => 响应的信息

    // // 最原始的响应内容写法
    // res.setHeader('Content-Type', 'text/html');
    // res.write('<html>')
    // res.write('<head><title>janden</title><meta charset="utf-8" /></head>');
    // res.write('<body><h1>你好， jayden</h1></body>');
    // res.write('</html>');
    // res.end();


    // 根据req的URL， 显示不同的内容
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>')
        res.write('<head><title>请输入你的内容</title><meta charset="utf-8" /></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"/><button type="submit">发送</button></form></body>');
        res.write('</html>');
        return res.end(); // node.js 的要求，回应完毕后做一个结束动作，终止请求,否则会执行下面的语句
    }
    if (url === '/message' && method === 'POST') {

        // 浏览器与服务器间的数据传输都是已stream(流)的形式来进行的，node.js 使用buffer来处理流
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        })
        req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split('=')[1];
            fs.writeFileSync('msg.txt', message);
        })

        res.statusCode = 302; // 响应的状态码302 代表重定向
        res.setHeader('Location', '/');
        return res.end();
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>')
    res.write('<head><title>janden</title><meta charset="utf-8" /></head>');
    res.write('<body><h1> jayden</h1></body>');
    res.write('</html>');
    res.end();

});


server.listen(3000); //启动一个脚本，监听一个端口，