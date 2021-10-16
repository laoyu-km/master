var net = require('net');

var socket = net.connect(12306, '127.0.0.1');

socket.setTimeout(2000);

socket.on('timeout', () => {
    console.log('超时2秒了');
})