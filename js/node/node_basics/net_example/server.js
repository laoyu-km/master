const globalConf = require('./conf');
const net = require('net');
const fs = require('fs');
const server = net.createServer();

server.listen(globalConf.port, '127.0.0.1');

server.on('listening', () => {
    console.log('server is running');
})

server.on('connection', (socket) => {
    socket.on('data', data => {
        let url = data.toString().split('\r\n')[0].split(' ')[1];
        try {

            let dataFile = fs.readFileSync(__dirname + globalConf.path + url);
            // socket.write('HTTP 200OK\r\nContentType: \r\n\r\n' + dataFile); // 不能正确显示
            // 因为字符串拼接会先进行字符串类型转换后在转换成buffer, 而html中包含的图片转换为字符串必然出错，所以不能正确显示
            // 处理办法是另起一个socket.write()进行写入

            // HTTP头的要求:
            // 1. HTTP 200OK / 404 NOTFound /...
            // 2. contentType: html => 只有chrome可以省略这项
            // 3. 可自定义项目：server: zxws
            socket.write('HTTP 200OK\r\nContentType: html\r\nserver: zxws\r\n\r\n');
            socket.write(dataFile);


        } catch (e) {
            socket.write('HTTP 404NOTFound\r\n\r\n<html><body>NOT FOUND</body></html>')
        }
        socket.end();

    })
})