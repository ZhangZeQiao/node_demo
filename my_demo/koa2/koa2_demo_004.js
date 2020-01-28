const Koe = require('koa');// TODO: http框架
const Router = require('koa-router');// TODO: 路由框架
const bodyParser = require('koa-bodyparser');// TODO: 参数解析框架

const app = new Koe();
const router = new Router();

router.get('/', async (context, next) => {
    context.response.body = `<h1>Index for 004</h1>
    <form action="/signin" method="post">
        <p>Name: <input name="name" value="koa"></p>
        <p>Password: <input name="password" type="password"></p>
        <p><input type="submit" value="Submit"></p>
    </form>`;
});

/* 
TODO: 第一个使用的是`，运行占位符语法时没有问题，第二个使用的是'，运行占位符语法时没有效果！？
`signin with name: ${name}`
'signin with name: ${name}'
*/

router.post('/signin', async (context, next) => {
    // TODO: 注意，用var name = ctx.request.body.name || ''拿到表单的name字段，如果该字段不存在，默认值设置为''。
    var
        name = context.request.body.name || '',
        password = context.request.body.password || '';
    console.log(`signin with name: ${name}`);
    console.log(`signin with password:${password}`);
    if (name === 'koa' && password === '123456') {
        context.response.body = `<h1>Welcome, ${name} for 004!</h1>`;
    } else {
        context.response.body = `<h1>Login failed  for 004!</h1>
        <p><a href="/">Try again for 004</a></p>`;
    }
});

// TODO: 由于middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上。
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
console.log('APP started at port 3000 for 004...');
