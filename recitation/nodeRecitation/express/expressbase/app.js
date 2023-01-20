const http = require('http');
const path = require('path');
const express = require('express');
const { mainPath } = require('./utils');
const router = require('./routers');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(mainPath, 'public')));

app.use('/admin', router);
// app.use(router);

// app.use('/index', (req, res) => {
//   res.end('Hello Jadyen');
// });

app.listen(3000, () => {
  console.log('服务启动成功');
});
