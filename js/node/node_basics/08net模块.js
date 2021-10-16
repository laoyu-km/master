// net 模块

// 五层网络协议
// 1. 应用层：http(tcp端口80) FTP(tcp端口21)，SMTP(邮件的发送，25)，POP3(邮件的接收110)， DNS
// 自主取端口时，不要和这些协议端口冲突

//2. 传输层(运输层) : 协议 ->  TCP(1对1, 我发给你，我会等着你回复)， UDP(广播, 1对多，不关心是否接收到(不关心是否回复));

//3. 网络层：协议 -> IP(把数据源送到目的地), ICMP;

//4. 数据链路层：协议 -> ppp, SLIP 协议

//5. 物理层：规范 -> ISO2110(规范)

//  =======================

// TCP/IP -> 包含4个层
// 1. 应用层: 包含的协议-> TELNET, SSH, HTTP, SMTP, POP, SSL/TLS, FTP, MIME, HTML, SNMP, MIB, SIP, RTP ...

// 2. 传输层: 包含的协议-> TCP, UDP, UDP-Lite, SCTP, DCCP

// 3. 网络层: ARP, IPv4, IPv6, ICMP, IPsec

// 4. 数据链路和物理层：以太网, 无线LAN, PPP...  和 双绞线电缆，无线，光纤...

// 总结 TCP/IP 包含应用层 -> 包含http协议

// 如果前后端进行通讯时，要根据http协议，依照报文进行通讯
// GET/test?param=111

// // 简单示例
// const { ServerResponse } = require('http');
// var net = require('net');

// var server = net.createServer();
// server.listen(12306, '127.0.0.1');

// server.on('listening', () => {
//     console.log('服务已经启动');
// })

// server.on('connection', socket => {
//     console.log('有新的链接');
//     socket.on('data', (data) => {
//         console.log(data.toString());
//     })
// })


// net 模块
// 扮演了两个角色 client 和 server 所以 net模块也就分为有两大方法群

//  =======================

// server 类 服务端

// 事件
// listening: 监听端口后触发
// connection: 当哟客户端请求链接时触发
// close： 服务器关闭时触发 -> 不常用
// error: 服务器出现错误时触发 -> 

// 为什么不用close, 因为我们关闭服务器的方法通常采用杀线程的方式来关闭服务；

// 重点： connection里的参数, socket
// 客户端发送的是一个socket， 服务端收到的自然就是参数socket。

// 方法
// listen: server监听的端口
// close: 关闭服务的方法
// address: 在回调中查看，查看主机的IP， 但一般我们肯定是摘到自己的IP的, 没多大用

// 示例 简单的服务器和客户端交互流程   
// var net = require('net');

// var server = net.createServer(); // 建一个服务器
// server.listen(12306, '127.0.0.1'); // 监听本机上的12306端口

// server.on('listening', () => { //监听端口就触发listening事件,不管连不连
//     console.log('服务已启动');
//     // console.log(server.address()); // server.address()只有事件回调中才能获取到服务器地址
// })

// server.on('connection', socket => { //有新链接就触发connection
//     console.log('有新链接了');
//     console.log(socket.on);

//     // console.log(server.address()); // server.address()只有事件回调中才能获取到服务器地址

//     socket.on('data', data => { //服务端接收到的data是buffer形式的的，所以要使用toString() 方法才能按原文输出接收到的data
//         console.log(data.toString());
//     });

//     // 向客户端传送数据
//     socket.write('hello client1');
//     socket.write('hello client2');
//     socket.write('hello client3');

//     // 服务端关闭
//     socket.on('close', () => {
//         console.log('客户端已经关闭');
//         server.close();
//     })
// })

// server.on('close', () => {
//     console.log('服务器已关闭');
// })

// //  net模块其实传输的是一种数据流
// //  服务端接受到的socket 实际与 客户端发出的socket实际上是一个流,所以客户端可以发送给服务都数据，服务端也可以发送数据给客户端
// //  服务端也是使用socket.write()来写入数据

// // 客户端代码
// var net = require('net');

// var socket = net.connect(12306, '127.0.0.1');

// socket.setTimeout(2000);

// socket.on('connect', () => {
//     console.log('已经连接到服务器')
//     console.log(socket.remoteAddress);
//     console.log(socket.remotePort);
//     console.log(socket.localAddress);
//     console.log(socket.localPort);
// })

// socket.write('hello server');

// socket.on('data', data => {
//     console.log(data.toString());
//     socket.end() // 关闭可读端
// })

// socket.on('close', () => { // 设置一个close事件，在socket关闭时触发
//     console.log('链接已关闭');
// })

//  =======================
// socket :

// 事件
// connect: 链接到服务器时触发
// end: 写入数据完成以后调用
// data: 当接收到数据时触发，一般是做参数
// timeout: 超时后触发
// error
// close: socket 关闭的时候触发

// 属性
// remoteAddress: 远程(服务器)的地址
// remotePort：远程端口
// localAddress: 本地地址
// localPort: 本地端口

// 方法：
// setTimeout: 设置超时时间
// write: socket中写入数据
// end: 写入结束

//  =======================

// 超时处理
// 客户端向服务端发送请求如果没有响应，有几种处理方法
// 1. 再次发送请求, 如果短时间内请求次数过多会对客户端CPU和服务端CPU造成过大负载。
// 2. 使用长链接形式, 如果长时间没有得到响应，就不知道下一步应该怎么做

// 所以出现了超时处理
// setTimeout 设置超时时间
// timeout 超时后触发的事件

// // 超时示例
// // 服务端
// const net = require('net');
// const server = net.createServer();
// server.listen(12306, '127.0.0.1');

// // 客户端
// var net = require('net');
// var socket = net.connect(12306, '127.0.0.1');
// socket.setTimeout(2000);
// socket.on('timeout', () => {
//     console.log('超时2秒了');
// }

// =======================

// // 浏览器作为客户端示例
// // 与浏览器做数据交互要使用报文头
// var net = require('net');
// var server = net.createServer();
// server.listen(12306, '127.0.0.1');

// server.on('listening', () => {
//     console.log('服务已启动');
// })

// server.on('connection', (socket) => {
//     console.log('有新的链接');

//     socket.on('data', (data) => {
//             // console.log(data.toString());
//             // 获取url

//             // 后端向浏览器发送信息，要遵循报文格式
//             // \r\n 兼容windows, macos, linux, 表示换行，并从行首开始
//             // 正文内容要与报文头有两行的空行
//             socket.write('HTTP 200OK\r\nContentType: text/html\r\n\r\n<html><body>Hello Jayden</body></html>');
//             socket.end(); //结束socket, 

//         })
//         // socket.end(); //不能在这里使用,因为'data'事件还没有触发 
// })

// 项目示例 详见/xunhuanyilai/