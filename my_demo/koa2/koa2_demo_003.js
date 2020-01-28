const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();// TODO: 分两步 不要采用 const router = require('koa-router')(); 会报错

// log request url
app.use(async (context, next) => {
    console.log('Process ' + context.request.method + '...');
    console.log('Process ' + context.request.url + '...');
    await next();
});

// add url-route
// http://localhost:3000/test/joe
router.get('/test/:name', async (context, next) => {
    var name = context.params.name;
    context.response.body = `<h1>Hello, ${name}  for 003!</h1>`;
});

// http://localhost:3000/
router.get('/', async (context, next) => {
    context.response.body = '<h1>index for 003</h1>';
});

// TODO: add router middleware
app.use(router.routes());
// 官方推荐
app.use(router.allowedMethods());

app.listen(3000);
console.log('APP started at port 3000 for 003...');
