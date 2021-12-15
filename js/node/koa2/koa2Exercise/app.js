const Koa = require('koa');

const app = new Koa();

let arrJson = null;

app.use( async(ctx, next) => {
    let arr = ['jayden', 'alexis', 'ella'];
    arrJson = JSON.stringify(arr);
    next();
})

app.use(async(ctx, next) => {
    ctx.response.body = arrJson;
});


app.listen(3000);