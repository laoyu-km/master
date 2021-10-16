const fs = require('fs');
const globalConf = {}

let temp = fs.readFileSync('./server.conf', 'utf8')

temp.toString().split("\r\n").forEach(item => {
    let tem = item.toString().split('=');
    globalConf[tem[0]] = tem[1];
})

module.exports = globalConf;