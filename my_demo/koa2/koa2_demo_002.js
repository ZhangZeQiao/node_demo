const Koa = require('koa');
const app = new Koa();

// http://localhost:3000
app.use(async (context, next) => {
    if (context.request.path === '/') {
        context.response.body = 'index page for 002';
    } else {
        await next();
    }
});

// http://localhost:3000/test
app.use(async (context, next) => {
    if (context.request.path === '/test') {
        context.response.body = 'test page for 002';
    } else {
        await next();
    }
});

app.use(async (context, next) => {
    if (context.request.path === '/error') {
        context.response.body = 'error page for 002';
    } else {
        await next();
    }
});

app.listen(3000);
console.log('APP started at port 3000 for 002...');