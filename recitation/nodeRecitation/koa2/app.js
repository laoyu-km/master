const Koa2 = require('koa');

const app = new Koa2();

// // 简单示例
// app.use(async (ctx, next) => {
//   ctx.body = 'Hello Jayden James';
// });

// // 洋葱模型
// const indent = (n) => new Array(n).join('&nbsp;');

// const mid01 = () => async (ctx, next) => {
//   ctx.body = `<h3>请求 => 第一层中间件</h3>`;
//   await next();
//   ctx.body += `<h3>请求 <= 第一层中间件</h3>`;
// };

// const mid02 = () => async (ctx, next) => {
//   ctx.body += `<h3>${indent(8)}请求 => 第二层中间件</h3>`;
//   await next();
//   ctx.body += `<h3>${indent(8)}请求 <= 第二层中间件</h3>`;
// };

// app.use(mid01());

// app.use(mid02());

// app.use(async (ctx, next) => {
//   ctx.body += `<p style="color: #ff0000">${indent(
//     16
//   )} => Koa2 洋葱模型 <= </p>`;
// });

// // 路由
// // npm install -S koa-router
// const Router = require('koa-router');
// const router = new Router({
//   prefix: '/admin', // 添加统一前缀
// });

// router.get('/porn', async (ctx, next) => {
//   ctx.body = '<h3>Welcome Alexis Texas</h3>';
// });

// router.get('/', (ctx, next) => {
//   ctx.body = "<h1>Welcome Jayden James's Home</h1>";
// });

// app.use(router.routes());

app.listen(3000, () => {
  console.log('服务已启动');
});
